import { NextResponse } from "next/server";
import { getGuestList } from "@/lib/sheets";
import { buildHouseholdDetail, findGuestByExactName } from "@/lib/guests";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  const householdId = url.searchParams.get("household_id");

  try {
    const rows = await getGuestList();

    if (householdId) {
      const detail = buildHouseholdDetail(rows, householdId);
      if (!detail) {
        return NextResponse.json({ error: "Household not found" }, { status: 404 });
      }
      return NextResponse.json(detail);
    }

    if (name === null) {
      return NextResponse.json({ error: "Missing name or household_id parameter" }, { status: 400 });
    }

    const match = findGuestByExactName(rows, name);
    if (!match) {
      return NextResponse.json({ match: null });
    }
    return NextResponse.json({ match });
  } catch (err) {
    console.error("GET /api/guests failed:", err);
    return NextResponse.json({ error: "Failed to load guest list" }, { status: 500 });
  }
}

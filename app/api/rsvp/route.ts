import { NextResponse } from "next/server";
import { z } from "zod";
import { getGuestList, updateHouseholdRsvp } from "@/lib/sheets";
import { RSVP_STATUSES, STATUSES_REQUIRING_ADDRESS } from "@/lib/guests";

export const dynamic = "force-dynamic";

const submissionSchema = z.object({
  householdId: z.string().min(1),
  status: z.enum(RSVP_STATUSES),
  attendingGuestIds: z.array(z.string().min(1)).min(1),
  addressLine1: z.string().default(""),
  addressLine2: z.string().default(""),
  city: z.string().default(""),
  state: z.string().default(""),
  postalCode: z.string().default(""),
  country: z.string().default(""),
  note: z.string().default(""),
});

function parseGuestIdRow(guestId: string): number | null {
  const [, rowStr] = guestId.split(":");
  const row = Number.parseInt(rowStr ?? "", 10);
  return Number.isFinite(row) ? row : null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (STATUSES_REQUIRING_ADDRESS.includes(data.status)) {
    const missing: string[] = [];
    if (!data.addressLine1.trim()) missing.push("addressLine1");
    if (!data.city.trim()) missing.push("city");
    if (!data.state.trim()) missing.push("state");
    if (!data.postalCode.trim()) missing.push("postalCode");
    if (!data.country.trim()) missing.push("country");
    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Address is required for this RSVP status", missing },
        { status: 400 },
      );
    }
  }

  try {
    const rows = await getGuestList();
    const householdRows = rows.filter((r) => r.householdId === data.householdId);
    if (householdRows.length === 0) {
      return NextResponse.json({ error: "Household not found" }, { status: 404 });
    }

    const validRowNumbers = new Set(householdRows.map((r) => r.rowNumber));
    const attendingRowNumbers = new Set<number>();
    for (const guestId of data.attendingGuestIds) {
      const rowNumber = parseGuestIdRow(guestId);
      if (rowNumber === null || !validRowNumbers.has(rowNumber)) {
        return NextResponse.json(
          { error: `Invalid guest id for this household: ${guestId}` },
          { status: 400 },
        );
      }
      attendingRowNumbers.add(rowNumber);
    }

    await updateHouseholdRsvp(data.householdId, {
      status: data.status,
      addressLine1: data.addressLine1.trim(),
      addressLine2: data.addressLine2.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      postalCode: data.postalCode.trim(),
      country: data.country.trim(),
      note: data.note.trim(),
      attendingRowNumbers,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/rsvp failed:", err);
    return NextResponse.json({ error: "Failed to save RSVP" }, { status: 500 });
  }
}

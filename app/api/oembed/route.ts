import { NextResponse } from "next/server";

// oEmbed endpoint so embed engines (Canva/Iframely, Notion, etc.) render a
// LIVE interactive iframe of the save-the-date app instead of a static preview
// card. Discovery link lives in app/layout.tsx (<link rel="alternate"
// type="application/json+oembed">). This is the same mechanism Google Forms /
// Typeform use to embed interactively.

const SITE = "https://savethedate.jacquelynandtommy.com";

// Default embed size (portrait, roughly phone-shaped so the form fits well).
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 900;

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const format = searchParams.get("format");
  if (format && format !== "json") {
    // Spec: return 501 for unsupported formats (e.g. xml).
    return new NextResponse("Only json format is supported", { status: 501 });
  }

  const maxWidth = Number(searchParams.get("maxwidth")) || DEFAULT_WIDTH;
  const maxHeight = Number(searchParams.get("maxheight")) || DEFAULT_HEIGHT;
  const width = Math.min(maxWidth, DEFAULT_WIDTH);
  const height = Math.min(maxHeight, DEFAULT_HEIGHT);

  const html =
    `<iframe src="${SITE}" width="${width}" height="${height}" ` +
    `style="border:0;max-width:100%;width:${width}px;height:${height}px;" ` +
    `frameborder="0" scrolling="auto" allow="clipboard-write" ` +
    `title="Save the Date — Jacquelyn & Tommy"></iframe>`;

  return NextResponse.json(
    {
      version: "1.0",
      type: "rich",
      provider_name: "Jacquelyn & Tommy",
      provider_url: SITE,
      title: "Tentative Plans · Jacquelyn & Tommy",
      width,
      height,
      html,
    },
    {
      headers: {
        // Allow any embedder to fetch this discovery document.
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}

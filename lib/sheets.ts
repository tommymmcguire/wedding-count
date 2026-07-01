import { google, type sheets_v4 } from "googleapis";
import type { GuestRow, RsvpStatus } from "./guests";
import { RSVP_STATUSES } from "./guests";

const HEADER_ROW = 1;
const FIRST_DATA_ROW = 2;

const COLUMNS = {
  household_id: "A",
  guest_name: "B",
  is_primary: "C",
  list: "D",
  guest_of: "E",
  invite_label: "F",
  guests_on_invite: "G",
  realistic_count: "H",
  save_the_date_sent: "I",
  ceremony_invite_sent: "J",
  attending: "K",
  rsvp_status: "L",
  rsvp_address_line1: "M",
  rsvp_address_line2: "N",
  rsvp_city: "O",
  rsvp_state: "P",
  rsvp_postal_code: "Q",
  rsvp_country: "R",
  rsvp_note: "S",
  rsvp_submitted_at: "T",
  review_flag: "U",
} as const;

const COLUMN_ORDER: Array<keyof typeof COLUMNS> = [
  "household_id",
  "guest_name",
  "is_primary",
  "list",
  "guest_of",
  "invite_label",
  "guests_on_invite",
  "realistic_count",
  "save_the_date_sent",
  "ceremony_invite_sent",
  "attending",
  "rsvp_status",
  "rsvp_address_line1",
  "rsvp_address_line2",
  "rsvp_city",
  "rsvp_state",
  "rsvp_postal_code",
  "rsvp_country",
  "rsvp_note",
  "rsvp_submitted_at",
  "review_flag",
];

const LAST_COLUMN = COLUMNS.review_flag;

type CachedList = { rows: GuestRow[]; fetchedAt: number };
let cache: CachedList | null = null;
const CACHE_TTL_MS = 60_000;

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function getSheetTab(): string {
  return process.env.GOOGLE_SHEET_TAB || "Guests";
}

function getSheetsClient(): sheets_v4.Sheets {
  const email = getEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = getEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

function parseBool(value: unknown): boolean | null {
  if (value === undefined || value === null || value === "") return null;
  const s = String(value).trim().toLowerCase();
  if (s === "true" || s === "yes" || s === "y" || s === "1") return true;
  if (s === "false" || s === "no" || s === "n" || s === "0") return false;
  return null;
}

function parseStatus(value: unknown): RsvpStatus | null {
  if (!value) return null;
  const s = String(value).trim();
  return (RSVP_STATUSES as readonly string[]).includes(s) ? (s as RsvpStatus) : null;
}

function rowFromValues(rowNumber: number, values: unknown[]): GuestRow | null {
  const get = (colKey: keyof typeof COLUMNS): string => {
    const idx = COLUMN_ORDER.indexOf(colKey);
    const v = values[idx];
    return v === undefined || v === null ? "" : String(v);
  };

  const householdId = get("household_id").trim();
  const guestName = get("guest_name").trim();
  if (!householdId || !guestName) return null;

  return {
    rowNumber,
    householdId,
    guestName,
    isPrimary: parseBool(get("is_primary")) === true,
    attending: parseBool(get("attending")),
    rsvpStatus: parseStatus(get("rsvp_status")),
    addressLine1: get("rsvp_address_line1"),
    addressLine2: get("rsvp_address_line2"),
    city: get("rsvp_city"),
    state: get("rsvp_state"),
    postalCode: get("rsvp_postal_code"),
    country: get("rsvp_country"),
    note: get("rsvp_note"),
    submittedAt: get("rsvp_submitted_at"),
  };
}

export async function getGuestList(options: { forceRefresh?: boolean } = {}): Promise<GuestRow[]> {
  if (!options.forceRefresh && cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.rows;
  }

  const sheets = getSheetsClient();
  const tab = getSheetTab();
  const range = `${tab}!A${FIRST_DATA_ROW}:${LAST_COLUMN}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: getEnv("GOOGLE_SHEET_ID"),
    range,
  });

  const values = response.data.values ?? [];
  const rows: GuestRow[] = [];
  values.forEach((rowValues, index) => {
    const row = rowFromValues(FIRST_DATA_ROW + index, rowValues);
    if (row) rows.push(row);
  });

  cache = { rows, fetchedAt: Date.now() };
  return rows;
}

export function invalidateGuestListCache(): void {
  cache = null;
}

export type HouseholdUpdatePayload = {
  status: RsvpStatus;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  note: string;
  attendingRowNumbers: Set<number>;
};

export async function updateHouseholdRsvp(
  householdId: string,
  payload: HouseholdUpdatePayload,
): Promise<{ updatedRows: number }> {
  const rows = await getGuestList({ forceRefresh: true });
  const householdRows = rows.filter((r) => r.householdId === householdId);
  if (householdRows.length === 0) {
    throw new Error(`No rows found for household_id "${householdId}"`);
  }

  const now = new Date().toISOString();
  const tab = getSheetTab();
  const sheets = getSheetsClient();

  const sharedFields: Array<{ column: string; value: string }> = [
    { column: COLUMNS.rsvp_status, value: payload.status },
    { column: COLUMNS.rsvp_address_line1, value: payload.addressLine1 },
    { column: COLUMNS.rsvp_address_line2, value: payload.addressLine2 },
    { column: COLUMNS.rsvp_city, value: payload.city },
    { column: COLUMNS.rsvp_state, value: payload.state },
    { column: COLUMNS.rsvp_postal_code, value: payload.postalCode },
    { column: COLUMNS.rsvp_country, value: payload.country },
    { column: COLUMNS.rsvp_note, value: payload.note },
    { column: COLUMNS.rsvp_submitted_at, value: now },
  ];

  const data: sheets_v4.Schema$ValueRange[] = [];

  for (const row of householdRows) {
    for (const field of sharedFields) {
      data.push({
        range: `${tab}!${field.column}${row.rowNumber}`,
        values: [[field.value]],
      });
    }
    const isAttending = payload.attendingRowNumbers.has(row.rowNumber);
    data.push({
      range: `${tab}!${COLUMNS.attending}${row.rowNumber}`,
      values: [[isAttending ? "TRUE" : "FALSE"]],
    });
  }

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: getEnv("GOOGLE_SHEET_ID"),
    requestBody: {
      valueInputOption: "USER_ENTERED",
      data,
    },
  });

  invalidateGuestListCache();
  return { updatedRows: householdRows.length };
}

export { HEADER_ROW, FIRST_DATA_ROW, COLUMNS };

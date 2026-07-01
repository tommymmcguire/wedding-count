export const RSVP_STATUSES = [
  "We are very likely to attend",
  "We hope to attend but aren't sure yet",
  "We likely won't be able to attend",
] as const;

export type RsvpStatus = (typeof RSVP_STATUSES)[number];

export const SOLO_STATUS_LABELS: Record<RsvpStatus, string> = {
  "We are very likely to attend": "I am very likely to attend",
  "We hope to attend but aren't sure yet": "I hope to attend but am not sure yet",
  "We likely won't be able to attend": "I likely won't be able to attend",
};

export function statusLabelFor(status: RsvpStatus, householdSize: number): string {
  return householdSize <= 1 ? SOLO_STATUS_LABELS[status] : status;
}

export const STATUSES_REQUIRING_ADDRESS: RsvpStatus[] = [
  "We are very likely to attend",
  "We hope to attend but aren't sure yet",
];

export type GuestRow = {
  rowNumber: number;
  householdId: string;
  guestName: string;
  isPrimary: boolean;
  attending: boolean | null;
  rsvpStatus: RsvpStatus | null;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  note: string;
  submittedAt: string;
};

export type GuestMatch = {
  guestId: string;
  guestName: string;
  householdId: string;
  householdSize: number;
};

export type HouseholdMember = {
  guestId: string;
  guestName: string;
  isPrimary: boolean;
  attending: boolean | null;
};

export type HouseholdDetail = {
  householdId: string;
  members: HouseholdMember[];
  existingRsvp: {
    status: RsvpStatus | null;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    note: string;
    submittedAt: string;
  };
};

export function guestIdFor(row: Pick<GuestRow, "householdId" | "rowNumber">): string {
  return `${row.householdId}:${row.rowNumber}`;
}

function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function findGuestByExactName(rows: GuestRow[], query: string): GuestMatch | null {
  const normalized = normalizeName(query);
  if (normalized.length === 0) return null;

  const householdSizes = new Map<string, number>();
  for (const row of rows) {
    householdSizes.set(row.householdId, (householdSizes.get(row.householdId) ?? 0) + 1);
  }

  for (const row of rows) {
    if (normalizeName(row.guestName) === normalized) {
      return {
        guestId: guestIdFor(row),
        guestName: row.guestName,
        householdId: row.householdId,
        householdSize: householdSizes.get(row.householdId) ?? 1,
      };
    }
  }

  return null;
}

export function buildHouseholdDetail(rows: GuestRow[], householdId: string): HouseholdDetail | null {
  const householdRows = rows.filter((r) => r.householdId === householdId);
  if (householdRows.length === 0) return null;

  householdRows.sort((a, b) => {
    if (a.isPrimary !== b.isPrimary) return a.isPrimary ? -1 : 1;
    return a.rowNumber - b.rowNumber;
  });

  const anchor = householdRows[0];

  return {
    householdId,
    members: householdRows.map((r) => ({
      guestId: guestIdFor(r),
      guestName: r.guestName,
      isPrimary: r.isPrimary,
      attending: r.attending,
    })),
    existingRsvp: {
      status: anchor.rsvpStatus,
      addressLine1: anchor.addressLine1,
      addressLine2: anchor.addressLine2,
      city: anchor.city,
      state: anchor.state,
      postalCode: anchor.postalCode,
      country: anchor.country,
      note: anchor.note,
      submittedAt: anchor.submittedAt,
    },
  };
}

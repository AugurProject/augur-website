// The canonical worked example (SPEC.md §6). Home, Protocol and Learn carry
// this one question. It is explanatory: there is no live market, report,
// dispute or result, and none may be shown.

export const workedExample = {
  question: "Will room-temperature superconductivity at ambient pressure be independently demonstrated?",
  /** Evidence must be published strictly before the cutoff. */
  cutoff: {
    iso: "2027-09-08T00:00:00Z",
    date: "2027-09-08",
    label: "2027-09-08 00:00 UTC",
  },
  outcomes: ["Yes", "No", "Invalid"] as const,
  /** The record's state line. Words carry the state; markers reinforce it. */
  states: ["Asked", "Reported", "Challenge", "Final"] as const,
  criteria: {
    temperature: "at least 293.15 K (20 °C)",
    pressure: "90–110 kPa absolute during measurement",
    measurement: "zero electrical resistance within disclosed uncertainty, and evidence of the Meissner effect",
    independence:
      "an original experimental report plus a replication by a separate institution with no shared authors and independently prepared samples",
    publication: "both publish methods, measurements and uncertainty before the cutoff; journal articles or public preprints qualify",
    excluded: "a press release or levitation video alone does not qualify",
  },
} as const;

export type WorkedExampleState = (typeof workedExample.states)[number];

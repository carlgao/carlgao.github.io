const CATEGORIES = [
  {
    cat: "Premedication",
    meds: [
      {
        med: "Midazolam",
        routes: [
          {
            route: "IV/IM",
            low: 0.05,
            high: 0.1,
            units: "mg",
            notes: "Use concentrated Midazolam for IM and Nasal",
          },
          {
            route: "PO",
            low: 0.25,
            high: 0.5,
            units: "mg",
          },
          {
            route: "Nasal",
            low: 0.2,
            high: 0.3,
            units: "mg",
            notes: "Use concentrated Midazolam for IM and Nasal",
          },
        ],
      },
      {
        med: "Ketamine",
        routes: [
          {
            route: "IV/PO",
            low: 1,
            high: 2,
            units: "mg",
          },
        ],
      },
    ],
  },
  {
    cat: "Induction",
    meds: [
      {
        med: "Propofol",
        routes: [
          {
            route: "IV",
            low: 2,
            high: 3,
            units: "mg",
          },
        ],
      },
    ],
  },
  {
    cat: "Muscle Relaxants",
    meds: [],
  },
  {
    cat: "Muscle Relaxant Reversal",
    meds: [],
  },
  {
    cat: "Pain Medications",
    meds: [],
  },
  {
    cat: "Infusions",
    meds: [],
  },
  {
    cat: "Antibiotics *check with surgeon",
    meds: [],
  },
  {
    cat: "Antiemetic",
    meds: [],
  },
  {
    cat: "Resuscitation",
    meds: [],
  },
  {
    cat: "Anaphylaxis",
    meds: [],
  },
];

const id = (i, j) => i.toString() + "," + j.toString();

export { CATEGORIES, id };

const DATA = [
  {
    cat: "Premedication",
    meds: [
      {
        med: "Midazolam",
        notes: "Use concentrated Midazolam for IM and Nasal",
        routes: [
          {
            route: "IV/IM",
            low: 0.05,
            high: 0.1,
            units: "mg",
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
];

export default DATA;

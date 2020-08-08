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
            low: 0.5,
            units: "mg",
            max: 20,
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
    meds: [
      {
        med: "Succinylcholine",
        routes: [
          {
            route: "IV",
            customFormula: {
              str: "<1y: 2-3 mg/kg, >1y: 1-2 mg/kg",
              func: (age, weight) => {
                if (age === 0 || weight === 0) return "";
                return `${roundToHundredth(
                  age < 1 ? 2 * weight : weight
                )}-${roundToHundredth(age < 1 ? 3 * weight : 2 * weight)} mg`;
              },
            },
          },
          {
            route: "IM",
            low: 4,
            high: 5,
            units: "mg",
          },
        ],
      },
    ],
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
    cat: "Antibiotics",
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

const roundToHundredth = (num) => Math.round(num * 100) / 100;

export { CATEGORIES, id, roundToHundredth };

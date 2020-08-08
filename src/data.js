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
      {
        med: "Concent. Ketamine",
        routes: [
          {
            route: "IV",
            low: 3,
            high: 7,
            units: "mg",
            notes:
              "consider including Glyco 10-15 mcg/kg up to 0.2mg and Versed IM dose in same syringe",
          },
        ],
      },
      {
        med: "Dexmedetomidine",
        routes: [{ route: "IV", low: 0.3, high: 2, units: "mg" }],
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
      { med: "Etomidate", routes: [{ route: "IV", low: 0.3, units: "mg" }] },
      {
        med: "Ketamine",
        routes: [{ route: "IV", low: 2, high: 3, units: "mg" }],
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
            notes:
              "Atropine and Succinylcholine should be readily accessible on your cart in syringes equipped with 22-25G needles",
          },
          {
            route: "IM",
            low: 4,
            high: 5,
            units: "mg",
            notes:
              "Atropine and Succinylcholine should be readily accessible on your cart in syringes equipped with 22-25G needles",
          },
        ],
      },
      {
        med: "Cisatracurium",
        routes: [{ route: "IV", low: 0.1, high: 0.2, units: "mg" }],
      },
      {
        med: "Rocuronium",
        routes: [{ route: "IV", low: 0.6, high: 1.2, units: "mg" }],
      },
      { med: "Vecuronium", routes: [{ route: "IV", low: 0.1, units: "mg" }] },
    ],
  },
  {
    cat: "Muscle Relaxant Reversal",
    meds: [
      {
        med: "Glycopyrrolate",
        routes: [{ route: "IV", low: 0.01, high: 0.015, units: "mg" }],
      },
      {
        med: "Neostigmine",
        routes: [{ route: "IV", low: 0.035, high: 0.075, units: "mg" }],
      },
      {
        med: "Sugammadex",
        routes: [
          {
            route: "IV (TOF≥2)",
            low: 2,
            units: "mg",
          },
          {
            route: "IV (TOF<2)",
            low: 4,
            units: "mg",
          },
          {
            route: "IV (immediate reversal)",
            low: 16,
            units: "mg",
            notes: "if approved by Attng",
          },
        ],
      },
    ],
  },
  {
    cat: "Pain Medications",
    meds: [
      {
        med: "Hydromorphone",
        routes: [{ route: "IV", low: 0.005, high: 0.015, units: "mg" }],
      },
      {
        med: "Fentanyl",
        routes: [
          { route: "IV", low: 0.5, high: 1, units: "mg" },
          { route: "Nasal", low: 2, units: "mg" },
          { route: "Post-op", low: 0.5, units: "mg" },
        ],
      },
      {
        med: "Morphine",
        routes: [
          { route: "IV", low: 0.05, high: 0.1, units: "mg" },
          { route: "Morphine", low: 0.05, units: "mg" },
        ],
      },
      {
        med: "Toradol",
        routes: [{ route: "IV", low: 0.5, max: 30, units: "mg" }],
      },
      {
        med: "Tylenol",
        routes: [
          {
            route: "PO/PR",
            low: 10,
            high: 15,
            units: "mg",
            notes: "Max 3000 mg/day",
          },
          {
            route: "IV (Q6)",
            customFormula: {
              str: "<1m: 7.5 mg/kg, 1m-2y: 10 mg/kg, >2y: 15 mg/kg",
              func: (age, weight) =>
                `${
                  age < 1 / 12
                    ? 7.5 * weight
                    : age <= 2
                    ? 10 * weight
                    : 15 * weight
                } mg`,
            },
            notes: "Max 3000 mg/day",
          },
        ],
      },
    ],
  },
  {
    cat: "Infusions",
    meds: [
      {
        med: "Propofol (infusion)",
        routes: [{ route: "IV", low: 75, high: 300, units: "mcg/min" }],
      },
      {
        med: "Remifentanil",
        routes: [{ route: "IV", low: 0.1, high: 0.5, units: "mcg/min" }],
      },
      {
        med: "Dexmedetomidine",
        routes: [{ route: "IV", low: 0.2, high: 1, units: "mcg/hr" }],
      },
      {
        med: "Ketamine",
        routes: [{ route: "IV", low: 5, high: 30, units: "mcg/min" }],
      },
      {
        med: "Phenylephrine",
        routes: [{ route: "IV", low: 0.1, high: 1, units: "mcg/min" }],
      },
      {
        med: "Epinephrine",
        routes: [{ route: "IV", low: 0.1, high: 1, units: "mcg/min" }],
      },
      {
        med: "Dobutamine",
        routes: [{ route: "IV", low: 2, high: 20, units: "mcg/min" }],
      },
      {
        med: "Dopamine",
        routes: [{ route: "IV", low: 1, high: 20, units: "mcg/min" }],
      },
      {
        med: "Nitroprusside",
        routes: [{ route: "IV", low: 1, high: 10, units: "mcg/min" }],
      },
      {
        med: "Nitroglycerin",
        routes: [{ route: "IV", low: 1, high: 10, units: "mcg/min" }],
      },
    ],
  },
  {
    cat: "Blood Products",
    meds: [
      {
        med: "Cryoprecipitate",
        routes: [{ route: "", low: 1, high: 2, units: "Units" }],
      },
      { med: "FFP", routes: [{ route: "", low: 10, high: 15, units: "mL" }] },
      {
        med: "Platelets",
        routes: [{ route: "", low: 5, high: 10, units: "mL" }],
      },
      { med: "pRBC", routes: [{ route: "", low: 10, high: 15, units: "mL" }] },
      {
        med: "DDAVP",
        routes: [{ route: "", low: 0.1, high: 0.3, units: "mcg" }],
      },
    ],
  },
  {
    cat: "Antibiotics",
    meds: [
      {
        med: "Ampicillin (Q4)",
        routes: [
          { route: "IV", low: 50, max: 3000, units: "mg", notes: "IVP" },
        ],
      },
      {
        med: "Cefazolin (Q4)",
        routes: [
          { route: "IV", low: 30, max: 2000, units: "mg", notes: "IVP" },
        ],
      },
      {
        med: "Cefotaxime (Q3)",
        routes: [
          { route: "IV", low: 50, max: 1000, units: "mg", notes: "IVP" },
        ],
      },
      {
        med: "Cefoxitin (Q4)",
        routes: [{ route: "IV", low: 30, units: "mg", notes: "IVP" }],
      },
      {
        med: "Clindamycin (Q6)",
        routes: [
          { route: "IV", low: 10, max: 900, units: "mg", notes: "Slow IVP" },
        ],
      },
      {
        med: "Gentamicin (Q8)",
        routes: [{ route: "IV", low: 2, units: "mg", notes: "Slow IVP" }],
      },
      {
        med: "Vancomycin (Q12)",
        routes: [
          { route: "IV", low: 15, max: 1500, units: "mg", notes: "60 minutes" },
        ],
      },
      {
        med: "Zosyn(Pip/Tazo)",
        routes: [{ route: "IV", low: 75, max: 3375, units: "mg" }],
      },
      {
        med: "Metronidazole (Q6)",
        routes: [{ route: "IV", low: 10, max: 500, units: "mg" }],
      },
    ],
  },
  {
    cat: "Antiemetic",
    meds: [
      {
        med: "Dexamethasone",
        routes: [{ route: "IV", low: 0.1, max: 4, units: "mg" }],
      },
      {
        med: "Ondansetron",
        routes: [{ route: "IV", low: 0.1, max: 4, units: "mg" }],
      },
      {
        med: "Metoclopramide",
        routes: [{ route: "IV/PO", low: 0.15, units: "mg" }],
      },
    ],
  },
  {
    cat: "Resuscitation",
    meds: [
      {
        med: "Epinephrine",
        routes: [
          { route: "IV q3-5min (Hypotension)", low: 1, units: "mcg" },
          { route: "IV q3-5min (Cardiac arrest)", low: 10, units: "mcg" },
        ],
      },
      {
        med: "Atropine",
        routes: [
          {
            route: "IV/IM",
            customFormula: {
              str: "0.02 mg/kg (<13y: max 1mg, ≥13y: max 2mg)",
              func: (age, weight) => {
                const dose = 0.02 * weight;
                if (dose < 0.1) {
                  return "0.1 mg (min dose)";
                }
                if (age < 13 && dose > 1) {
                  return "1.0 mg (max dose)";
                }
                if (age >= 13 && dose > 2) {
                  return "2.0 mg (max dose)";
                }
                return `${dose} mg`;
              },
            },
            notes:
              "Atropine and Succinylcholine should be readily accessible on your cart in syringes equipped with 22-25G needles",
          },
        ],
      },
      {
        med: "Adenosine",
        routes: [
          { route: "IV (1st dose)", low: 0.1, max: 6, units: "mg" },
          { route: "IV (2nd dose)", low: 0.2, max: 12, units: "mg" },
        ],
      },
      {
        med: "Amiodarone",
        routes: [{ route: "IV", low: 5, max: 300, units: "mg" }],
      },
      {
        med: "Calcium Chloride",
        routes: [{ route: "IV", low: 10, high: 20, max: 1000, units: "mg" }],
      },
      {
        med: "Calcium Gluconate",
        routes: [{ route: "IV", low: 30, high: 60, max: 1000, units: "mg" }],
      },
      {
        med: "Dantrolene",
        routes: [{ route: "IV", low: 2.5, max: 10, units: "mg" }],
      },
      {
        med: "Intralipid 20%",
        routes: [{ route: "IV", low: 1.5, high: 3, units: "mL" }],
      },
      { med: "Glucose", routes: [{ route: "IV", low: 0.5, units: "g" }] },
      {
        med: "Magnesium",
        routes: [{ route: "IV", low: 20, high: 50, max: 2000, units: "mg" }],
      },
      {
        med: "Sodium Bicarb",
        routes: [{ route: "IV", low: 1, high: 2, units: "mEq" }],
      },
      { med: "Caffeine", routes: [{ route: "IV", low: 10, units: "mg" }] },
      {
        med: "Naloxone (end case sleepy)",
        routes: [{ route: "IV", low: 0.8, units: "mcg" }],
      },
      {
        med: "Naloxone (opioid intoxication)",
        routes: [{ route: "IV", low: 10, units: "mcg" }],
      },
      { med: "Flumazenil ", routes: [{ route: "IV", low: 0.01, units: "mg" }] },
    ],
  },
  {
    cat: "Anaphylaxis",
    meds: [
      {
        med: "Epinephrine",
        routes: [{ route: "IV q3-5min", low: 1, units: "mcg" }],
      },
      {
        med: "Diphenhydramine",
        routes: [{ route: "IV", low: 1, high: 2, units: "mg" }],
      },
      {
        med: "Hydrocortisone",
        routes: [{ route: "IV", low: 1, high: 5, units: "mg" }],
      },
      { med: "Ranitidine", routes: [{ route: "IV", low: 1.5, units: "mg" }] },
    ],
  },
];

const id = (i, j) => i.toString() + "," + j.toString();

const roundToHundredth = (num) => Math.round(num * 100) / 100;

export { CATEGORIES, id, roundToHundredth };

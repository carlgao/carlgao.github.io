const SUCCINYLCHOLINE_IV_CONC = 20; // Succinylcholine IV concentration is 20 mg/mL
const TYLENOL_IV_CONC = 10; // Tylenol IV concentration is 10 mg/mL
const PREMEDICATION = "Premedication";
const INDUCTION = "Induction";
const MUSCLE_RELAXANTS = "Muscle Relaxants";

// based on https://pubmed.ncbi.nlm.nih.gov/36136079/#&gid=article-figures&pid=figure-2-uid-1
const PROPOFOL_AGE_DOSE_DATA = [
  { mean: 4.8, sd: 1.6 }, // 0 years
  { mean: 4.4, sd: 1.4 }, // 1 year
  { mean: 4.2, sd: 1.2 }, // 2 years
  { mean: 4.1, sd: 1.0 }, // 3 years
  { mean: 3.8, sd: 1.1 }, // 4 years
  { mean: 3.7, sd: 1.0 }, // 5 years
  { mean: 3.6, sd: 0.9 }, // 6 years
  { mean: 3.4, sd: 0.9 }, // 7 years
  { mean: 3.4, sd: 0.9 }, // 8 years
  { mean: 3.2, sd: 0.9 }, // 9 years
  { mean: 3.1, sd: 0.8 }, // 10 years
  { mean: 3.0, sd: 0.8 }, // 11 years
  { mean: 2.9, sd: 0.8 }, // 12 years
  { mean: 2.8, sd: 0.8 }, // 13 years
  { mean: 2.8, sd: 0.9 }, // 14 years
  { mean: 2.6, sd: 0.8 }, // 15 years
  { mean: 2.6, sd: 0.9 }, // 16 years
  { mean: 2.5, sd: 0.8 }, // 17 years
  { mean: 2.5, sd: 0.8 }, // 18 years (NOTE: not in the paper, but reasonable assumption)
];

const CATEGORIES = [
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
                if (
                  age === 0 ||
                  age === null ||
                  weight === 0 ||
                  weight === null
                ) {
                  return "-";
                }
                const dose = 0.02 * weight;
                let dosage;
                if (dose <= 0.1) {
                  dosage = "0.1 mg (min dose)";
                }
                if (age < 13 && dose >= 1) {
                  dosage = "1.0 mg (max dose)";
                }
                if (age >= 13 && dose >= 2) {
                  dosage = "2.0 mg (max dose)";
                } else {
                  dosage = `${dose} mg`;
                }
                return [dosage, null, null];
              },
            },
          },
        ],
      },
      {
        med: "Calcium Chloride",
        routes: [
          { route: "IV", low: 10, high: 20, max: 1000, units: "mg", conc: 100 },
        ],
      },
      {
        med: "Insulin",
        routes: [{ route: "IV", low: 0.1, units: "units" }],
      },
      { med: "Glucose", routes: [{ route: "IV", low: 0.5, units: "g" }] },
      {
        med: "Adenosine",
        routes: [
          { route: "IV (1st dose)", low: 0.1, max: 6, units: "mg", conc: 3 },
          { route: "IV (2nd dose)", low: 0.2, max: 12, units: "mg", conc: 3 },
        ],
      },
      {
        med: "Amiodarone",
        routes: [{ route: "IV", low: 5, max: 300, units: "mg", conc: 50 }],
      },
      {
        med: "Caffeine",
        routes: [{ route: "IV", low: 10, units: "mg", conc: 20 }],
      },
      {
        med: "Calcium Gluconate",
        routes: [
          { route: "IV", low: 30, high: 60, max: 1000, units: "mg", conc: 100 },
        ],
      },
      {
        med: "Flumazenil ",
        routes: [{ route: "IV", low: 0.01, units: "mg", conc: 0.1 }],
      },
      {
        med: "Intralipid 20%",
        routes: [
          { route: "IV", low: 1.5, units: "mL", notes: "Can repeat 1-2 times" },
        ],
      },
      {
        med: "Lidocaine",
        routes: [
          {
            route: "IV",
            low: 1,
            units: "mg",
            notes: "Follow with 20-50 mcg/kg/min",
          },
        ],
      },
      {
        med: "Magnesium",
        routes: [
          { route: "IV", low: 20, high: 50, max: 2000, units: "mg", conc: 500 },
        ],
      },
      {
        med: "Naloxone (opioid intoxication)",
        routes: [{ route: "IV", low: 10, units: "mcg" }],
      },
      {
        med: "Sodium Bicarb",
        routes: [{ route: "IV", low: 1, high: 2, units: "mEq" }],
      },
    ],
  },
  {
    cat: "Blood Products",
    meds: [
      {
        med: "pRBC",
        routes: [
          {
            route: "",
            low: 10,
            high: 15,
            units: "mL",
            notes: "Rise Hct 6-9/Hgb 2-3",
          },
        ],
      },
      {
        med: "Cryoprecipitate",
        routes: [
          {
            route: "",
            low: 1,
            high: 2,
            units: "Units",
            notes: "Rise Fibrinogen 60-100 mg/dL",
          },
        ],
      },
      {
        med: "FFP",
        routes: [
          {
            route: "",
            low: 10,
            high: 15,
            units: "mL",
            notes: "Rise Factors 15-20%",
          },
        ],
      },
      {
        med: "Platelets",
        routes: [
          { route: "", low: 5, high: 10, units: "mL", notes: "Rise 50-100K" },
        ],
      },
      {
        med: "DDAVP",
        routes: [
          {
            route: "",
            low: 0.1,
            high: 0.3,
            units: "mcg",
            notes: "(30 min prior to proc)",
          },
        ],
      },
    ],
  },
  {
    cat: "Malignant Hyperthermia",
    meds: [
      {
        med: "Dantrolene",
        routes: [
          {
            route: "IV",
            low: 2.5,
            units: "mg",
            notes: "Max = 10mg/kg = 4 doses. MH hotline: 1-800-644-9737",
          },
        ],
      },
    ],
  },
  {
    cat: PREMEDICATION,
    meds: [
      {
        med: "Midazolam",
        routes: [
          {
            route: "IV/IM",
            low: 0.05,
            high: 0.1,
            units: "mg",
            conc: 1,
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
            low: 0.5,
            high: 2,
            units: "mg",
            conc: 10,
          },
          {
            route: "IM",
            low: 3,
            high: 7,
            units: "mg",
            conc: 100,
          },
        ],
      },
      {
        med: "Dexmedetomidine",
        routes: [
          {
            route: "IV",
            low: 0.3,
            high: 2,
            units: "mcg",
            conc: 4,
            notes: "Over 10 minutes",
          },
        ],
      },
    ],
  },
  {
    cat: INDUCTION,
    meds: [
      {
        med: "Propofol",
        routes: [
          {
            route: "IV",
            low: 2,
            high: 3,
            units: "mg",
            conc: 10,
            customFormula: {
              str: (age) => {
                if (age === undefined || age < 0 || age > 18) {
                  return "-";
                }
            
                const roundedAge = Math.floor(age);
                const doseData = PROPOFOL_AGE_DOSE_DATA[roundedAge];
            
                if (!doseData) {
                  return "-";
                }
            
                const { mean, sd } = doseData;
                return `${mean} ± ${sd} mg/kg`;
              },
              func: (age, weight) => {
                if (age === undefined || weight === undefined || age < 0 || age > 18) {
                  return "-";
                }
            
                const roundedAge = Math.floor(age);
                const doseData = PROPOFOL_AGE_DOSE_DATA[roundedAge];
            
                if (!doseData) {
                  return "-";
                }
            
                const { mean, sd } = doseData;
            
                const lowDose = Math.max(0, (mean - sd) * weight);
                const highDose = Math.max(0, (mean + sd) * weight);
            
                return [`${lowDose.toFixed(2)} - ${highDose.toFixed(2)} mg`, null, null];
              },
            },
          },
        ],
      },
      {
        med: "Etomidate",
        routes: [{ route: "IV", low: 0.3, units: "mg", conc: 2 }],
      },
      {
        med: "Ketamine",
        routes: [{ route: "IV", low: 1, high: 2, units: "mg", conc: 10 }],
      },
    ],
  },
  {
    cat: MUSCLE_RELAXANTS,
    meds: [
      {
        med: "Rocuronium",
        routes: [
          {
            route: "IV",
            low: 0.6,
            units: "mg",
            conc: 10,
          },
          {
            route: "IV (RSI)",
            low: 1.2,
            units: "mg",
            conc: 10,
          },
        ],
      },
      {
        med: "Vecuronium",
        routes: [{ route: "IV", low: 0.1, units: "mg" }],
      },
      {
        med: "Cisatracurium",
        routes: [{ route: "IV", low: 0.1, high: 0.2, units: "mg", conc: 2 }],
      },
      {
        med: "Succinylcholine",
        routes: [
          {
            route: "IV",
            customFormula: {
              str: "<1y: 2-3 mg/kg, >1y: 1-2 mg/kg",
              func: (age, weight) => {
                if (
                  age === 0 ||
                  weight === 0 ||
                  age === null ||
                  weight === null
                ) {
                  return "-";
                }
                const lowDose = roundToHundredth(age < 1 ? 2 * weight : weight);
                const highDose = roundToHundredth(
                  age < 1 ? 3 * weight : 2 * weight
                );
                const lowVolume = roundToHundredth(
                  lowDose / SUCCINYLCHOLINE_IV_CONC
                );
                const highVolume = roundToHundredth(
                  highDose / SUCCINYLCHOLINE_IV_CONC
                );
                return [
                  `${lowDose}-${highDose} mg`,
                  `${lowVolume}-${highVolume}cc`,
                  `${SUCCINYLCHOLINE_IV_CONC} mg/mL`,
                ];
              },
            },
            conc: SUCCINYLCHOLINE_IV_CONC,
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
    cat: "Antiemetics",
    meds: [
      {
        med: "Dexamethasone",
        routes: [{ route: "IV", low: 0.1, max: 4, units: "mg", conc: 4 }],
      },
      {
        med: "Ondansetron",
        routes: [{ route: "IV", low: 0.1, max: 4, units: "mg", conc: 2 }],
      },
      {
        med: "Metoclopramide",
        routes: [{ route: "IV/PO", low: 0.15, max: 10, units: "mg", conc: 5 }],
      },
      {
        med: "Droperidol",
        routes: [{ route: "IV", low: 10, units: "mcg" }],
      },
    ],
  },
  {
    cat: "Muscle Relaxant Reversal",
    meds: [
      {
        med: "Glycopyrrolate",
        routes: [{ route: "IV", low: 7, high: 15, units: "mcg", conc: 200 }],
      },
      {
        med: "Neostigmine",
        routes: [
          { route: "IV", low: 0.035, high: 0.075, units: "mg", conc: 1 },
        ],
      },
      {
        med: "Atropine (infants)",
        routes: [{ route: "IV", low: 0.02, units: "mg" }],
      },
      {
        med: "Sugammadex",
        routes: [
          {
            route: "IV (TOF≥2)",
            low: 2,
            units: "mg",
            conc: 100,
          },
          {
            route: "IV (TOF<2)",
            low: 4,
            units: "mg",
            conc: 100,
          },
          {
            route: "IV (immediate reversal)",
            low: 16,
            units: "mg",
            conc: 100,
          },
        ],
      },
    ],
  },
  {
    cat: "Pain Medications",
    meds: [
      {
        med: "Tylenol",
        routes: [
          {
            route: "PO",
            low: 10,
            high: 15,
            units: "mg",
            notes: "Max 40 mg/kg/day up to 3g/day",
          },
          {
            route: "PR",
            low: 30,
            units: "mg",
            notes: "Max 40 mg/kg/day up to 3g/day",
          },
          {
            route: "IV (Q6)",
            customFormula: {
              str: "<1mo: 7.5 mg/kg, 1mo-2y: 10 mg/kg, >2y: 15 mg/kg",
              func: (age, weight) => {
                if (
                  age === 0 ||
                  age === null ||
                  weight === 0 ||
                  weight === null
                ) {
                  return "-";
                }
                const dose = roundToHundredth(
                  age < 1 / 12
                    ? 7.5 * weight
                    : age <= 2
                    ? 10 * weight
                    : 15 * weight
                );
                const volume = roundToHundredth(dose / TYLENOL_IV_CONC);
                return [
                  `${dose} mg`,
                  `${volume}cc`,
                  `${TYLENOL_IV_CONC} mg/mL`,
                ];
              },
            },
            notes: "Max 75 mg/kg/day up to 3g/day",
          },
        ],
      },
      {
        med: "Hydromorphone",
        routes: [{ route: "IV", low: 0.005, high: 0.015, units: "mg" }],
      },
      {
        med: "Fentanyl",
        routes: [
          { route: "IV", low: 0.5, high: 1, units: "mcg", conc: 50 },
          { route: "Nasal", low: 2, units: "mcg" },
        ],
      },
      {
        med: "Morphine",
        routes: [{ route: "IV", low: 0.05, high: 0.1, units: "mg" }],
      },
      {
        med: "Toradol",
        routes: [{ route: "IV", low: 0.5, max: 30, units: "mg", conc: 30 }],
      },
      {
        med: "Ketamine",
        routes: [{ route: "IV", low: 0.25, high: 1, units: "mg", conc: 10 }],
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
          { route: "IV", low: 30, max: 3000, units: "mg", notes: "IVP" },
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
        routes: [
          { route: "IV", low: 2, units: "mg", notes: "Over 60 minutes" },
        ],
      },
      {
        med: "Metronidazole (Q6)",
        routes: [{ route: "IV", low: 10, max: 500, units: "mg" }],
      },
      {
        med: "Vancomycin (Q12)",
        routes: [
          { route: "IV", low: 15, max: 1500, units: "mg", notes: "Slow IVP" },
        ],
      },
      {
        med: "Zosyn(Pip/Tazo)",
        routes: [{ route: "IV", low: 75, max: 3375, units: "mg" }],
      },
    ],
  },
  {
    cat: "Infusions",
    meds: [
      {
        med: "Propofol",
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
    cat: "Anaphylaxis",
    meds: [
      {
        med: "Epinephrine",
        routes: [{ route: "IV q3-5min", low: 1, units: "mcg" }],
      },
      {
        med: "Fluid bolus",
        routes: [{ route: "IV", low: 20, units: "mL" }],
      },
      {
        med: "Diphenhydramine",
        routes: [{ route: "IV", low: 1, high: 2, units: "mg", conc: 50 }],
      },
      {
        med: "Hydrocortisone",
        routes: [{ route: "IV", low: 1, high: 5, units: "mg" }],
      },
      {
        med: "Ranitidine",
        routes: [{ route: "IV", low: 1.5, units: "mg", conc: 25 }],
      },
    ],
  },
];
const INIT_OPEN = [PREMEDICATION, INDUCTION, MUSCLE_RELAXANTS];
const id = (i, j) => i.toString() + "," + j.toString();
const roundToHundredth = (num) => Math.round(num * 100) / 100;
export { CATEGORIES, INIT_OPEN, id, roundToHundredth };

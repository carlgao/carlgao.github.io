# Medicine Data

```
[
    {
        cat: "Premedication",
        meds: [
            {
                med: "Midazolam",
                notes: "Use concentrated Midazolam for IM and Nasal"
                routes: [
                    {
                        route: "IV/IM",
                        formula: "0.05-0.1 mg/kg",
                        units: "mg",
                        calcLow: (weight) => 0.05 * weight
                        calcHigh: (weight) => 0.1 * weight
                    },
                    {
                        route: "PO"
                        ...
                    },
                    {
                        route: "Nasal"
                        ...
                    }
                ]
            }
            ...
        ]
    },
    {
        cat: "Induction",
        meds: [
            ...
        ]
    },
    ...
]
```

# Inputs

- Age (years), float
- Weight (kg), float
- Medicine categories
- Medicines

# State

- age (years), float
- weight (kg), float
- checked medicine names, Set(string)

# Outputs

- ETT size cuffed
- ETT size uncuffed
- Face mask size
- Allowable blood loss
- Nonzero medicine categories
- Medicine amounts

# Todo

- Delete CRA images and App.css

# Flourishes

- Age input as months
- Weight input as lbs
- Save input history
- Favicon
- Logo
- "Designed by"
- Legal liability notice
- Ads
- <meta> tags
- SEO

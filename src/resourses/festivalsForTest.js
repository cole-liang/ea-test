export const sourceList = [
  {
    name: "LOL-palooza",
    bands: [
      {
        name: "Winter Primates",
        recordLabel: ""
      },
      {
        name: "Squint-281",
        recordLabel: "Outerscope"
      },
      {
        name: "Auditones",
        recordLabel: "ACR"
      }
    ]
  },
  {
    name: "Twisted Tour",
    bands: [
      {
        name: "Squint-281"
      }
    ]
  },
  {
    bands: [
      {
        name: "Critter Girls",
        recordLabel: "ACR"
      },
      {
        name: "Propeller",
        recordLabel: "Pacific Records"
      }
    ]
  }
];

export const expectedList = [
  {
    recordLabel: "ACR",
    bands: [
      { bandName: "Auditones", festivals: ["LOL-palooza"] },
      { bandName: "Critter Girls", festivals: [] }
    ]
  },
  {
    recordLabel: "Outerscope",
    bands: [
      { bandName: "Squint-281", festivals: ["LOL-palooza", "Twisted Tour"] }
    ]
  },
  {
    recordLabel: "Pacific Records",
    bands: [{ bandName: "Propeller", festivals: [] }]
  },
  {
    recordLabel: "No Specified Record",
    bands: [{ bandName: "Winter Primates", festivals: ["LOL-palooza"] }]
  }
];

export const flattenSourceList = [
  {
    name: "LOL-palooza",
    bands: [
      {
        name: "Winter Primates",
        recordLabel: ""
      },
      {
        name: "Squint-281",
        recordLabel: "Outerscope"
      }
    ]
  },
  {
    name: "Twisted Tour",
    bands: [
      {
        name: "Squint-281"
      }
    ]
  },
  {
    bands: [
      {
        name: "Critter Girls",
        recordLabel: "ACR"
      }
    ]
  }
];

export const flattenExpectedList = [
  {
    festivalName: "LOL-palooza",
    name: "Winter Primates",
    recordLabel: ""
  },
  {
    festivalName: "LOL-palooza",
    name: "Squint-281",
    recordLabel: "Outerscope"
  },
  {
    festivalName: "Twisted Tour",
    name: "Squint-281"
  },
  {
    festivalName: undefined,
    name: "Critter Girls",
    recordLabel: "ACR"
  }
];

export const banFesExpectedObj = {
  "Winter Primates": ["LOL-palooza"],
  "Squint-281": ["LOL-palooza", "Twisted Tour"],
  "Critter Girls": []
};

export const recBanExpectedObj = {
  ACR: ["Critter Girls"],
  "": ["Winter Primates"],
  Outerscope: ["Squint-281"],
  undefined: ["Squint-281"]
};

export const expectedBandOcc = new Set(["Squint-281", "Critter Girls"]);

export const expectedFinalResult = [
  {
    recordLabel: "ACR",
    bands: [{ bandName: "Critter Girls", festivals: [] }]
  },
  {
    recordLabel: "Outerscope",
    bands: [
      { bandName: "Squint-281", festivals: ["LOL-palooza", "Twisted Tour"] }
    ]
  },
  {
    recordLabel: "No Specified Record",
    bands: [{ bandName: "Winter Primates", festivals: ["LOL-palooza"] }]
  }
];

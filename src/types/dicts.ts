//We will move this to a const object as we may need it in other areas in the app.
const prodcut_dictionary = {
  A: 'Advice',
  B: 'Bundle',
  C: 'Climate',
  M: 'Metadata',
  E: 'Analysis',
  F: 'Forecast',
  N: 'Numerical Weather Prediction',
  O: 'Observation',
  Q: 'Reference',
  R: 'Radar',
  S: 'Special',
  T: 'Satellite',
  W: 'Warning',
  X: 'Mixed',
};

export const product_map = new Map(Object.entries(prodcut_dictionary));

const service_dictionary = {
  COM: 'Commercial Services',
  HFW: 'Flood Warning Service',
  TWS: 'Tsunami Warning Services',
  WAP: 'Analysis and Prediction',
  WSA: 'Aviation Weather Services',
  WSD: 'Defence Weather Services',
  WSF: 'Fire Weather Services',
  WSM: 'Marine Weather Services',
  WSP: 'Public Weather Services',
  WSS: 'Cost Recovery Services',
  WSW: 'Disaster Mitigation',
};

export const service_map = new Map(Object.entries(service_dictionary));

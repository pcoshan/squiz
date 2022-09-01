export type FloodWarningResponse = {
  amoc: {
    source: FloodWarningSourceBoM;
    identifier: string;
    ['issue-time-utc']: string;
    ['issue-time-local']: string;
    ['sent-time']: string;
    ['expiry-time']: string;
    ['validity-bgn-time-local']: string;
    ['validity-end-time-local']: string;
    ['next-routine-issue-time-utc']: string;
    ['next-routine-issue-time-local']: string;
    status: string;
    service: string;
    ['sub-service']: string;
    ['product-type']: string;
  };
};

export type FloodWarningSourceBoM = {
  sender: string;
  region: string;
  office: string;
  copyright: string;
  disclaimer: string;
};

export type FloodWarningParsed = {
  product: string | null;
  service: string | null;
  start: string | null;
  expiry: string | null;
};

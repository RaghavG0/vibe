export type FormData = {
  firstName: string;
  lastName: string;
  userName: string;
  dob: string;
  country: string;
  colorTheme: string;
  language: string;
  currency: string;
  dateFormat: string;
  bringHere: string;
  goals: string[];
  primaryGoal: string;
  timeFrame: string;
  riskTolerance: string;
  [key: string]: string | string[];
};

export type CurrencyOption = {
  code: string;
  name: string;
  symbol: string;
};
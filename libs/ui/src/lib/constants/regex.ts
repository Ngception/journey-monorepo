export const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
export const mediumPasswordRegex =
  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
export const containsSpacesRegex = /\s/;
export const atLeastOneLowerLetterRegex = /(?=.*[a-z])/;
export const atleastOneUpperLetterRegex = /(?=.*[A-Z])/;
export const atLeastOneNumberRegex = /(?=.*[0-9])/;
export const atLeastOneSpecialCharRegex = /(?=.*[!@#$%^&*])/;
export const isSixCharsOrLongerRegex = /(?=.{6,})/;

export const isStrongPassword = (data: string): boolean => {
  return strongPasswordRegex.test(data);
};

export const isMediumPassword = (data: string): boolean => {
  return mediumPasswordRegex.test(data);
};

export const containsSpaces = (data: string): boolean => {
  return containsSpacesRegex.test(data);
};

export const hasAtLeastOneLowerLetter = (data: string): boolean => {
  return atLeastOneLowerLetterRegex.test(data);
};

export const hasAtLeastOneUpperLetter = (data: string): boolean => {
  return atleastOneUpperLetterRegex.test(data);
};

export const hasAtLeastOneNumber = (data: string): boolean => {
  return atLeastOneNumberRegex.test(data);
};

export const hasAtLeastOneSpecialChar = (data: string): boolean => {
  return atLeastOneSpecialCharRegex.test(data);
};

export const isSixCharsOrLonger = (data: string): boolean => {
  return isSixCharsOrLongerRegex.test(data);
};

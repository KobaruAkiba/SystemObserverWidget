// Helps compile time to recognize if string is a name of the object T
export const nameof = <T>(name: keyof T): keyof T => name;


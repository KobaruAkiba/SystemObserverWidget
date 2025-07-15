/**
 * Extracts the key name from object T, helping the compiler recognizing if extracted name is a key of the object itself
 * @param name Name of the object's key to return
 * @returns The keyof the object as a string
 */
export const nameof = <T>(name: keyof T): keyof T => name;


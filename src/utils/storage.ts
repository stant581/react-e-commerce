export const save = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

/**
 * Loads a value from localStorage and parses it from JSON.
 * Returns null if the item doesn't exist or parsing fails.
 */
export const load = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};

/**
 * 
 * It will return User like this ->
 * {
 * "name": "John Doe",
 * "email": "john@doe.com"
 * }
 */

/**
 * Removes an item from localStorage.
 */
export const remove = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};
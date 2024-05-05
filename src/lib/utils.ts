/**
 * Generate random string of alphanumerical characters.
 *
 * @param {number} length this is the length of the string to return
 * @returns {string}
 */
export function randomId(length: number): string {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
}

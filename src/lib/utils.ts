/**
 * Generate random string of alphanumerical characters.
 *
 * @param {number} length this is the length of the string to return
 * @returns {string}
 */
export function randomId(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
}

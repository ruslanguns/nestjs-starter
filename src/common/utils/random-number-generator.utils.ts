/**
 * Method to generate a random number from min to max
 * @param min Number from
 * @param max Number max
 */
export const randomNumberGenerator = (min, max): number => Math.floor(Math.random() * (max - min + 1)) + min;

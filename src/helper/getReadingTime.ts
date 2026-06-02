/**
 *  @description A helper function to calculate the estimated reading time of a given text.
 *  The function assumes an average reading speed of 200 words per minute and calculates the reading time based on the number of words in the input text.
 * @param {string} text - The input text for which the reading time is to be calculated.
 * @param {number} [wordsPerMinute=200] - The average reading speed in words per minute.
 * @returns {number} The estimated reading time in minutes.
 */
export const getReadingTime = (text: string, wordsPerMinute: number = 200) => {
  const numberOfWords = text.split(/\s/g).length;
  return Math.ceil(numberOfWords / wordsPerMinute);
};

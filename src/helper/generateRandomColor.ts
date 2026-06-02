/**
 * @description A helper function to generate a random hexadecimal color code. The function creates random values for the Red, Green, and Blue channels, converts them to hexadecimal format, and concatenates them to form a complete hex color string.
 * @returns {string} A random hexadecimal color code in the format of #RRGGBB.
 */

export function generateRandomColor(): string {
  // Generate random values for Red, Green, and Blue channels
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Convert RGB values to hexadecimal format
  const hexRed = red.toString(16).padStart(2, '0');
  const hexGreen = green.toString(16).padStart(2, '0');
  const hexBlue = blue.toString(16).padStart(2, '0');

  // Concatenate the hexadecimal values
  const hexColor = `#${hexRed}${hexGreen}${hexBlue}`;

  return hexColor;
}

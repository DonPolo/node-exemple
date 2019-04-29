import i18next from 'i18next';

/**
 * Get a random response in the good language
 * @param key Key for the text : string
 * @param params Parameters to put on the text: any
 * @returns A response : string
 */
export default function(key: string, params: any = null): string {
  let parameters = params;
  if (!parameters) {
    parameters = {};
  }
  parameters.returnObjects = true;
  const possibilities = i18next.t(key, parameters);
  if (Array.isArray(possibilities)) {
    return possibilities[Math.floor(Math.random() * possibilities.length)];
  }
  return possibilities;
}

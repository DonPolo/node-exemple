import i18next from 'i18next';

export default function(key: string, params: any = null) {
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

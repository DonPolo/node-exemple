/**
 * Clone a Json object
 * @param src the object to clone
 */
export function clone(src: any) {
  return JSON.parse(JSON.stringify(src));
}

export function isEmpty(obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

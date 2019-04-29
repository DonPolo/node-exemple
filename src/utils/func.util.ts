/**
 * Clone a Json object
 * @param src the object to clone
 */
export function clone(src: any) {
  return JSON.parse(JSON.stringify(src));
}

export const pad = (n: number) => {
  return n < 10 ? `0${n}` : n;
};
export const prettyDate = (value: number) => {
  const date = new Date(value);
  return `${pad(date.getDate())}/${pad(
    date.getMonth() + 1,
  )}/${date.getFullYear()} ${pad(date.getHours())}h${pad(date.getMinutes())}`;
};

export const escapeNewLine = (text: string) => {
  let newtxt: string = text;
  let a = newtxt.indexOf('"');
  while (a > -1) {
    if (a === 0 || newtxt.charAt(a - 1) !== '\\') {
      let b = newtxt.indexOf('"', a + 1);
      while (b > -1 && newtxt.charAt(b - 1) === '\\') {
        b = newtxt.indexOf('"', b + 1);
      }
      if (b > -1) {
        let t = newtxt.substring(a + 1, b);
        t = t.replace(/\n/g, '\\n');
        newtxt = newtxt.substring(0, a + 1) + t + newtxt.substring(b);
      }
      a = newtxt.indexOf('"', b + 1);
    } else {
      a = newtxt.indexOf('"', a + 1);
    }
  }
  return newtxt;
};

export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

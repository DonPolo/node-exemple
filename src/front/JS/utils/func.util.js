export const pad = (n) => {
  return n < 10 ? `0${n}` : n;
}
export const prettyDate = (value) => {
  const date = new Date(value);
  return `${pad(date.getDate())}/${pad(
    date.getMonth() + 1,
  )}/${date.getFullYear()} ${pad(date.getHours())}h${pad(date.getMinutes())}`;
}

export const escapeNewLine = (text) => {
  let a = text.indexOf('"');
  while(a > -1) {
    if (a == 0 || text.charAt(a-1) != "\\") {
      let b = text.indexOf('"', a+1);
      while(b > -1 && text.charAt(b-1) == "\\") {
        b = text.indexOf('"', b+1);
      }
      if (b > -1) {
        let t = text.substring(a+1, b);
        t = t.replace(/\n/g, '\\n');
        text = text.substring(0, a+1) + t + text.substring(b);
      }
      a = text.indexOf('"', b+1);
    } else {
      a = text.indexOf('"', a+1);
    }

  }
  return text;
}

export const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

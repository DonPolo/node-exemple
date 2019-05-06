/* ### Horaires ### */
const days = [
  'dimanche',
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
];
function formatHoraires(horaires: any[]) {
  const horairesgroup = this.groupByDay(horaires);
  const groups = this.groupByHoraires(horairesgroup);
  let res = this.writeHoraires(groups[0]);
  for (let i = 1; i < groups.length - 1; i += 1) {
    res += `, ${this.writeHoraires(groups[i])}`;
  }
  if (res.length > 1) {
    res += ` et ${this.writeHoraires(groups[groups.length - 1])}`;
  }
  return res;
}

function writeHoraires(horaires: any) {
  let res = '';
  if (horaires.days.length === 1) {
    res += `le ${horaires.days[0]}`;
  } else {
    res += `les ${horaires.days[0]}s`;
    for (let j = 1; j < horaires.days.length - 1; j += 1) {
      res += `, ${horaires.days[j]}s`;
    }
    res += ` et ${horaires.days[horaires.days.length - 1]}s`;
  }
  res += ` de ${horaires.schedules[0].start} à ${horaires.schedules[0].end}`;
  if (horaires.schedules.length > 1) {
    for (let i = 1; i < horaires.schedules.length - 1; i += 1) {
      res += `, de ${horaires.schedules[i].start} à ${
        horaires.schedules[i].end
      }`;
    }
    res += ` et de ${
      horaires.schedules[horaires.schedules.length - 1].start
    } à ${horaires.schedules[horaires.schedules.length - 1].end}`;
  }
  return res;
}

function groupByHoraires(horairesgroup: any[]) {
  const groups: any[] = [];
  for (const key in horairesgroup) {
    if (horairesgroup[key]) {
      let ok = false;
      for (const key2 in horairesgroup) {
        if (horairesgroup[key2]) {
          if (
            key !== key2 &&
            JSON.stringify(horairesgroup[key]) ===
              JSON.stringify(horairesgroup[key2])
          ) {
            ok = true;
            const g = groups.filter(
              gr =>
                JSON.stringify(gr.schedules) ===
                JSON.stringify(horairesgroup[key]),
            );
            if (g.length > 0) {
              if (!g[0].days.includes(key)) {
                g[0].days.push(key);
              }
              if (!g[0].days.includes(key2)) {
                g[0].days.push(key2);
              }
            } else {
              groups.push({
                schedules: horairesgroup[key],
                days: [key, key2],
              });
            }
          }
        }
      }
      if (!ok) {
        groups.push({
          schedules: horairesgroup[key],
          days: [key],
        });
      }
    }
  }
  return groups;
}

function groupByDay(horaires: any[], day: string | null = null) {
  const res: any = {
    lundi: [],
    mardi: [],
    mercredi: [],
    jeudi: [],
    vendredi: [],
    samedi: [],
    dimanche: [],
  };
  horaires.forEach(element => {
    res[element.jour].push({ start: element.start, end: element.end });
  });
  for (const key in res) {
    if (res[key]) {
      if (res[key].length === 0 || (day && key !== day)) {
        delete res[key];
      }
    }
  }
  return res;
}

function sortByDay(horaires: any[]) {
  horaires.sort((a: any, b: any) => {
    return days.indexOf(a.jour) - days.indexOf(b.jour);
  });
  return horaires;
}

function getDayFromNow(d: number) {
  const date: Date = new Date(Date.now());
  date.setDate(date.getDate() + d);
  const day = date.getDay();
  return days[day];
}

export default {
  horaires: {
    days,
    getDayFromNow,
    formatHoraires,
    writeHoraires,
    groupByHoraires,
    groupByDay,
    sortByDay,
  },
};

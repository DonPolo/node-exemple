const fetchIt = (url: string, datas: any = {}) => {
  return fetch(url, datas);
};

export default {
  fetchIt,
};

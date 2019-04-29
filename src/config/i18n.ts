import i18n from 'i18next';
import i18nextBackend from 'i18next-node-fs-backend';
import moment from 'moment';

const isDev = process.env.NODE_ENV === 'development';

/*i18n.use(i18nextBackend).init({
  lng: 'fr-tu',
  fallbackLng: 'fr-tu',
  preload: ['fr-tu'],
  saveMissing: true,
  debug: isDev,
  interpolation: {
    format: (value, format) => {
      if (format === 'capitalize')
        return value.charAt(0).toUpperCase() + value.slice(1);
      if (value instanceof Date) return moment(value).format(format);
      return value;
    },
  },
  backend: {
    // path where resources get loaded from
    loadPath: 'locales/{{lng}}/{{ns}}.json',
    // path to post missing resources
    addPath: 'locales/{{lng}}/{{ns}}.missing.json',
    // jsonIndent to use when storing json files
    jsonIndent: 2,
  },
});*/

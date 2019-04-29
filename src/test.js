let val = {
  intent: 'default.greeting',
  type: 'default',
  responses: [
    { desc: null },
    {
      text: null,
      'fr-tu': [ 'Ca va super', 'Ca va bien et toi' ],
      'fr-vous': [ 'je vais bien', 'je me porte bien' ]
    },
    { media: null },
    { link: null },
    {
      btn: null,
      nextaction: 'titi',
      'fr-tu': [ { text: 'toto', value: 2 }, { text: 'greg', value: 3 } ],
      'fr-vous': [ { text: 'gerr', value: 2 }, { text: 'gregre', value: 3 } ]
    },
    {
      dropdown: null,
      nextaction: 'tata',
      'fr-tu':
       [ { text: 'gre', value: 5 },
         { text: 'ge', value: 6 },
         { text: 'htehet', value: 7 } ],
      'fr-vous':
       [ { text: 'ethte', value: 5 },
         { text: 'ethte', value: 6 },
         { text: 'hehte', value: 7 } ]
    },
    { text: null,
      'fr-tu': [ 'Ca va super', 'Ca va bien et toi' ],
      'fr-vous': [ 'je vais bien', 'je me porte bien' ] } ]
};

let fallback = {
  intent: 'default.fallback',
  type: 'default',
  responses: [
    { desc: null },
    {
      text: null,
      'fr-tu': [ 'Oooups j\'ai pas compris' ],
      'fr-vous': [ 'Je suis désolé, je n\'ai pas compris' ]
    },
  ]
};

const Datastore = require('nedb');
const db = new Datastore({ filename: 'DB/responses', autoload: true });
db.insert(fallback, (err, newDoc) => {
  console.log(newDoc);
  console.log(' a bien été inséré');
});

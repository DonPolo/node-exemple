// @flow
import Datastore from 'nedb';

const Engie = new Datastore({
  filename: './db/engie.db',
  autoload: true
});

export const indexes = [
  {
    fieldName: 'tel',
    unique: true,
    sparse: true
  }
];

export default Engie;

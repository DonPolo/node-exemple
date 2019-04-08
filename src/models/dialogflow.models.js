// @flow
import Datastore from 'nedb';

const Dialogflow = new Datastore({
  filename: './db/dialogflow.db',
  autoload: true
});

export const indexes = [
  {
    fieldName: 'tel',
    unique: true,
    sparse: true
  }
];

export default Dialogflow;

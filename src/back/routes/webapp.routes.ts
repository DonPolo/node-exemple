import express from 'express';
import bodyparser from 'body-parser';

import WebappControllers from '../controllers/webapp.controllers';

const routes = express.Router();
const urlencodedParser = bodyparser.urlencoded({ extended: false });

// Ajax call home
routes.post('/delete', urlencodedParser, WebappControllers.delete);
// Ajax call home
routes.post('/modif', urlencodedParser, WebappControllers.modif);
// Ajax call file
routes.post('/save', urlencodedParser, WebappControllers.save);
// Ajax call chat
routes.post('/sendmessage', urlencodedParser, WebappControllers.sendmessage);
// Ajax call chat
routes.post('/sendevent', urlencodedParser, WebappControllers.sendevent);
// Ajax call analytics
routes.post('/archived', urlencodedParser, WebappControllers.archived);
// Ajax call analytics
routes.post('/recover', urlencodedParser, WebappControllers.recover);

// routes.post('/addresponse', urlencodedParser, WebappControllers.addresponse);
// routes.post('/login', urlencodedParser, WebappControllers.login);

// Query
routes.all('/api', urlencodedParser, WebappControllers.api);

routes.get('/disconnect', WebappControllers.disconnect);
routes.all('*', WebappControllers.all);

export default routes;

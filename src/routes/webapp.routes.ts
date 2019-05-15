import express from 'express';
import bodyparser from 'body-parser';

import WebappControllers from '../controllers/webapp.controllers';

const routes = express.Router();
const urlencodedParser = bodyparser.urlencoded({ extended: false });

routes.all('/', WebappControllers.home);

// Ajax call home
routes.post('/delete', urlencodedParser, WebappControllers.delete);
// Ajax call home
routes.post('/modif', urlencodedParser, WebappControllers.modif);
// Ajax call file
routes.post('/save', urlencodedParser, WebappControllers.save);
// Ajax call file
routes.post('/getfiles', urlencodedParser, WebappControllers.getfiles);
// Ajax call file
routes.post('/getentities', urlencodedParser, WebappControllers.getentities);
// Ajax call chat
routes.post('/sendmessage', urlencodedParser, WebappControllers.sendmessage);
// Ajax call chat
routes.post('/sendevent', urlencodedParser, WebappControllers.sendevent);
// Ajax call analytics
routes.post('/archived', urlencodedParser, WebappControllers.archived);
// Ajax call analytics
routes.post('/recover', urlencodedParser, WebappControllers.recover);


routes.all('/login', WebappControllers.login);
routes.get('/disconnect', WebappControllers.disconnect);
routes.get('/chat', WebappControllers.chat);
routes.all('/addresponse', WebappControllers.addresponse);
routes.all('/analytics', WebappControllers.analytics);
routes.all('/:type/:cat/:name', WebappControllers.file);

export default routes;

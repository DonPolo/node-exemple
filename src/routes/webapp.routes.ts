import express from 'express';
import bodyparser from 'body-parser';

import WebappControllers from '../controllers/webapp.controllers';

const routes = express.Router();
const urlencodedParser = bodyparser.urlencoded({ extended: false });

routes.all('/', WebappControllers.home);

// Ajax call
routes.post('/delete', urlencodedParser, WebappControllers.delete);
// Ajax call
routes.post('/modif', urlencodedParser, WebappControllers.modif);
// Ajax call
routes.post('/save', urlencodedParser, WebappControllers.save);
// Ajax call
routes.post('/getfiles', urlencodedParser, WebappControllers.getfiles);
// Ajax call
routes.post('/getentities', urlencodedParser, WebappControllers.getentities);
// Ajax call
routes.post('/sendmessage', urlencodedParser, WebappControllers.sendmessage);
// Ajax call
routes.post('/sendevent', urlencodedParser, WebappControllers.sendevent);

routes.all('/login', WebappControllers.login);
routes.get('/disconnect', WebappControllers.disconnect);
routes.get('/chat', WebappControllers.chat);
routes.all('/addresponse', WebappControllers.addresponse);
routes.all('/analytics', WebappControllers.analytics);
routes.all('/:type/:cat/:name', WebappControllers.file);

export default routes;

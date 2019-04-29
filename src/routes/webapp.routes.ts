import express from 'express';
import bodyparser from 'body-parser';

import WebappControllers from '../controllers/webapp.controllers';

const routes = express.Router();
const urlencodedParser = bodyparser.urlencoded({ extended: false });

routes.all('/', WebappControllers.home);

// Ajax call
routes.post('/save', urlencodedParser, WebappControllers.save);
// Ajax call
routes.post('/getfiles', urlencodedParser, WebappControllers.getfiles);

routes.all('/:type', WebappControllers.type);
routes.all('/:type/:cat/:name', WebappControllers.file);

export default routes;

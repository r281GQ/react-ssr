import 'babel-polyfill';
import express from 'express';

import createHtml from './server';

const app = express();

app.use(express.static('public'));

app.get('*', async (request, response) =>
  response.send(await createHtml(request.path))
);

app.listen(3000, () => console.log('App started!'));

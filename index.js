import express from 'express';
import fetch from 'isomorphic-fetch';
import 'babel-polyfill';

global.fetch = fetch;

import createHtml from './server';

const app = express();

// the client will grab the SPA React from here
app.use(express.static('public'));

// every route hit will get its own SSR html
app.get('*', async (request, response) =>
  response.send(await createHtml(request.path, request.get('cookie')))
);

app.listen(3000, () => console.log('App started!'));

import express from 'express';

import React from 'react';
import ReactDomServer from 'react-dom/server';
import Helmet from 'react-helmet';

import ReactRoot from './src/index';

const createTemplate = (helmet, html) =>
  `<html><head>${helmet.meta.toString()}</head><body><div id="root">${html}</div><div>That is part of the original html!</div><script src="/assets/js/bundle.js"></script></body></html>`;

const serveRoot = (request, response) => {
  const reactElement = ReactDomServer.renderToString(<ReactRoot />);

  const helmet = Helmet.renderStatic();

  const template = createTemplate(helmet, reactElement);

  response.send(template);
};

const app = express();

app.use(express.static('public'));

app.get('/', serveRoot);

app.listen(3000, () => console.log('App started!'));

import express from 'express';

import createHtml from './server';

const app = express();

app.use(express.static('public'));

app.get('*', (request, response) => response.send(createHtml(request.path)));

app.listen(3000, () => console.log('App started!'));

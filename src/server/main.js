import api from './api';
import config from './config';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';
import twitterRestService from './twitter/twitterRestService'

const app = express();

app.use('/api/v1', api);
app.use(twitterRestService);
app.use(frontend);
app.use(errorHandler);

const {port} = config;

app.listen(port, () => {
  console.log('Server started at port %d', port);
});

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

import getConfig from './conf';
import createModels from './models';
import packageJSON from '../package.json';

dotenv.config({
  path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV || 'development'}`)
});
const config = getConfig();
const models = createModels(config);

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.json({ service: packageJSON.name, version: packageJSON.version });
});

// Your first API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

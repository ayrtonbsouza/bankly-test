import express from 'express';

import { runConsumer } from '../kafka';

import '@/container';

const app = express();

app.listen(3000, () => {
  console.log(
    `\x1b[35m 🚀 Server started and listening in:\x1b[36m http://localhost:3000/`
  );
  runConsumer();
});

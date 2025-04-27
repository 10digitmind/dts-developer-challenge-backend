// src/index.ts
const express = require('express');
const taskRoutes = require('../src/controller/Routes/Groute');
const cors = require('cors')



const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(taskRoutes);




app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports= app
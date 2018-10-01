const express = require('express');
const app = express();


//for test query
// const ClickHouse = require('@apla/clickhouse');
// const options = {
//   host: '0.0.0.0',
//   port: 8123,
//   queryOptions: {
//     database: 'Users',
//   },
// };
// const ch = new ClickHouse(options);

const uniqueUsersRoutes = require('./api/routes/uniqueUsers');
const loyalUsersRoutes = require('./api/routes/loyalUsers');

app.use('/unique-users', uniqueUsersRoutes);
app.use('/loyal-users', loyalUsersRoutes);

//test query
// app.use((req, res, next) => {
//   const stream = ch.query('SELECT * FROM newsusers8 LIMIT 10');
//   const rows = [];
//   stream.on('data', row => {
//     rows.push(row);
//   });
//   stream.on('end', () => {
//     res.status(200).json(rows);
//   });
// });

app.use((req, res, next) => {
  const error = new Error(
    'This url does not return any data, please type another url, Ex: http://localhost:3000/unique-users?device=1,2&os=1',
  );
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

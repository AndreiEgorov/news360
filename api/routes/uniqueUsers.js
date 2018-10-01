const express = require('express');
const router = express.Router();
const ClickHouse = require('@apla/clickhouse');

const options = {
  host: '0.0.0.0',
  port: 8123,
  queryOptions: {
    database: 'Users',
  },
};
const ch = new ClickHouse(options);

router.get('/', (req, res, next) => {
  const device =
    req.query.device === undefined
      ? [0, 1, 2, 3, 4, 5]
      : req.query.device.split(',');
  const os =
    req.query.os === undefined
      ? [0, 1, 2, 3, 4, 5, 6]
      : req.query.os.split(',');

  const stream = ch.query(
    `SELECT COUNT (DISTINCT User) FROM newsusers8 WHERE Os IN (${os}) AND Device IN (${device})`,
  );

  const rows = [];
  stream.on('data', row => {
    rows.push(row);
  });
  stream.on('end', () => {
    res.status(200).json(rows);
  });
});

module.exports = router;

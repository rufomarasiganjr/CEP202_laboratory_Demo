var express = require('express');

var router = express.Router();

var dbConn = require('../../config/db.js');

// Routes HERE

// INSERT
// @routes POST temperature/add
// @desc INSERT data to the databse
// @access PRIVATE
router.post('/add', (req, res) => {
  //print body for checking
  console.log(req.body);
  var temperature = req.body.temperature;
  var deviceId = req.body.deviceId;
  var readingDate = req.body.date;

  sqlQuery = `INSERT INTO temp_tb(temperature,device_id,date) VALUES(${temperature},"${deviceId}","${readingDate}")`;

  dbConn.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
});

// VIEW
// @routes GET temperature/view
// @desc View Data
// @access PUBLIC
router.get('/view', (req, res) => {
  sqlQuery = `SELECT * FROM temp_tb`;
  dbConn.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
});

// UPDATE

// DELETE
// @routes DELETE temperature/delete/:id
// @desc DELETE Data
// @access PRIVATE
router.delete('/delete/:id', (req, res) => {
  //print body for checking
  console.log(req.params.id);
  var readingId = req.params.id;
  sqlQuery = `DELETE FROM temp_tb WHERE id=${readingId}`;
  dbConn.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({
      msg: 'Data Successfully Deleted',
      results: results,
    });
  });
  // working task by group
  //1. UPDATE Route
  //2. SEARCH record by ID
  //3. SEARCH record by deviceID using LIKE function
});

module.exports = router;

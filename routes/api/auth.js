var express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();

var dbConn = require('../../config/db.js');

// @routes POST auth/signup
// @desc INSERT new ACCOUNT to the database
// @access PRIVATE
router.post('/signup', (req, res, next) => {
  var uname = req.body.uname;
  var email = req.body.email;
  var password = req.body.password;

  try {
    sqlQuery = `INSERT INTO account_credentials(uname,email,password) VALUES("${uname}","${email}","${password}")`;

    dbConn.query(sqlQuery, function (error, results, fields) {
      if (error) throw error;
      let token;
      try {
        //Creating jwt token
        token = jwt.sign(
          { userId: results.id, email: results.email },
          process.env.TOKEN_SECRET,
          {
            expiresIn: '1h',
          }
        );
      } catch (err) {
        console.log(err);
        return next(error);
      }

      res.status(200).json({
        success: true,
        data: {
          userId: uname,
          email: email,
          token: token,
        },
      });
    });
  } catch (error) {
    return next(error);
  }
});

// @routes POST auth/login
// @desc LOGIN user
// @access PRIVATE
router.post('/login', (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  try {
    sqlQuery = `SELECT * FROM account_credentials WHERE email= "${email}" and password="${password}"`;
    dbConn.query(sqlQuery, function (error, results, fields) {
      if (error) throw error;
      console.log(results.length > 0);
      if (results.length > 0) {
        let token;
        try {
          //Creating jwt token
          token = jwt.sign(
            { userId: results.id, email: results.email },
            process.env.TOKEN_SECRET,
            { expiresIn: '1h' }
          );
        } catch (err) {
          console.log(err);
          const error = new Error('Error! Something went wrong.');
          return next(error);
        }

        res.status(200).json({
          success: true,
          data: {
            email: results.email,
            token: token,
          },
        });
      } else {
        res.status(200).json({
          success: false,
          data: {
            msg: 'Invalid Username/Password',
          },
        });
      }
    });
  } catch {
    const error = new Error('Error! Something went wrong.');
    return next(error);
  }
});

router.get('/acc', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  //Authorization: 'Bearer TOKEN'
  if (!token) {
    res
      .status(200)
      .json({ success: false, message: 'Error! Token was not provided.' });
  }
  //Decoding the token
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  res.status(200).json({
    success: true,
  });
});

module.exports = router;

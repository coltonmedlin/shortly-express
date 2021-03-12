const models = require('../models');
const Promise = require('bluebird');

/*
 * access the parsed cookie
 * lookup user data
 * assign an object to the SESSION property with relivant info (should have hash)
 *
 * ------------------
 *
 * A request with no cookies should should generate a session and
 * store it in the database it should also set a cookie in the response header
 * cookie set with 'shortlyid' set to hash
 *
 * If there is a cookie it should be verified
 *
*/

const generateSession = (req, res) => {
  return new Promise( (resolve, reject) => {

    models.Sessions.create()
      .then((response) => {
        return models.Sessions.get({id: response.insertId});
      })
      .then((session) => {
        //set a cookie
        res.cookie('shortlyid', session.hash);
        //set a session object
        req.session = {
          hash: session.hash
        };
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};


module.exports.createSession = (req, res, next) => {
  //if no cookie VVV
  if (!req.cookies) {
    generateSession(req, res)
      .then(() => {
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    //get the cookie
    let hash = req.cookies.shortlyid;
    //check if it exists in the data base
    models.Sessions.get({hash})

    //if it does not exist, delete the cookie on the page and create a new session
      .then((response) => {
        if (!response) {
          return generateSession(req, res);
          //if it does, then create a session object and move on
        } else {
          req.session = { hash };
          return;
        }
      })
      .then(() => {
        next();
      })
      .catch((err) => {
        next(err);
      });
  }


};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/


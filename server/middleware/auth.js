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

module.exports.createSession = (req, res, next) => {

  models.Sessions.create()
    .then((response) => {
      console.log('response: ', response);
      return models.Sessions.get({id: response.insertId})
        .then((session) => {
          console.log('session :' + session.hash);
          req.cookies.shortlyid = session.hash;
          next();
        })
        .catch((err) => {
          next();
        });
    })
    .catch(() => {
      next();
    });

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/


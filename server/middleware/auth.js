const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // let sessionObject = {};
  // //grab the cookie object from the body
  // let hash = req.cookie.shorltyid;
  // //look up user data related to that session
  // models.Sessions.getAll({hash})
  //   .then((userSession)=>{
  //     if (userSession === undefined) {

  //     }
  //   });
  models.Sessions.create()
    .then((response) => {
      console.log('response: ', response);
      return models.Sessions.get({id: response.insertId})
        .then((session) => {
          console.log('session :' + session.hash);
          req.cookies.shortlyid = session.hash;
          next();
          done();
        })
        .catch((err) => {
          next();
        });
    })
    .catch(() => {
      next();
    });

  //assign to session property on the request
  //req.session = sessionObject;

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/


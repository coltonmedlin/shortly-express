const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    let cookie = req.headers.cookie;
    cookie = cookie.split('; ');

    for (let i = 0; i < cookie.length; i++) {
      cookie[i] = cookie[i].split('=');
    }

    let cookieObj = {};

    for (let j = 0; j < cookie.length; j++) {
      cookieObj[cookie[j][0]] = cookie[j][1];
    }
    req.cookies = cookieObj;
  }
  next();
};

module.exports = parseCookies;
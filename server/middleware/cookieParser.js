const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    let cookieObj = {};
    let cookieString = req.headers.cookie;

    let key = '';
    let value = '';
    let isKey = true;
    for (let i = 0; i < cookieString.length; i++) {
      if (cookieString[i] === ' ') {
        continue;
      }
      if (cookieString[i] === '=') {
        isKey = false;
        i++;
      }
      if (isKey) {
        key += cookieString[i];
      }
      if (!isKey && cookieString[i] !== ';') {
        value += cookieString[i];
      }
      if (cookieString[i] === ';' || i === cookieString.length - 1) {
        isKey = true;
        cookieObj[key] = value;
        key = '';
        value = '';
        i + 2;
      }
    }
    req.cookies = cookieObj;
  }
  next();
};

module.exports = parseCookies;
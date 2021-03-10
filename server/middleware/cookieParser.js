const parseCookies = (req, res, next) => {
  let cookieObj = {};
  //THIS MAY BE WRONG VVV
  let cookieString = req.headers.cookie;
  console.log('string', cookieString);
  //take the cookie text
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
    if (cookieString[i] === ';' || i === cookieString.length - 1) {
      isKey = true;
      cookieObj[key] = value;
      key = '';
      value = '';
      i + 2;
    }
    if (!isKey) {
      value += cookieString[i];
    }
  }
  console.log(cookieObj);
  //loop though and build a key until we hit an =
  //then build the value until we hit ;
  //repeat until finished
  //req.body.cookie = cookieObj;
  next();
};

module.exports = parseCookies;
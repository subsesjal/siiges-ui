import cookie from 'cookie';

function ParseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

export default ParseCookies;

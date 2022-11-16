
import escape from 'sanitizer';

const bodySanitizer = (req, res, next) => {
  if (req.body) {
    for (let propName in req.body) {
      req.body[propName] = escape(req.body[propName]);
    }
  }

  next();
};

export default bodySanitizer;
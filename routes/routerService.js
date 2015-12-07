/**
 * Created by Lanz on 2015/12/5.
 */

function restHandler(res, data, code, msg) {
  var content = data ? data : null;
  if (!data) {
    content = {};
  }

  var r = {
    content: content
  };

  if (code) {
    r.code = code;
    r.msg = msg;
    r.result = 'error';
  } else {
    r.code = 200;
    r.result = 'success';
  }

  res.json(r);
};

module.exports.restHandler = restHandler;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show = exports.create = undefined;

let create = exports.create = (() => {
  var ref = _asyncToGenerator(function* (ctx) {
    let ticket = new _Ticket2.default(ctx.request.body);
    ticket.sessionId = ctx.sessionId;
    ticket.user = ctx.user;
    yield ticket.save();
    ctx.body = {
      id: ticket.id
    };
  });

  return function create(_x) {
    return ref.apply(this, arguments);
  };
})();

let show = exports.show = (() => {
  var ref = _asyncToGenerator(function* (ctx) {
    let id = ctx.params.id;
    let ticket = yield _Ticket2.default.findById(id);

    ctx.body = {
      error: 'Not found'
    };

    if (!ticket || !ticket.verify(ctx)) {
      return;
    }

    ctx.body = ticket.data();
  });

  return function show(_x2) {
    return ref.apply(this, arguments);
  };
})();

var _Ticket = require('../models/Ticket');

var _Ticket2 = _interopRequireDefault(_Ticket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @date 2016-04-03
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alaska = require('alaska');

var _alaska2 = _interopRequireDefault(_alaska);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @date 2016-04-03
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

/**
 * @class TicketService
 */
class TicketService extends _alaska2.default.Service {
  constructor(options, alaska) {
    options = options || {};
    options.id = 'alaska-ticket';
    options.dir = __dirname;
    super(options, alaska);
  }

  postLoadModels() {
    const Ticket = this.model('Ticket');
    this.alaska.main.post('loadAppMiddlewares', function () {
      this.alaska.app.use((() => {
        var ref = _asyncToGenerator(function* (ctx, next) {
          if (ctx.method === 'POST' && ctx.request.body._ticket) {
            let ticket = yield Ticket.findById(ctx.request.body._ticket);
            if (ticket && ticket.verify(ctx)) {
              if (ticket.state) {
                //已经执行完成
                ctx.body = ticket.result;
                return;
              }
              //未执行
              yield next();
              ticket.result = ctx.body;
              ticket.state = true;
              yield ticket.save();
              return;
            }
          }

          //没有ticket或ticket验证失败,直接执行
          yield next();
        });

        return function (_x, _x2) {
          return ref.apply(this, arguments);
        };
      })());
    });
  }
}
exports.default = TicketService;
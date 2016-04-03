/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-03
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

/**
 * @class TicketService
 */
export default class TicketService extends alaska.Service {
  constructor(options, alaska) {
    options = options || {};
    options.id = 'alaska-ticket';
    options.dir = __dirname;
    super(options, alaska);
  }

  postLoadModels() {
    const Ticket = this.model('Ticket');
    this.alaska.main.post('loadAppMiddlewares', function () {
      this.alaska.app.use(async function (ctx, next) {
        if (ctx.method === 'POST' && ctx.request.body._ticket) {
          let ticket = await Ticket.findById(ctx.request.body._ticket);
          if (ticket && ticket.verify(ctx)) {
            if (ticket.state) {
              //已经执行完成
              ctx.body = ticket.result;
              return;
            }
            //未执行
            await next();
            ticket.result = ctx.body;
            ticket.state = true;
            await ticket.save();
            return;
          }
        }

        //没有ticket或ticket验证失败,直接执行
        await next();
      });
    });
  }
}

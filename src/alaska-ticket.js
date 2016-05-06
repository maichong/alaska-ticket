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
    options.dir = options.dir || __dirname;
    options.id = options.id || 'alaska-ticket';
    super(options, alaska);
  }

  postLoadModels() {
    const Ticket = this.model('Ticket');
    const alaska = this.alaska;
    alaska.post('loadMiddlewares', function () {
      alaska.app.use(async function (ctx, next) {
        if (ctx.method === 'POST') {
          let body = ctx.state.body || ctx.request.body;
          let ticketId = body._ticket || ctx.request.body._ticket;
          if (ticketId) {
            let ticket = await Ticket.findById(ticketId);
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
        }
        //没有ticket或ticket验证失败,直接执行
        await next();
      });
    });
  }
}

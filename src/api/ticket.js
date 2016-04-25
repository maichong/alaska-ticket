/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-03
 * @author Liang <liang@maichong.it>
 */

import Ticket from '../models/Ticket';

export async function create(ctx) {
  let ticket = new Ticket(ctx.request.body);
  ticket.sessionId = ctx.sessionId;
  ticket.user = ctx.user;
  await ticket.save();
  ctx.body = {
    id: ticket.id
  };
}

export async function show(ctx) {
  let id = ctx.params.id;
  let ticket = await Ticket.findById(id);

  ctx.body = {
    error: 'Not found'
  };

  if (!ticket || !ticket.verify(ctx)) return;

  ctx.body = ticket.data();
}

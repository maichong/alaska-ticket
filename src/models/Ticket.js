/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-03
 * @author Liang <liang@maichong.it>
 */

export default class Ticket extends service.Model {
  static label = 'Ticket';
  static defaultSort = '-createdAt';
  static defaultColumns = 'title,userId,sessionId,state,createdAt';
  static noedit = true;
  static nocreate = true;
  static api = {
    show: 1,
    create: 1
  };
  static fields = {
    title: {
      label: 'Title',
      type: String,
      private: true
    },
    userId: {
      label: 'User ID',
      type: String,
      private: true
    },
    sessionId: {
      label: 'Session ID',
      type: String,
      private: true
    },
    state: {
      label: 'State',
      type: 'select',
      default: false,
      boolean: true,
      options: [{
        label: 'Pending',
        value: false
      }, {
        label: 'Done',
        value: true
      }]
    },
    result: {
      label: 'Result',
      type: Object,
      default: null
    },
    createdAt: {
      label: 'Created At',
      type: Date,
      private: true
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }

  /**
   * 验证是否有权访问ticket
   * @param {Context} ctx
   * @returns {boolean}
   */
  verify(ctx) {
    if (this.userId && (!ctx.user || ctx.user.id !== this.userId)) {
      return false;
    }
    if (!this.userId && this.sessionId && ctx.sessionId !== this.sessionId) {
      return false;
    }
    return true;
  }
}
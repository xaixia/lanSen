export class AppLocales {

  public get ja(): any {
    return this._ja;
  }

  private _ja = {
    COMMON: {
      MENU: {
        index: '首页',
        staff: '系统用户管理',
        user: '前端用户管理',

        system: '系统管理',
        log: '日志管理',
        query: '查询模块',
        business: '业务管理',
        news: '新闻公告广告',
        finance: '财务管理',
        card: '卡券管理',
        message: '消息信息管理',
        level: '评价等级管理',
      }
    },

    systemUserList: {
      title: '用户管理'
    },

    roleList: {
      title: '角色管理'
    },

    authorityList: {
      title: '权限管理'
    },

    employeList: {
      title: '雇工管理'
    },

    ordinaryUserList: {
      title: '普通用户管理'
    },

    billingList: {
      title: '业务管理'
    },

    orderList: {
      title: '工单管理'
    },

    orderEdit: {
      title: '工单详情'
    },

    systemRegisterLog: {
      title: '登录日志'
    },

    systemOperationLog: {
      title: '登录日志'
    },
  };
}

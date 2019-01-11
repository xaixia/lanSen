export class AppLocales {

  public get ja(): any {
    return this._ja;
  }

  private _ja = {
    COMMON: {
      MENU: {
        index: '首页',
        user: '用户管理',

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
      title: '系统用户管理'
    },

    ordinaryUserList: {
      title: '普通用户管理'
    },

    roleList: {
      title: '角色管理'
    },

    authorityList: {
      title: '权限管理'
    },

  };
}

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
        content: '内容管理',
        system: '系统管理',
        business: '业务管理',
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

    employeEdit: {
      title: '雇工详情'
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

    newsList: {
      title: '新闻列表'
    },

    newsEdit: {
      title: '新闻编辑'
    }
  };
}

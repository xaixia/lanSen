
const Messages: Object = {
  E0001: '此项为必填项',
  E0002: '请输入长度在{0}位数以内。',
  E0003: '请输入长度在{0}位数以上',
  E0004: '{0}的格式有误，请重新输入！',
  E0005: '请输入{0}',
  E0006: '请选择{0}',
  E0007: '{0}失败',
  E0008: '您的登录信息已失效，请重新登录',
  E0009: '出错啦！',
  E0010: '账号已禁用，请联系管理员'
};

class MessageUtil {
  public getMessage(messageId: string, params: string[]): string {
    let message: string = Messages[messageId] || messageId;
    params.forEach((param: string, index: number) => {
      message = message.replace(`{${index}}`, param);
    });
    return message;
  }

}

export const MESSAGE_UTIL: MessageUtil = new MessageUtil();

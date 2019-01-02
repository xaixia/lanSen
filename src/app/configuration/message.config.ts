
const Messages: Object = {
  E0001: '入力してください。',
  E0002: '{0}桁以内で入力してください。',
  E0003: '{0}桁以上で入力してください。',
  E0004: '{0}の入力形式が間違っています。',
  E0005: '{0}が入力してください。',
  E1001: '{0}の明細を選択してください。',
  E1008: '入力した{0}が存在しません。',
  E9001: 'パスワードが正しくありません。',
  E9002: '該当するユーザコードが存在していません。',
  E9003: 'パスワードの設定が失敗しました。',
  E9004: '添付ファイルのサイズが最大値 1GB を超えています。',
  E9005: 'ログイン処理が失敗しました。',
  E9996: 'クライアントエラーが発生しました。\n機能向上のため、ログ詳細をサーバーへ送信しますが、よろしいでしょうか。',
  E9998: 'セッションタイムアウトしました。お手数ですが、再度ログインしてください。',
  E9999: 'システムエラーが発生しました。',
  I0001: '保存が完了しました。',
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

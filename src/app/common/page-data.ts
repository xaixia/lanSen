import { StorageService } from 'ngx-webstorage-service';

export class PageData {
  // ローカルデータ
  private data: Map<string, any> = new Map<string, any>();

  // セッションストレージキー
  private storageKey: string;

  // セッションストレージサービス
  private storage: StorageService;

  // 初期化
  constructor(storageKey: string, storage: StorageService) {
    this.storageKey = storageKey;
    this.storage = storage;

    if (this.storage.get(this.storageKey)) {
      this.data = new Map<string, any>(this.storage.get(this.storageKey)) || new Map<string, any>();
      this.storage.remove(this.storageKey);
    }
  }

  // データを取得
  get(key: string): any {
    return this.data.get(key);
  }

  // データを設定
  set(key: string, val: any) {
    this.data.set(key, val);
  }

  // データを削除
  remove(key: string) {
    this.data.delete(key);
  }

  // データをクリア
  clear() {
    this.data.clear();
  }

  // セッションストレージに保持
  saveToSessionStorage() {
    this.storage.set(this.storageKey, Array.from(this.data));
  }
}

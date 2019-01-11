import { StorageService } from 'ngx-webstorage-service';

export class PageData {
  // 本地数据
  private data: Map<string, any> = new Map<string, any>();

  // session
  private storageKey: string;

  // 存储
  private storage: StorageService;

  // 初始化
  constructor(storageKey: string, storage: StorageService) {
    this.storageKey = storageKey;
    this.storage = storage;

    if (this.storage.get(this.storageKey)) {
      this.data = new Map<string, any>(this.storage.get(this.storageKey)) || new Map<string, any>();
      this.storage.remove(this.storageKey);
    }
  }

  // 取得data
  get(key: string): any {
    return this.data.get(key);
  }

  // 设置data
  set(key: string, val: any) {
    this.data.set(key, val);
  }

  // 删除data
  remove(key: string) {
    this.data.delete(key);
  }

  // 清除data
  clear() {
    this.data.clear();
  }

  // session的存储
  saveToSessionStorage() {
    this.storage.set(this.storageKey, Array.from(this.data));
  }
}

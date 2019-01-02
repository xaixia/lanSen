import { StorageService } from 'ngx-webstorage-service';

export class PageData {
  // 本地数据
  private data: Map<string, any> = new Map<string, any>();

  // 缓存  key
  private storageKey: string;

  // 缓存
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

  // 取得数据
  get(key: string): any {
    return this.data.get(key);
  }

  set(key: string, val: any) {
    this.data.set(key, val);
  }

  remove(key: string) {
    this.data.delete(key);
  }

  clear() {
    this.data.clear();
  }

  saveToSessionStorage() {
    this.storage.set(this.storageKey, Array.from(this.data));
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setData(key: string, data: any): void {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    } catch (e) {
      console.error(e);
    }
  }

  getData<T>(key: string): T {
    try {
      return JSON.parse(<string>localStorage.getItem(key));
    } catch (e) {
      console.error(e);
      return '' as unknown as T;
    }
  }

  removeData(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }

  clearAllData(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
  }
}

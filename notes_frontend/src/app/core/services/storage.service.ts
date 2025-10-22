import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private get storage(): any | null {
    try {
      if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
        return (globalThis as any).localStorage as any;
      }
    } catch {
      // ignore access issues
    }
    return null;
  }

  // PUBLIC_INTERFACE
  /** Safely get parsed JSON from localStorage by key. */
  get<T>(key: string, fallback: T): T {
    const ls: any = this.storage;
    if (!ls) return fallback;
    try {
      const raw = ls.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  // PUBLIC_INTERFACE
  /** Safely set JSON value into localStorage by key. */
  set<T>(key: string, value: T): void {
    const ls: any = this.storage;
    if (!ls) return;
    try {
      ls.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors (quota/security)
    }
  }
}

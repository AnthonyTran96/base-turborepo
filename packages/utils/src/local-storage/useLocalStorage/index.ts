'use client';

import { useEffect, useState } from 'react';
import { localStore } from '..';
type Setter<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    return localStore.get<T>(key, defaultValue) as T;
  });

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea === window.localStorage && e.key === key) {
        try {
          setValue(e.newValue != null ? (JSON.parse(e.newValue) as T) : defaultValue);
        } catch {
          setValue(defaultValue);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  const set: Setter<T> = (next) => {
    setValue((prev) => {
      const nextValue = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
      localStore.set<T>(key, nextValue);
      return nextValue;
    });
  };

  return [value, set] as const;
}

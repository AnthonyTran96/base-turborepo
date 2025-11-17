/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_cache } from 'next/cache';
import { cache as reactCache } from 'react';

/**
 * A stable stringify implementation for building deterministic cache keys.
 * - Sorts object keys alphabetically to ensure consistent ordering.
 * - Supports primitives, Date, Array, Object, null, undefined.
 * - Does not support circular references (can be extended if needed).
 */
function stableStringify(value: any): string {
  const type = typeof value;

  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (type === 'number' || type === 'boolean') return String(value);
  if (type === 'string') return JSON.stringify(value); // add quotes and escape
  if (value instanceof Date) return `Date:${value.toISOString()}`;
  if (Array.isArray(value)) {
    return `[${value.map((v) => stableStringify(v)).join(',')}]`;
  }
  if (type === 'object') {
    const keys = Object.keys(value).sort();
    const parts = keys.map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`);
    return `{${parts.join(',')}}`;
  }
  // function, symbol, bigint, etc.
  return String(value);
}

export type CreateCacheOptions<TParams extends any[]> = {
  /**
   * Optional: return a list of cache tags based on parameters.
   * - If not provided, defaults to `[baseKey]`.
   */
  tags?: (params: TParams) => string[];
  /**
   * How long to revalidate cache (in seconds).
   * - Set to `false` to disable revalidation.
   */
  revalidate?: number | false;
};

/**
 * ServerCacheService
 * - Wraps unstable_cache with in-flight request deduplication.
 * - Supports caching both parameterized and non-parameterized async functions.
 * - Each instance has its own in-flight map (isolated memory).
 */
export class ServerCacheService {
  /** In-flight request map (cacheKey => Promise) */
  private inFlight = new Map<string, Promise<any>>();

  /**
   * Builds a unique cache key from baseKey + params using stable stringify.
   */
  private buildCacheKey(baseKey: string, params?: any[]): string {
    if (!params || params.length === 0) return baseKey;
    const parts = params.map((p) => stableStringify(p));
    return `${baseKey}:${parts.join(':')}`;
  }

  /**
   * Creates a cached function for any async operation (with or without params).
   *
   * Example:
   * const getPosts = cacheService.createCache('posts', async () => {...}, { tags: () => ['posts'] })
   * const getPostById = cacheService.createCache('post', async (id) => {...}, { tags: ([id]) => [`posts:${id}`] })
   *
   * Returns: async (...params) => TResult
   */
  public createCache<TParams extends any[] = [], TResult = any>(
    baseKey: string,
    fn: (...params: TParams) => Promise<TResult>,
    options?: CreateCacheOptions<TParams>
  ) {
    return async (...params: TParams): Promise<TResult> => {
      const cacheKey = this.buildCacheKey(baseKey, params);

      // 1) Return existing in-flight promise if available (dedupe concurrent requests)
      if (this.inFlight.has(cacheKey)) {
        return this.inFlight.get(cacheKey) as Promise<TResult>;
      }

      // 2) Create an unstable_cache wrapper for this specific cacheKey
      const cachedFn = unstable_cache(
        async (...args: TParams) => {
          return await fn(...args);
        },
        [cacheKey],
        {
          tags: options?.tags ? options.tags(params as TParams) : [baseKey],
          revalidate: options?.revalidate
        }
      );

      // 3) Execute cachedFn and store the promise in the in-flight map
      const p = (async () => {
        try {
          const res = await cachedFn(...params);
          return res;
        } finally {
          // Always remove entry after completion (success or error)
          this.inFlight.delete(cacheKey);
        }
      })();

      this.inFlight.set(cacheKey, p);
      return p;
    };
  }

  /**
   * Creates a deduped function using React.cache for in-process memoization.
   * This avoids duplicate calls within the same render or request.
   *
   * Example:
   * const getPosts = cacheService.createDedupe(async () => {...})
   * const getUserById = cacheService.createDedupe(async (id) => {...})
   *
   * Notes:
   * - React.cache provides dedupe-only behavior (no revalidate, no tags).
   * - Useful for preventing repeated calls in Server Components without using Next.js Data Cache.
   *
   * Returns: async (...params) => TResult
   */
  public createDedupe<TParams extends any[], TResult>(
    fn: (...args: TParams) => Promise<TResult>
  ): (...args: TParams) => Promise<TResult> {
    // wrap with react.cache once
    return reactCache(async (...args: TParams) => fn(...args));
  }

  /**
   * Clears a specific in-flight entry for given key + params.
   * Useful if you need to abort or force cleanup.
   */
  public clearInFlightForKey(baseKey: string, params?: any[]) {
    const cacheKey = this.buildCacheKey(baseKey, params);
    this.inFlight.delete(cacheKey);
  }

  /**
   * Clears all in-flight promises for this cache instance.
   */
  public clearAllInFlight() {
    this.inFlight.clear();
  }

  /**
   * Helper utility for building cache tags, e.g. buildEntityTag('posts', 123) => 'posts:123'
   */
  public static buildEntityTag(prefix: string, id?: string | number) {
    return id === undefined ? prefix : `${prefix}:${id}`;
  }
}

export default ServerCacheService;

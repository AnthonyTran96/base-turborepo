import ServerCacheService from '@repo/utils/cache';

const cacheService = new ServerCacheService();

export const createCache = cacheService.createCache.bind(cacheService);

export const clearAllInFlight = cacheService.clearAllInFlight.bind(cacheService);

export const clearInFlightForKey = cacheService.clearInFlightForKey.bind(cacheService);

export const buildEntityTag = ServerCacheService.buildEntityTag;

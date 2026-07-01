interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

export function rateLimitByIp(
  identifier: string,
  maxRequests: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(identifier);

  if (!existing || now > existing.resetAt) {
    const entry: RateLimitEntry = { count: 1, resetAt: now + windowMs };
    store.set(identifier, entry);
    return { allowed: true, limit: maxRequests, remaining: maxRequests - 1, resetAt: entry.resetAt };
  }

  existing.count += 1;
  const remaining = Math.max(0, maxRequests - existing.count);
  return {
    allowed: existing.count <= maxRequests,
    limit: maxRequests,
    remaining,
    resetAt: existing.resetAt,
  };
}

// Periodically clean up expired entries to avoid unbounded growth.
setInterval(() => {
  const now = Date.now();
  Array.from(store.keys()).forEach((key) => {
    const entry = store.get(key);
    if (entry && now > entry.resetAt) {
      store.delete(key);
    }
  });
}, 60_000);

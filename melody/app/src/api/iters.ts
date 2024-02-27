export const unique = <T extends unknown>(items: Iterable<T>) => [...new Set(items)];

import { useLocalStorage, useEventListener } from 'usehooks-ts';
import { useSWRConfig } from 'swr';
import { useEffect } from 'react';
//
export const useSWRCache = () => {
	const [swrCache, setSWRCache] = useLocalStorage('swrcache', '{}');
	const parsedSWRCache = JSON.parse(swrCache) as object;
	const { cache, mutate } = useSWRConfig();

	useEffect(() => {
		Object.entries(parsedSWRCache).forEach(([key, value]) => {
			if (!value) return;
			console.log('persistent cached', [key, value]);
			cache.set(key, value);
		});

		// @ts-ignore
		for (const key of cache.keys()) {
			mutate(key);
		}
	}, []);

	useEventListener('beforeunload', () => {
		const newCache: any = {};

		// // @ts-ignore
		// for (const key of cache.keys()) {
		// 	newCache[key] = cache.get(key);
		// }

		// console.log(JSON.stringify(newCache));
		setSWRCache(JSON.stringify(newCache));
	});
};

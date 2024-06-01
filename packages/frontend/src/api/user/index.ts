import $api from '@/api';
import { buildQueryString } from '@/utils';
import type { IUser } from '@/types';

export const getUser = (email: string, signal: AbortSignal, number?: string) => {
	const params = buildQueryString({ email, number });

	return $api.get<IUser>(`/user?${params}`, { signal });
};
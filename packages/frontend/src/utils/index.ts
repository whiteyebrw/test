export const buildQueryString = (params: Record<string, any>): string => {
	return Object.keys(params)
		.filter(k => params[k] !== null && params[k] !== undefined && params[k] !== '')
		.map(k => k + '=' + params[k])
		.join('&');
};
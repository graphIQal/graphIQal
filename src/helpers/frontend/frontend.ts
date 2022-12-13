const random = () => {
	return Math.random();
};

export const createId = (id: string) => {
	return id + ' ' + random();
};

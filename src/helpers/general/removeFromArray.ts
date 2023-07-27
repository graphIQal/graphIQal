export const removeFromArray = (
	array: any[],
	value: any,
	comparisonFunction?: (value: any) => boolean
) => {
	let index = array.indexOf(value);

	if (comparisonFunction) {
		index = array.findIndex(comparisonFunction);
	}

	// console.log('array');
	// console.log(index, array);

	if (index > -1) {
		// only splice array when item is found
		array.splice(index, 1); // 2nd parameter means remove one item only
	}

	// console.log(index, array);

	return array;
};

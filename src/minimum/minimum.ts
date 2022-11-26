export function minimum(array: number[]): number {
	let min: number = array[0];

	for (const a of array) {
		if (a < min) min = a;
	}

	return min;
}

/**
 * Returns the minimum value of an array
 * @param array
 */
export function minimum<T>(array: T[]): T {
	let min: T = array[0];

	for (const a of array) {
		if (a < min) min = a;
	}

	return min;
}

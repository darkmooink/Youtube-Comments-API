export function zipArrays<T, U>(array1: T[], array2: U[]): [T, U][] {
    return array1.map((item, index) => [item, array2[index]]);
}

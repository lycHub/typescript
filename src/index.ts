interface Lengthwise {
  length: number;
}

function getArr<T extends Lengthwise>(value: T, times: number = 5): T[] {
  return new Array(times).fill(value);
}

console.log(getArr('str'));
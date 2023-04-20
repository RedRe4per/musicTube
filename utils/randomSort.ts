import { shuffle } from "./shuffle";

export function randomSort<T>(array: T[]): T[] {
  if (array.length <= 1) {
    return array;
  }

  const firstElement = array[0];
  const restElements = array.slice(1);
  const shuffledRestElements = shuffle(restElements);

  return [firstElement, ...shuffledRestElements];
}

export default function hasValuesFromArray(set, array) {
  for (const elem of array) {
    if (set.has(elem) === false) {
      return false;
    }
  }
  return true;
}

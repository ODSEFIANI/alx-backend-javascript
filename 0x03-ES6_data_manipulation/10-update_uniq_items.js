export default function updateUniqueItems(dictionary) {
    if (!(dictionary instanceof Map)) {
      throw Error('Cannot process');
    }
    for (const [key, value] of dictionary) {
      if (value === 1) {
        dictionary.set(key, 100);
      }
    }
    return dictionary;
}

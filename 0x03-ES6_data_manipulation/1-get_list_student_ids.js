export default function getListStudentIds(list) {
    const array = [];
    if (list instanceof Array) {
      list.map((value) => array.push(value.id));
    }
    return array;
  }

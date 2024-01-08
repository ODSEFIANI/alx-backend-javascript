export default function getStudentsByLocation(list, city) {
  return list.filter((value) => value.location === city);
}

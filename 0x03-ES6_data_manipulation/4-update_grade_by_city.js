export default function updateStudentGradeByCity(list, city, newGrades) {
    return list.map((student) => {
      const gradeList = newGrades.filter((grade) => grade.studentId === student.id);

      if (gradeList.length === 0) {
        student.grade = 'N/A';
      } else {
        student.grade = gradeList[0].grade;
      }

      return student;
    }).filter((value) => value.location === city);
  }

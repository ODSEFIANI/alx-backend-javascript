// main.ts 
// ODSEFIANI

interface Teacher {
  firstName: string; 
  lastName: string;
  fullTimeEmployee: boolean; 
  yearsOfExperience?: number;
  location: string;
  [key: string]: any;
}

function createTeacher({
  firstName,
  lastName,
  fullTimeEmployee,
  yearsOfExperience,
  location,
  ...additionalAttributes
}: {
  firstName: string;
  lastName: string;
  fullTimeEmployee: boolean;
  yearsOfExperience?: number;
  location: string;
  [key: string]: any;
}): Teacher {
  return {
    firstName,
    lastName,
    fullTimeEmployee,
    yearsOfExperience,
    location,
    ...additionalAttributes,
  };
}
interface Directors extends Teacher {
  numberOfReports: number;
}
interface PrintTeacherFunction {
  (firstName: string, lastName: string): string;
}

const printTeacher: PrintTeacherFunction = (firstName, lastName) => {
  const initial = firstName.charAt(0).toUpperCase();
  const fullLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  return `${initial}. ${fullLastName}`;
};
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
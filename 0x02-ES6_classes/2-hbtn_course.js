 /* ODSEFIANI*/
export default class HolbertonCourse {
    constructor(name, length, students) {

      if (typeof length !== 'number') {
        throw new TypeError('Wrong dataType');
      } else {
        this._length = length;
      }
      if (!Array.isArray(students)) {
        throw new TypeError('Wrong dataType');
      } else {
        this._students = students;
      }
      if (typeof name !== 'string') {
        throw new TypeError('Wrong dataType');
      } else {
        this._name = name;
      }
    }
  
    get name() {
      return this._name;
    }
  
    set name(nom) {
      if (typeof nom !== 'string') {
        throw new TypeError('wrong DataFormat');
      }
      this._name = nom;
    }
  
    get students() {
      return this._students;
    }
  
    set students(etu) {
      if (!Array.isArray(etu)) {
        throw new TypeError('wrong DataFormat');
      }
      this._students = etu;
    }

    get length() {
        return this._length;
      }
    
      set length(size) {
        if (typeof size !== 'number') {
          throw new TypeError('wrong DataFormat');
        }
        this._length = size;
      }
  }

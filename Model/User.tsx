
export class User {
  classID:string;
  fName:string;
  lName:string;
  DOB:string;
  className:string;
  score:string;
  grade:string;

  constructor(classID:string, fName:string, lName:string, DOB:string, className:string, score:string, grade:string) {
    this.classID = classID;
    this.fName = fName;
    this.lName = lName;
    this.DOB = DOB;
    this.className = className;
    this.score = score;
    this.grade = grade;
  }

  missingParameters() {
    return !(this.classID && this.fName && this.lName  && this.DOB  && this.className  && this.score  && this.grade );
  }
}

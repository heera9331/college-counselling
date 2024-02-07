import Student from "../models/Student.js";

export default async function hasStudent(student) {
  let mobile = student.mobile;
  let name = student.name;

  console.log("checking existance");
  let tmp = await Student.find({
    $and: [{ name: name }, { mobile: mobile }],
  });
  if (tmp.length !== 0) {
    console.log("found result", tmp);
    return true;
  }
  console.log("not found");
  return false;
}

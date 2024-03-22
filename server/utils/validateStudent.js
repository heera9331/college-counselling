const validateStudent = (student) => {
  console.log("validating", student);
  if (!student) {
    return false;
  }

  if (
    !student.name ||
    !student.fatherName ||
    !student.mobile ||
    !student.villege ||
    !student.block ||
    !student.district ||
    !student.schoolName ||
    !student.caste ||
    !student.category ||
    !student.status ||
    !student.course ||
    !student.branch ||
    !student
  ) {
    console.log("validation failed");

    return false;
  }
  console.log("validated", student);
  return true;
};

export default validateStudent;

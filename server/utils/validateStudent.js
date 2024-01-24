const validateStudent = (student) => {
  console.log(student);
  if (!student) {
    return false;
  }

  if (
    !student.name ||
    !student.mobile ||
    !student.category ||
    !student.route ||
    !student.mobile.length === 10
  ) {
    return false;
  }

  return true;
};

export default validateStudent;

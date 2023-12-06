const validateStudent = (student) => {
  console.log(student);
  if (!student) {
    return false;
  }

  if (
    !student.name ||
    !student.mobile ||
    !student.category ||
    !student.route
  ) {
    return false;
  }

  return true;
};

export default validateStudent;

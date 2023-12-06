

const validateEmail = (email) => {
  if (!email) {
    return false;
  }

  // Regular expression for a valid email pattern
  const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  return emailPattern.test(email);
};

export default validateEmail;

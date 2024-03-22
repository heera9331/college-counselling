const validateUser = (user) => {
  if (!user) {
    return false;
  }

  if (!user.name || !user.email || !user.password) {
    return false;
  }

  return true;
};


export default validateUser;
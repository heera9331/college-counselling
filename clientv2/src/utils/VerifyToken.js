import api from "./api";

const verifyToken = (token) => {
  // console.log(token);
  if (token === 'null') {
    return false;
  }

  return fetch(`${api}/auth/verify-token/${token}`, {
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        return true;
      }

      response.json().then((res) => {
        localStorage.clear();
        alert(res.error.message);
        window.location.href = '/login';
        return false;
      });
    })
    .catch((err) => {
      // console.log(err.error);
      return false;
    });
};

export default verifyToken;

import api from "./api";

const verifyToken = (token) => {
  try {
    if (token === "null" || !token) {
      return false;
    }

    return fetch(`${api}/auth/verify-token/${token}`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return true;
        }

        response.json().then((res) => {
          localStorage.clear();
          alert(res.error.message);
          window.location.href = "/login";
          return false;
        });
      })
      .catch((err) => {
        // console.log(err.error);
        console.log(err);
        return false;
      });
  } catch (error) {
    console.log("token varification error", error);
  }

  return false;
};

export default verifyToken;

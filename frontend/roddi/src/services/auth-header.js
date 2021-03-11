export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('username'));

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}

export default function checkAuth() {
  return !!(
    localStorage.getItem('email') && localStorage.getItem('password')
  );
}
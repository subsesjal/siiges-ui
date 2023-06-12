export default function formLogin(name, value, user, setUser) {
  setUser({ ...user, [name]: value });
}

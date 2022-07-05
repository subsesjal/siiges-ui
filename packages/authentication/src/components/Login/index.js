import { React } from "react"
import Logo from './logo'

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      user: data.get('user'),
      password: data.get('password'),
    });
  };

  return (
    <>
      <Logo></Logo>
    </>
  )
}

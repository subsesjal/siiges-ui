import { React } from "react"
import Logo from "./logo"
import Header from './header'
import { ButtonLogin } from "@siiges-ui/shared"
import { Input } from "@siiges-ui/shared"
import { LinkButton } from "@siiges-ui/shared"

export default function SignIn() {
  return (
    <>
      <Logo />
      <Header />
      <Input label={'Usuario'} id={'user'} name={'user'} />
      <Input label={'Contraseña'} id={'password'} name={'password'}/>
      <LinkButton text={"¿Olvidaste tu contraseña?"} />
      <ButtonLogin color={'secondary'} type={'submit'} text={'Entrar'} />
    </>
  )
}

import { TextField } from "@mui/material"

export default function input(props) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={props.id}
      label={props.label}
      name={props.name}
      autoComplete={props.auto}
      autoFocus
    />
  )
}

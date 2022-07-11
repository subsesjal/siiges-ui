import { TextField } from "@mui/material"

export default function Input(input) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={input.id}
      label={input.label}
      name={input.name}
      autoComplete={input.auto}
      autoFocus
    />
  )
}

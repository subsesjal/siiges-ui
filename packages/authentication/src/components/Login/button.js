import Button from '@mui/material/Button';

export default function Button(button) {
  return (
    <Button
      type={button.type}
      fullWidth
      variant="contained"
      color={button.color}
      sx={{ mt: 3, mb: 2, textTransform: 'none' }}
    >
      <b>{button.text}</b>
    </Button>
  )
}

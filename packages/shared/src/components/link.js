import Link from '@mui/material/Link';

export default function LinkButton(link) {
  return (
    <Link href={link.href} variant="body2">
      {link.text}
    </Link>
  )
}

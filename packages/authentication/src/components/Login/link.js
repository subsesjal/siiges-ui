import Link from '@mui/material/Link';

export default function Link(link) {
  return (
    <Link href={link.href} variant="body2">
      {link.text}
    </Link>
  )
}

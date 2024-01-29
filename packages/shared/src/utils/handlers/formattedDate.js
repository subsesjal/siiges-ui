export default function formattedDate(date) {
  const originalDate = new Date(date);
  return originalDate.toLocaleDateString('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric', separator: '-',
  });
}

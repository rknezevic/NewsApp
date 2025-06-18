
export default function formatDate(dateTime?: Date) {
    const mockDate = dateTime ?? new Date();
  return new Date(mockDate).toLocaleString('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

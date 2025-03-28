
/**
 * Get the appropriate CSS classes for a given sale status
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500/10 text-green-500';
    case 'Pending':
      return 'bg-amber-500/10 text-amber-500';
    case 'Cancelled':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

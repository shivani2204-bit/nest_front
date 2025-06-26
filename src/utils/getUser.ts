export const getUser = () => {
  if (typeof window === 'undefined') return null;
  return JSON.parse(localStorage.getItem('user') || '{}');
};

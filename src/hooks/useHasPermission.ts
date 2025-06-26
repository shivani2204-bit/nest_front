import { useAuthStore } from '@/stores/useAuthStore';

export const useHasPermission = (perm: string) => {
  const permissions = useAuthStore((s) => s.permissions);
  return permissions.includes(perm);
};

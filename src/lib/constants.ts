import type { ApiErrorResponse } from '@/types/api';

import AvatarProfile from '@/components/global/nav/avatar.profile';
export const apiInternalError: ApiErrorResponse = {
  ok: false,
  message: 'Internal Server Error',
};

export const PAGES_LIST = (pseudo: string, name: string, image: string): PageLink[] => {
  return [
    { href: '/', label: 'Home' },
    { href: '/publications', label: 'Publications', startWith: '/publication' },
    {
      href: `/user/${pseudo}`,
      label: name,
      icon: AvatarProfile({ image }),
    },
  ];
};

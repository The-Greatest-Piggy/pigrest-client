'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/providers/StoreProvider';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = observer(({ children }: AuthLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { authStore } = useStore();

  useEffect(() => {
    if (authStore.accessToken && pathname.startsWith('/auth')) {
      console.log(authStore.accessToken);
      router.push('/');
      console.log(authStore.accessToken);
    }
    if (!authStore.accessToken && pathname.startsWith('/profile')) {
      console.log(authStore.accessToken);
      router.replace('/auth?mode=login');
      console.log(authStore.accessToken);
    }
  }, [authStore.accessToken, pathname, router]);

  return <>{children}</>;
});

export default AuthLayout; 
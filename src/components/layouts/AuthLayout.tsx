'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  const previousPath = useRef<string | null>(null);
  
  useEffect(() => {
    // authStore가 초기화되지 않았으면 대기
    if (!authStore.isInitialized) {
      return;
    }

    // 초기 로딩 상태를 false로 설정
    setIsLoading(false);

    if (authStore.accessToken && pathname.startsWith('/auth')) {
      const previous = previousPath.current || '/';
      console.log(`리다이렉트: 인증된 사용자가 /auth 접근 -> ${previous} 로 이동`);
      router.replace(previous);
      return;
    } else {
      // 로그인되지 않은 사용자가 보호된 라우트에 접근하면 /auth로 리다이렉트
      if (pathname.startsWith('/profile')) {
        previousPath.current = pathname;
        console.log(`리다이렉트: 인증되지 않은 사용자가 /profile 접근 -> /auth로 이동`);
        router.replace('/auth');
        return;
      }
    }
  }, [authStore.accessToken, authStore.isInitialized, pathname, router]);

  // 초기 로딩 중이거나 authStore가 초기화되지 않았으면 아무것도 렌더링하지 않음
  if (isLoading || !authStore.isInitialized) {
    return null;
  }

  return <>{children}</>;
});

export default AuthLayout; 
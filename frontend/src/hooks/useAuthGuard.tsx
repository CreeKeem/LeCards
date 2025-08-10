import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TokenService } from '@/lib/auth/token-service';

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    if (!TokenService.hasValidAccessToken()) {
      router.push('/login');
    }
  }, [router]);

  return {
    isAuthenticated: TokenService.hasValidAccessToken(),
    userId: TokenService.getUserIdFromToken(),
    userInfo: TokenService.getUserInfoFromToken(),
  };
};
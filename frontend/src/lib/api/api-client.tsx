// frontend/src/lib/api/api-client.ts
import { TokenService } from '../auth/token-service';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export class ApiClient {
  private static async refreshToken(): Promise<boolean> {
    const refreshToken = TokenService.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${backendUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const tokens = await response.json();
        TokenService.setTokens(tokens);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    TokenService.clearTokens();
    return false;
  }

  static async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    // Check if token needs refresh
    if (TokenService.isTokenExpiringSoon()) {
      await this.refreshToken();
    }

    const token = TokenService.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // If we get a 401, try to refresh the token once
    if (response.status === 401) {
      const refreshSuccess = await this.refreshToken();
      if (refreshSuccess) {
        const newToken = TokenService.getAccessToken();
        const retryResponse = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`,
            'Content-Type': 'application/json',
          },
        });
        return retryResponse;
      } else {
        // Redirect to login if refresh failed
        window.location.href = '/login';
        throw new Error('Authentication failed');
      }
    }

    return response;
  }

  static async publicFetch(url: string, options: RequestInit = {}): Promise<Response> {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    });
  }
}
export interface Tokens {
  access_token: string;
  refresh_token: string;
}

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export class TokenService {
  static setTokens(tokens: Tokens): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
    }
  }

  static getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    return null;
  }

  static getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
  }

  static clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }

  static hasValidAccessToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      // Parse JWT payload to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  static isTokenExpiringSoon(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      const timeUntilExpiry = payload.exp - currentTime;
      // Refresh if token expires within 5 minutes
      return timeUntilExpiry < 300;
    } catch {
      return true;
    }
  }

  static getUserIdFromToken(): number | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch {
      return null;
    }
  }

  static getUserInfoFromToken(): { userId: number; email: string; fName: string; lName: string } | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        userId: payload.sub,
        email: payload.email,
        fName: payload.fName,
        lName: payload.lName
      };
    } catch {
      return null;
    }
  }
}
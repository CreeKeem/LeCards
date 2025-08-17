export interface Tokens {
  access_token: string;
  refresh_token: string;
}

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const REMEMBER_ME_KEY = "remember_me";

export class TokenService {
  static setTokens(tokens: Tokens, rememberMe: boolean = false): void {
    if (typeof window !== "undefined") {
      if (rememberMe) {
        // Use localStorage for persistent storage
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
        localStorage.setItem(REMEMBER_ME_KEY, "true");
      } else {
        // Use sessionStorage for session-only storage
        sessionStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
        sessionStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
        localStorage.setItem(REMEMBER_ME_KEY, "false");

        // Clear any existing localStorage tokens
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      }
    }
  }

  static getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      // Check localStorage first (for remember me), then sessionStorage
      return (
        localStorage.getItem(ACCESS_TOKEN_KEY) ||
        sessionStorage.getItem(ACCESS_TOKEN_KEY)
      );
    }
    return null;
  }

  static getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      // Check localStorage first (for remember me), then sessionStorage
      return (
        localStorage.getItem(REFRESH_TOKEN_KEY) ||
        sessionStorage.getItem(REFRESH_TOKEN_KEY)
      );
    }
    return null;
  }

  static isRememberMeEnabled(): boolean {
    if (typeof window !== "undefined") {
      return localStorage.getItem(REMEMBER_ME_KEY) === "true";
    }
    return false;
  }

  static clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(REMEMBER_ME_KEY);
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }

  static hasValidAccessToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      // Parse JWT payload to check expiration
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  static isTokenExpiringSoon(bufferMinutes: number = 5): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      const timeUntilExpiry = payload.exp - currentTime;
      // Refresh if token expires within the buffer time
      return timeUntilExpiry < bufferMinutes * 60;
    } catch {
      return true;
    }
  }

  static getUserIdFromToken(): number | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub;
    } catch {
      return null;
    }
  }

  static getUserInfoFromToken(): {
    userId: number;
    email: string;
    fName: string;
    lName: string;
  } | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        userId: payload.sub,
        email: payload.email,
        fName: payload.fName,
        lName: payload.lName,
      };
    } catch {
      return null;
    }
  }

  static getTokenExpirationTime(): Date | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return new Date(payload.exp * 1000);
    } catch {
      return null;
    }
  }

  static getTimeUntilExpiration(): number | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return Math.max(0, payload.exp - currentTime);
    } catch {
      return null;
    }
  }
}

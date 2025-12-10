let accessToken: string | null = null;

// Parse JWT to get expiration time
const parseJwt = (token: string): { exp: number } | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const tokenStorage = {
  getAccessToken: (): string | null => {
    return accessToken;
  },

  setAccessToken: (token: string | null): void => {
    accessToken = token;
  },

  clearAccessToken: (): void => {
    accessToken = null;
  },

  // Check if we have a valid token
  hasAccessToken: (): boolean => {
    return !!accessToken;
  },

  // Check if token is about to expire (within 1 minute)
  isTokenExpiringSoon: (bufferSeconds: number = 60): boolean => {
    if (!accessToken) return true;

    const payload = parseJwt(accessToken);
    if (!payload || !payload.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = payload.exp - now;

    return timeUntilExpiry < bufferSeconds;
  },

  // Get time until token expires (in seconds)
  getTimeUntilExpiry: (): number => {
    if (!accessToken) return 0;

    const payload = parseJwt(accessToken);
    if (!payload || !payload.exp) return 0;

    const now = Math.floor(Date.now() / 1000);
    return Math.max(0, payload.exp - now);
  },
};
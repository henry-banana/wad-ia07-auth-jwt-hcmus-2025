let accessToken: string | null = null;

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
};
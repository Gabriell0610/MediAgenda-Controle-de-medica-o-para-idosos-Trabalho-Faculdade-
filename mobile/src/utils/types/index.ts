export interface LoginAndRegisterRequestInterface {
  kind: string;
  localId: string;
  email: string;
  displayName?: string;
  idToken: string;
  registered?: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequestInterface {
  email: string;
  id: string;
  name: string;
}

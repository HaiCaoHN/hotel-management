export type AuthenticationResponse = {
  email: string;
  name: string;
  image: string;
  isActive: boolean;

  userExisted: boolean;
  status: number;
  token: string;
  refreshToken: string;
};

export type AuthenticationRequest = {
  email: string;
  password: string;
  name: string;
  type: string;
  accessToken: string;
};

export type SocialSignUpResponse = {
  email: string;
  name: string;
  image: string;
  isExisted: boolean;
  accessToken: string;
  refreshToken: string;
};

export type SocialSignUpRequest = {
  email: string;
  password: string;
  accessToken: string;
};
export type RefreshTokenResponse = {
  message: string;
  refreshToken: string;
  accessToken: string;
};

import oauthClient from '../config/google';

export const getGoogleAuthUri = sourceUri =>
  oauthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    state: JSON.stringify({ sourceUri }),
  });

export const getCredentialsByCode = async code => {
  const { tokens } = await oauthClient.getToken(code);
  return tokens;
};

export const getGoogleUser = async accessToken => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
  );
  const googleUser = await response.json();
  return googleUser;
};

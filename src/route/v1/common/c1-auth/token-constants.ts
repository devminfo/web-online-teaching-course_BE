export const tokenConstants = {
  secret: '?wOfl6_4Q_KeYS(#a{qGe+W2!L_q6H', // https://randomkeygen.com/
  expiresIn: '30m',
  expirationTime: {
    accessToken: '88d',
    refreshToken: '1m',
  },
  secrets: {
    accessToken: process.env.ACCESS_TOKEN || '8I5P3PCvYTnLoJuBLpW2PDjGhI7f67fy', // https://randomkeygen.com/
    refreshToken:
      process.env.REFRESH_TOKEN
      || 'c15476aec025be7a094f97aac6eba4f69268e706e603f9e1ec4d815396318c86',
  },
};

const commonConstants = {
  pagination: {
    defaultLimit: 20,
    defaultPage: 1,
  },
  server: {
    ip: '127.0.0.1',
    hostname: 'localhost',
    port: 3000,
  },
  endpointWhiteListGuard: [
    'role/seed',
    'endpoint-api/seed',
    'rbac-api/seed',
    '/auth/login-with-social',
    '/auth/login-local',
    '/auth/signup-local',
    'otps/send-otp-phone',
    'otps/send-otp-email',
    '/provinces',
    '/districts',
    '/villages',
    '/endpoint-api',
    '/add-deviceID',
    '/answerList',
    '/users',
    '/all-routes',
    '/',
  ],
};

export default commonConstants;

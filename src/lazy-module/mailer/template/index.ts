import OtpTemplate from './otp/otp.template';
import VerifyTemplate from './verify/verify.template';
import WelcomeTemplate from './welcome/welcome.template';

const mailerTemplate = {
  templateWelcome: new WelcomeTemplate(),
  templateOTP: new OtpTemplate(),
  templateVerify: new VerifyTemplate(),
};

export default mailerTemplate;

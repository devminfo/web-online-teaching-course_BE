import fs from 'fs';
import { template } from 'lodash';

export default class OtpTemplate {
  private html: any;

  constructor() {
    this.init();
  }

  async init() {
    this.html = template(
      await fs.readFileSync(`${__dirname}/otp.template.hbs`).toString(),
    );
  }

  public render(context: any) {
    try {
      return this.html(context);
    } catch (e) {
      /* eslint no-console: 0 */
      console.log('Render error', e);
    }
  }
}

import { ApplicationController } from './';
export class RegistrationController extends ApplicationController {
  constructor() {
    super('User');
  }
  signup(req, res) {
    req.pick = [ 'email', 'firstName', 'lastName', 'password','phone' ];
    return super._create(req , res, { message: res.__('user').success });
  }
}

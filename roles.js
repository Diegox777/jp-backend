const AccessControl = require('accesscontrol');
const ac = new AccessControl();

ac.grant('basic')
    .readOwn('profile')
    .updateOwn('profile')
  .grant('supervisor')
    .extend('basic')
    .readAny('profile')
  .grant('admin')
    .extend('basic')
    .extend('supervisor')
    .updateAny('profile')
    .deleteAny('profile');

module.exports = {
    roles: ac
}

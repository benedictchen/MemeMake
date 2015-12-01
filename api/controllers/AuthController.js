/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: Provides the base authentication
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */
var bcrypt = require('bcrypt');
var waterlock = require('waterlock');

 module.exports = waterlock.waterlocked({


  register: function(req, res) {
    var params = req.params.all();
    var def = waterlock.Auth.definition;
    var criteria = {};
    var scopeKey = def.email !== undefined ? 'email' : 'username';

    var attr = {
      username: params.username,
      password: params.password
    };

    attr[scopeKey] = params[scopeKey];
    criteria[scopeKey] = attr[scopeKey];
    waterlock.engine.findAuth(criteria, function(err, user) {
      if (user) {
        return res.badRequest({
          error: 'User already exists'
        });
      }
      else {
        waterlock.engine.findOrCreateAuth(criteria, attr, function(err, user) {
          if (err) {
            return res.badRequest(err);
          }
          console.log(user);
          delete user.password;
          return res.ok(user);
        });
      }
    });
  },

});

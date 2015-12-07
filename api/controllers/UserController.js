/**
 * UserController.js
 *
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */


var getMemes = function(user, response) {
  console.log(user)
  return Meme.find({
    user: user.id
  }, function(err, memes) {
    console.log(err, memes);
    if (err) {
      return response.serverError(err);
    }
    return response.status(200).jsonx(memes);
  });
};


module.exports = require('waterlock').actions.user({

  memes: function(request, response) {
    var params = request.allParams();
    var userId = params.userId;
    var username = params.username;
    console.log('Memes for user...', userId, username, request.user)
    if (!userId && !username && !request.session.user) {
      return response.forbidden('No user specified.');
    }
    if (userId || username) {
      User.findOne({
        or: [
          { id: userId },
          { username: username }
        ]
      }).exec(function(err, user) {
        if (err) {
          return response.serverError(err);
        }
        return getMemes(user, response);
      });
    } else {
      return getMemes(request.session.user, response);
    }
  }

});

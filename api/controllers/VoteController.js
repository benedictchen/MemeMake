/**
 * VoteController
 *
 * @description :: Server-side logic for managing Votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	vote: function(request, response) {
    var params = request.allParams();
    if (!request.session.user) {
      response.forbidden('User is not logged in.');
      return;
    }
    if (!params.memeId || !params.directionValue) {
      response.badRequest('Meme ID or direction value is missing');
      return;
    }
    // Has the user already voted on this meme?
    Meme.findOne({id: params.memeId}, function(err, meme) {
      console.log('Meme', err, meme);
      if (!meme) {
        response.notFound('Meme with ' + params.memeId + ' not found.');
      }
      Vote.find({
        user: request.session.user.id,
        meme: meme.id,
      }, function(err, records) {
        console.log(err, records);
        response.status(200).jsonx(records);
      });
    });

    // We can change the vote if the vote is different
    // Otherwise, don't allow them to vote again.

  }
};


/**
 * VoteController
 *
 * @description :: Server-side logic for managing Votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  list: function(request, response) {
    return Vote.find(function(err, records) {
      response.status(200).jsonx(records);
    });
  },

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
        return;
      }
      Vote.find().where({
        memeId: meme.id,
        userId: request.session.user.id,
      }).exec(function(err, records) {
        if (err) {
          response.serverError(err);
          return;
        }
        console.log('Finding all votes: ',err, records);
        if (!records.length) {
          console.log('CREATE TIME\n');
          Vote.create({
            memeId: meme.id,
            userId: request.session.user.id,
            directionValue: params.directionValue
          }, function(err, createdVote) {
            console.log('creating votes?', err, createdVote);
            if (err) {
              response.serverError(err);
              return;
            }
            response.status(200).jsonx(createdVote);
            return;
          });
        } else {
          console.log('UPDATE TIME\n');
          if (records[0].directionValue === params.directionValue) {
            return response.status(200).jsonx(records[0]);
          }
          Vote.update(records[0].id, {
            memeId: meme.id,
            userId: request.session.user.id,
            directionValue: params.directionValue,
          }, function(err, updatedRecord) {
            console.log('updated votes?', err, updatedRecord);
            if (err) {
              response.serverError(err);
              return;
            }
            response.status(200).jsonx(updatedRecord[0]);
            return;
          });
        }
      });
    });

    // We can change the vote if the vote is different
    // Otherwise, don't allow them to vote again.

  }
};


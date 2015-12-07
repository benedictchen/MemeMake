/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var updateVoteCounts = function(values, callback) {
  Meme.findOne(values.memeId).exec(function(err, meme) {
    if (err || !meme) {
      console.log('ERROR OCCURRED: ' + err + meme);
      callback();
    }
    var voteCount = meme.voteCount || 0;
    console.log('Updating vote count', voteCount, values);
    console.log('\nVOTE TOTAL:', voteCount + values.directionValue);
    Meme.update(meme.id, {
      voteCount: voteCount + values.directionValue
    }, function() {
      callback();
    });
  });
};

module.exports = {

  attributes: {
    directionValue: { type: 'integer', required: true },
    // meme: { collection: 'Meme' },
    // user: { collection: 'User' },
    memeId: {type: 'string', required: true },
    userId: {type: 'string', required: true },
  },

  afterCreate: updateVoteCounts,
  afterUpdate: updateVoteCounts,

};


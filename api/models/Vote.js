/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    directionValue: { type: 'integer', required: true },
    // meme: { collection: 'Meme' },
    // user: { collection: 'User' },
    memeId: {type: 'string'},
    userId: {type: 'string'},
  }
};


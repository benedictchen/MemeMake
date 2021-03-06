/**
* Meme.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    user: { model: 'User' },

    author: { type: 'string'},

    description: { type: 'string' },

    imageUrl: { type: 'string', required: true},

    voteCount: { type: 'integer', defaultsTo: 0 },

  }
};


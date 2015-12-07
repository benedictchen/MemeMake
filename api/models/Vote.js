/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    user: { collection: 'User', via: 'votes', required: true },
    meme: { collection: 'Meme', via: 'votes', required: true },
    directionValue: { type: 'integer', required: true }
  }
};

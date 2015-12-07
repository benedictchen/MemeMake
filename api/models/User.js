/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.user.attributes({

    memes: { collection: 'Meme', via: 'user' },
    votes: { collection: 'Vote', via: 'user' },

  }),

  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};

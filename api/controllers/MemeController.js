/**
 * MemeController
 *
 * @description :: Server-side logic for managing memes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * Websocket request check endpoint.
   */
  addConv: function(req, res) {
    console.log('checking websocket stuff.', req.params.all(), req.socket.id);
  }

};


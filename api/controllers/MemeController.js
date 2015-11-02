/**
 * MemeController
 *
 * @description :: Server-side logic for managing memes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var aws = require('aws-sdk');
aws.config.update({
  accessKeyId: sails.config.AWS_ACCESS_KEY_ID,
  secretAccessKey: sails.config.AWS_SECRET_ACCESS_KEY
});

var AWS_S3_BUCKET_NAME = sails.config.S3_BUCKET_NAME;

module.exports = {

  /**
   * Websocket request check endpoint.
   */
  addConv: function(req, res) {
    console.log('checking websocket stuff.', req.params.all(), req.socket.id);
  },

  /**
   * Signs a request from AWS so we can upload there directly.
   */
  getSignedUploadUrl: function(request, response) {
    var fileName = request.query.file_name;
    var fileType = request.query.file_type;
    console.log(fileName, fileType)
    if (!(fileName && fileType)) {
      response.send(400, 'Must provide file name and type.');
      response.end();
      return;
    }
    var s3 = new aws.S3();
    s3.getSignedUrl('putObject', {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: fileName,
      Expires: 360,
      ContentType: fileType,
      ACL: 'public-read'
    }, function(err, data) {
      if (err) {
        console.log(err);
        response.send(500, err);
      } else {
        response.write(JSON.stringify({
          data: data,
          url: 'https://' + AWS_S3_BUCKET_NAME + '.s3.amazonaws.com/' + fileName
        }));
        response.end();
      }
    });
  }

};


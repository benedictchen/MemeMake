angular.module('mainApp').factory('MemeService', [
  '$http', '$q',
  function($http, $q) {
    var MemeService = {

      getMemeById: function(memeId) {
        if (!memeId) {
          throw new TypeError('Must provide meme ID');
        }
        var deferred = $q.defer();
        $http.get('/meme/' + memeId).success(function(result) {
          deferred.resolve(result);
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

      /**
       * Lists all memes.
       * @return {Promise} Promise that may be fulfilled asynchronously.
       */
      list: function() {
        var deferred = $q.defer();
        $http.get('/meme').success(function(result) {
          deferred.resolve(result);
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

      listRecent: function() {
        var deferred = $q.defer();
        $http.get('/meme', {
          params: {
            sort: 'createdAt DESC'
          }
        }).success(function(result) {
          deferred.resolve(result);
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

      /**
       * Lists all templates.
       * @return {Promise} Promise that may be fulfilled asynchronously.
       */
      listTemplates: function() {
        var deferred = $q.defer();
        $http.get('/memetemplate').success(function(result) {
          deferred.resolve(result);
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

      /**
       * Gets a URL to upload an asset to.
       * @param {String} fileName Name of the file to upload.
       * @param {String} fileType File MIME type to be uploaded.
       * @return {Promise} Promise that may be fulfilled asynchronously.
       */
      getSignedUploadUrl: function(fileName, fileType) {
        var deferred = $q.defer();
        $http.get('/meme/uploadRequest', {
          params: {
            file_name: fileName,
            file_type: fileType
          }
        }).success(function(result, status) {
          if (!(status && status >= 200 && status < 400)) {
            deferred.reject(result);
          } else {
            deferred.resolve(result);
          }
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

      /**
       * Uploads a file.
       * @param  {File} file HTML5 file to be uploaded.
       * @return {Promise} Promise that may be fulfilled asynchronously.
       */
      uploadFile: function(file) {
        var deferred = $q.defer();
        var url = '';
        MemeService.getSignedUploadUrl(file.name, file.type)
          .then(function(result) {
            console.log('getSignedUploadUrl', result);
            url = result.url;
            $http.put(result.data, file, {
              headers: {
                'Content-Type': file.type,
                'x-amz-acl': 'public-read',
              },
            }).success(function(result) {
              console.log(result)
              deferred.resolve(url);
            }).error(function(err) {
              deferred.reject(err);
            })
          }).catch(function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      },

      saveMeme: function(memeData, description) {
        if (!memeData || !description) {
          throw new Error('Required Params:\n' + memeData + '\n' + description);
        }
        var deferred = $q.defer();
         // Convert to blob for upload.
        var parts = memeData.split(',');
        var mime = 'image/png';
        var blobBin = atob(parts[1]);
        var buffer = [];
        for(var i = 0; i < blobBin.length; i++) {
            buffer.push(blobBin.charCodeAt(i));
        }
        var blob = new Blob([ new Uint8Array(buffer) ], { type: mime });
        var randomNum = Math.floor(Math.random() * 100);
        blob.name = 'Meme-' + Date.now() + randomNum + '.png';
        // Upload to AWS.
        MemeService.uploadFile(blob).then(function(imageUrl) {
          $http.put('/meme/create', {
            description: description,
            imageUrl: imageUrl
          }).success(function(result) {
            console.log(result)
            deferred.resolve(result);
          }).error(function(err) {
            deferred.reject(err);
          });
        }).catch(function() {
          console.error(arguments);
        });
        return deferred.promise;
      },

      /**
       * Creates a new template based on an existing URL.
       * @param {String} title Title of the template.
       * @param {String} url The URL of the template.
       * @return {Promise} A promise for the payload results.
       */
      createTemplate: function(title, url) {
        if (!title || !url) {
          throw new Error('Required params:\n' + title + ' \n ' + url);
        }
        var deferred = $q.defer();
        $http.put('/memetemplate/create', {
          title: title,
          imageUrl: url
        }).success(function(result) {
          deferred.resolve(result);
        }).error(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      }
    };


    return MemeService;
  }
]);

/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  AWS_ACCESS_KEY_ID: 'AKIAJQN5AXVT4ICQ4CJQ',
  AWS_SECRET_ACCESS_KEY: '+WYvnQYa5lMH7nA+uSO/WVn2VlkH96zOrFyUjXiI',
  S3_BUCKET_NAME: 'mememake',

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
    connection: 'postgresLocal'
  },

  connections: {
    postgresLocal: {
      adapter: 'sails-postgresql',
      // host: 'localhost',
      // user: 'benedictchen',
      // password: '',
      // database: 'mememake',
      url: 'postgres://mgvaavafmssoum:eidAc3l1aVYJr51lL17PAae6hS@ec2-107-21-219-201.compute-1.amazonaws.com:5432/d7i8o8n92ranvu',
      ssl: true
    }
  },
};

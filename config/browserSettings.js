/**
 *
 *            Browser specific settings
 *
 * **************************************************
 * * WARNING! Never access any secrets in this file *
 * **************************************************
 *
 */

const { getEnv } = require('kth-node-configuration')

module.exports = {
  azureBlobConnectionString: {
    uri: getEnv('AZURE_BLOB_SAS_CONNECTION_STRING', null),
  },
}

/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars
import { observable, action } from 'mobx'

const { BlobServiceClient } = require('@azure/storage-blob')
export default createApplicationStore

function createApplicationStore() {
  const store = {
    language: null,

    message: 'Hallo',

    setMessage: action(async function setMessage(text = 'Happy coding!! :)') {
      this.message = text
    }),

    setLanguage: action(function setLanguage(lang) {
      this.language = lang
    }),

    teams: {},

    getTeams: action(async function () {
      // Create a new BlobServiceClient
      const blobServiceClient = new BlobServiceClient(window.config.azureBlobConnectionString.uri)

      let containers = blobServiceClient.listContainers()
      for await (const container of containers) {
        this.teams[container.name] = this.teams[container.name] != false
      }
    }),
  }
  return store
}

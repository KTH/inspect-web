/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars

import { observable, observe, action } from 'mobx'

const { BlobServiceClient } = require('@azure/storage-blob')

export default createApplicationStore
console.log('URI: ', window.config.azureBlobConnectionString.uri)
const blobServiceClient = new BlobServiceClient(window.config.azureBlobConnectionString.uri)

function createApplicationStore() {
  const store = observable({
    language: null,

    setLanguage: action(function setLanguage(lang) {
      this.language = lang
    }),

    teams: new Map(),
    apps: [],
    get selectedApps() {
      return this.apps.filter(a => a.selected)
    },

    getTeams: action(async function () {
      const containers = blobServiceClient.listContainers()
      for await (const container of containers) {
        const isChecked = this.teams.get(container.name) == undefined || false ? false : true
        this.teams.set(container.name, isChecked)
      }
    }),
  })

  let count = 0

  let getTeamsAppsWorker

  observe(
    store.teams,
    // () => toJS(store.teams),
    async event => {
      const selectedTeams = []
      const team = event.name
      if (event.type === 'update' && event.newValue) {
        selectedTeams.push(team)
      } else {
        store.apps
          .filter(app => app.team === team)
          .forEach(app => {
            store.apps.remove(app)
          })
      }

      getTeamsAppsWorker = getTeamsAppsWorker || new Worker('./getTeamsAppsWorker.js')

      getTeamsAppsWorker.onmessage = function (e) {
        store.apps.push(
          ...e.data.map(a => {
            a.selected = true
            return a
          })
        )
      }

      getTeamsAppsWorker.postMessage({
        config: window.config.azureBlobConnectionString.uri,
        teams: selectedTeams,
      })

      window.onbeforeunload = event => {
        getTeamsAppsWorker.terminate()
      }
    }
  )

  store.getTeams()

  return store
}

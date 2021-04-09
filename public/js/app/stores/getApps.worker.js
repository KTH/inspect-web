// var DOMParser = require('xmldom').DOMParser
// var DOMImplementation = require('xmldom').DOMImplementation
// var XMLSerializer = require('xmldom').XMLSerializer

// self.DOMParser = { parseFromString: () => new Error('hej') }
// self.XMLSerializer = XMLSerializer

// self.document = {
//   implementation: new DOMImplementation(),
// }

// self.window = {
//   navigator,
// }

// eslint-disable-next-line no-unused-vars
import DomParserFix from './DOMParserFix'

// eslint-disable-next-line import/order
import { BlobServiceClient } from '@azure/storage-blob'

onmessage = async function (e) {
  const blobServiceClient = new BlobServiceClient(e.data.config)
  const { team } = e.data

  const containerClient = blobServiceClient.getContainerClient(team)

  const apps = {}

  for await (const blob of containerClient.listBlobsFlat()) {
    if (/^\//.test(blob.name)) {
      console.log('Bad filename: ' + blob.name)
      continue
    }

    const blockBlobClient = containerClient.getBlockBlobClient(blob.name)

    const nameParts = blob.name.match(/([^_]*?)((?=_)|$)/g).filter(s => s !== undefined && s.trim().length > 0)

    const name = nameParts[0]
    const commit = nameParts[1]
    const url = nameParts[2]

    const appName = name.replaceAll('-', '')

    if (!apps[appName]) {
      apps[appName] = {}
      apps[appName].name = name
      apps[appName].team = team
      apps[appName].results = []
    }

    const result = {}
    result.date = blob.properties.lastModified
    result.commit = commit
    result.testUrl = url.replaceAll('-', '/')
    result.dataUrl = blockBlobClient.url

    const sameTestrun = apps[appName].results.find(r => r.commit === commit)

    if (sameTestrun) {
      sameTestrun.tests.push(result)
    } else {
      apps[appName].results.push({ commit, date: result.date, tests: [result] })
    }
  }

  Object.values(apps).forEach(app => {
    const latestResultCommitHash = app.results.sort((a, b) => new Date(b.date) - new Date(a.date))[0].commit
    app.latestBuild = latestResultCommitHash
  })

  postMessage(Object.values(apps))
}

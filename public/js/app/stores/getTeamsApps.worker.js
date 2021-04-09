import GetAppsWorker from './getApps.worker.js'

onmessage = async function (e) {
  const { teams } = e.data

  teams.forEach(async team => {
    const getAppsWorker = GetAppsWorker()

    getAppsWorker.onmessage = function (e) {
      postMessage(e.data)
      getAppsWorker.terminate()
    }

    getAppsWorker.postMessage({
      config: e.data.config,
      team: team,
    })
  })
}

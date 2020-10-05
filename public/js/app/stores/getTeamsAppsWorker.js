onmessage = async function (e) {
  const { teams } = e.data

  teams.forEach(async team => {
    const getAppsWorker = new Worker('./getAppsWorker.js')

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

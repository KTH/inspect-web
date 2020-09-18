onmessage = async function (e) {
  const { teams } = e.data

  console.log('getTeamsAppsWorker working on teams: ' + JSON.stringify(teams))

  teams.forEach(async team => {
    const getAppsWorker = new Worker('./getAppsWorker.js')

    getAppsWorker.onmessage = function (e) {
      console.log('Posting message back to main script')
      postMessage(e.data)
    }

    console.log('getTeamsAppsWorker: posting message to getAppsWorker: ' + team)
    getAppsWorker.postMessage({
      config: e.data.config,
      team: team,
    })
  })
}

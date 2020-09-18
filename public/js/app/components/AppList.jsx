import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

function Test({ result }) {
  return (
    <div>
      <a href={result.dataUrl}>{result.testUrl}</a>
    </div>
  )
}

function AppList() {
  const { selectedApps } = useStore()

  const handleClick = app => {
    app.selected = !app.selected
  }

  return (
    <div className="InspectResults">
      <h1 className="SearchRefiner-GroupTitle">Apps</h1>
      {selectedApps.map(app => {
        // const blockBlobClient = containerClient.getBlockBlobClient(blob.name)
        // fetch(blockBlobClient.url).then(response => console.log(response.json()))

        // const latestResults = app.results.find(r => r.commit === app.latestBuild)

        const latestTestrun = app.results.find(r => r.commit === app.latestBuild)

        return (
          <details>
            <summary class="blue">
              {app.name} - #{app.latestBuild}
            </summary>
            <p>
              {latestTestrun.tests.map(result => {
                return <Test result={result}></Test>
              })}
            </p>
          </details>
        )
      })}
    </div>
  )
}

export default observer(AppList)

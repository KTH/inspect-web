import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

function Test({ result }) {
  return (
    <div>
      <details>
        <summary class="white">{result.testUrl.replace('.html', '')}</summary>
        <iframe src={result.dataUrl}></iframe>
        <a className="newWindow" target="_blank" href={result.dataUrl}>
          Open results in new window
        </a>
      </details>
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
              {app.name}
              <div className="build">
                {latestTestrun.date.toISOString().slice(0, 16).replace('T', ' ')} - #{app.latestBuild}
              </div>
            </summary>
            <p>
              {latestTestrun.tests
                .filter(r => r.dataUrl.includes('.html'))
                .map(result => {
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

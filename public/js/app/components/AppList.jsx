import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function Test({ result }) {
  return (
    <div key={result.dataUrl}>
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
    <div id="inspectResults">
      <TransitionGroup className="result-list">
        {selectedApps.map(app => {
          // const blockBlobClient = containerClient.getBlockBlobClient(blob.name)
          // fetch(blockBlobClient.url).then(response => console.log(response.json()))

          // const latestResults = app.results.find(r => r.commit === app.latestBuild)

          const latestTestrun = app.results.find(r => r.commit === app.latestBuild)

          return (
            <CSSTransition
              unmountOnExit
              // in={inProp}
              timeout={{ appear: 0, enter: 300, exit: 300 }}
              classNames="list-transition"
              appear
            >
              <details key={app.name}>
                <summary class="blue">
                  {app.name}
                  <div className="build">
                    {latestTestrun.date.toISOString().slice(0, 16).replace('T', ' ')} - #{app.latestBuild}
                  </div>
                </summary>
                {latestTestrun.tests
                  .filter(r => r.dataUrl.includes('.html'))
                  .map(result => {
                    return <Test result={result}></Test>
                  })}
              </details>
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    </div>
  )
}

export default observer(AppList)

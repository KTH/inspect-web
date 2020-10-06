import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function Test({ result, openClose }) {
  return (
    <div key={result.dataUrl}>
      <details open={openClose}>
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

  let [openClose, toggleAllResults] = useState(0)

  return (
    <div id="inspectResults">
      <div id="toolbar">
        <button
          disabled={selectedApps && selectedApps.length === 0}
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => toggleAllResults((openClose = !openClose))}
        >
          {openClose ? 'Contract all' : 'Expand all'}
        </button>
        <h3>Results</h3>
      </div>
      <TransitionGroup className="result-list">
        {selectedApps.map(app => {
          const latestTestrun = app.results.find(r => r.commit === app.latestBuild)

          return (
            <CSSTransition
              unmountOnExit
              timeout={{ appear: 0, enter: 300, exit: 300 }}
              classNames="list-transition"
              appear
            >
              <details key={app.name} open={openClose}>
                <summary class="blue">
                  {app.name}
                  <div className="build">
                    {latestTestrun.date.toISOString().slice(0, 16).replace('T', ' ')} - #{app.latestBuild}
                  </div>
                </summary>
                {latestTestrun.tests
                  .filter(r => r.dataUrl.includes('.html'))
                  .map(result => {
                    return <Test result={result} openClose={openClose}></Test>
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

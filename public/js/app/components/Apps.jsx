import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import { entries } from 'mobx'

import i18n from '../../../../i18n'

function Checkbox({ app, onClick }) {
  return (
    <div key={app.name} className="SearchRefiner-InputRow">
      <label>
        <input
          className="SearchRefiner-Input"
          onClick={() => onClick(app)}
          type="checkbox"
          name="team"
          defaultChecked={app.selected}
        />
        {app.name}
      </label>
      {/* <span class="badge badge-secondary">202</span> */}
    </div>
  )
}

function Apps() {
  const { apps } = useStore()

  const handleClick = app => {
    app.selected = !app.selected
  }

  const [buttonClicked, setButtonClicked] = useState(false)

  return (
    <div className="SearchRefiner-Group">
      <h3 className="SearchRefiner-GroupTitle">Apps</h3>
      <div className="SearchRefiner-CheckboxGroup">
        {apps.map(app => {
          return <Checkbox onClick={handleClick} apps={apps} app={app} />
        })}
      </div>
    </div>
  )
}

export default observer(Apps)

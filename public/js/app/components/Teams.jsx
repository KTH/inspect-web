import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import i18n from '../../../../i18n'

function Checkbox({ team, value, onClick }) {
  return (
    <div key={team} className="SearchRefiner-InputRow">
      <label>
        <input
          className="SearchRefiner-Input"
          onClick={() => onClick(team)}
          type="checkbox"
          name="team"
          defaultChecked={value}
        />
        {team}
      </label>
      {/* <span class="badge badge-secondary">202</span> */}
    </div>
  )
}

function Teams() {
  const { teams, getTeams } = useStore()

  const handleClick = team => {
    teams.set(team, !teams.get(team))
  }

  return (
    <div className="SearchRefiner-Group">
      <h3 className="SearchRefiner-GroupTitle">Teams</h3>
      <div className="SearchRefiner-CheckboxGroup">
        {[...teams].map(([team, checked]) => {
          return <Checkbox onClick={handleClick} teams={teams} team={team} value={checked} />
        })}
      </div>
    </div>
  )
}

export default observer(Teams)

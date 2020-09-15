import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import i18n from '../../../../i18n'

function Teams() {
  const { teams, getTeams } = useStore()

  const [buttonClicked, setButtonClicked] = useState(false)

  return (
    <div class="SearchRefiner-Group">
      <h3 class="SearchRefiner-GroupTitle">Teams</h3>
      <div class="SearchRefiner-CheckboxGroup">
        {Object.keys(teams).map(team => {
          return (
            <div key={team} className="SearchRefiner-InputRow">
              <label>
                <input className="SearchRefiner-Input" type="checkbox" name="team" value="{teams[team]}" />
                {team}
              </label>
              {/* <span class="badge badge-secondary">202</span> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default observer(Teams)

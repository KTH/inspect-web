import React from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import i18n from '../../../../i18n'

// import Button from '../components/Button'
import Teams from '../components/Teams'
import Apps from '../components/Apps'
import AppList from '../components/AppList'

const Start = () => {
  const { message, language: lang } = useStore()

  return (
    <div className="row">
      <menu className="col-3" id="menu">
        <Teams></Teams>
        <Apps></Apps>
      </menu>
      <main className="col-9" id="mainContent">
        <AppList></AppList>
      </main>
    </div>
  )
}

export default observer(Start)

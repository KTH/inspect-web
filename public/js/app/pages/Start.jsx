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
    <>
      <div className="row">
        <div className="col-12">
          <h1 id="logo">
            KTH
            <br />
            &#305;nspect
          </h1>
        </div>
      </div>
      <div className="row grow" id="mainRow">
        <menu className="col-12 col-md-3" id="menu">
          <Teams></Teams>
          <Apps></Apps>
        </menu>
        <main className="col-12 col-md-9" id="mainContent">
          <AppList></AppList>
        </main>
      </div>

      <div className="row">
        <div className="col footerContainer">
          <div className="footer">start</div>
        </div>
      </div>
    </>
  )
}

export default observer(Start)

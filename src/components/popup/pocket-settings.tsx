import React, { useState } from 'react'
import { Color, TwitterPicker } from 'react-color'
import { connect } from 'react-redux'

import { newPocket, updatePocketSettings } from '../../redux/actions/ui'
import { getPocketById } from '../../redux/selectors/pocket'
import { Pocket, PocketID, PocketListRoute, PocketSettings, State } from '../../types'

import { route } from './router'

interface OwnProps {
  id?: PocketID,
  setRoute: (route: PocketListRoute) => void
}

interface StateProps {
  pocket?: Pocket
}

interface Handlers {
  onConfirm: (pocket: PocketSettings, id?: PocketID) => void
}

const mapStateToProps = (state: State, { id }: OwnProps) => ({
  pocket: id !== undefined ? getPocketById(state, id) : undefined
} as StateProps)

const mapDispatchToProps = {
  onConfirm: (settings: PocketSettings, id?: PocketID) =>
    id !== undefined
      ? updatePocketSettings({ id, settings })
      : newPocket(settings)
} as Handlers

// todo: clean this mess
const initializeSettings = (pocket?: Pocket) => ({
  name: pocket ? pocket.name : '',
  color: pocket ? pocket.color : '',
  icon: pocket ? pocket.icon : ''
} as PocketSettings)

export const useSettings = (initialState: PocketSettings) => {
  const [settings, setSettings] = useState(initialState)

  const update = <K extends keyof PocketSettings>
    (key: K, value: PocketSettings[K]) => setSettings({ ...settings, [key]: value })

  return [settings, update] as [PocketSettings, Function]
}

const PocketSettings = ({
  id, setRoute, pocket, onConfirm
}: OwnProps & StateProps & Handlers) => {
  const [settings, updateSettings] = useSettings(initializeSettings(pocket))

  const handleConfirm = () => {
    setRoute(route.pocketList())
    onConfirm(settings, id)
  }

  return (
    <form id="pocket-detail">
      <header>{!!id ? 'New Pocket' : 'Edit Pocket'}</header>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={settings.name}
          onChange={(e) => updateSettings('name', e.target.value)}
        />
      </div>
      <div>
        <label>Color:</label>
        <TwitterPicker
          color={settings.color as Color}
          onChangeComplete={(colorResult) => updateSettings('color', colorResult.hex)}
          triangle={'hide'}
        />
      </div>
      <div>
        <label>Icon:</label>
        <div>(placeholder emoji picker)</div>
      </div>
      <nav>
        <div
          className="cancel"
          onClick={() => {
            setRoute(route.pocketList())
          }}
        >
          &lt;--
        </div>
        <div className="confirm" onClick={handleConfirm}>--&gt;</div>
      </nav>
    </form>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketSettings)

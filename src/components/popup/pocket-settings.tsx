import EmojiPicker from 'emoji-picker-react'
import React from 'react'
import { Color, TwitterPicker } from 'react-color'
import { connect } from 'react-redux'

import { newPocket, updatePocketSettings } from '../../redux/actions/ui'
import { getPocketById } from '../../redux/selectors/pocket'
import { Pocket, PocketID, PocketListRoute, PocketSettings, State } from '../../types'

import { route, useSettings } from './hooks'

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

const PocketSettingsComponent = ({
  id, setRoute, pocket, onConfirm
}: OwnProps & StateProps & Handlers) => {
  const [settings, updateSettings] = useSettings<PocketSettings>({
    name: pocket ? pocket.name : '',
    color: pocket ? pocket.color : '',
    icon: pocket ? pocket.icon : ''
  } as PocketSettings)

  const handleConfirm = () => {
    onConfirm(settings, id)
    setRoute(route.pocketList())
  }

  return (
    <form id="pocket-detail">
      <header>{id === undefined ? 'New' : 'Edit'} Pocket</header>
      <div>
        <input
          type="text"
          value={settings.name}
          onChange={(e) => updateSettings('name', e.target.value)}
          placeholder="Memes"
        />
      </div>
      <div>
        <TwitterPicker
          color={settings.color as Color}
          onChangeComplete={
            (colorResult) =>
              updateSettings('color', colorResult.hex)
          }
          triangle={'hide'}
        />
      </div>
      <div>
        <EmojiPicker
          onEmojiClick={
            (code: string, emoji: {name: string}, e: Event) =>
              updateSettings('icon', emoji.name)
          }
        />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PocketSettingsComponent)

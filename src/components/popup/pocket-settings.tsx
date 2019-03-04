import { Picker as EmojiPicker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import emoji from 'node-emoji'
import React from 'react'
import { Color, GithubPicker as ColorPicker } from 'react-color'
import { connect } from 'react-redux'

import styled from '../../styled-components'
import { newPocket, updatePocketSettings } from '../../redux/actions/ui'
import { getPocketById } from '../../redux/selectors/pocket'
import { Pocket, PocketID, PocketListRoute, PocketSettings, State } from '../../types'
import { getRandomOf } from '../../utils'
import { FlexChild, flexify, FlexParent } from '../shared/flexbox'
import PocketIcon from '../shared/pocket-icon'
import { PopupHeader } from '../shared/utils'

import { route, useSettings } from './hooks'

// --- interfaces --- //

interface OwnProps {
  id?: PocketID,
  setRoute: (route: PocketListRoute) => void
}

interface StateProps { pocket?: Pocket }

interface Handlers { onConfirm: (pocket: PocketSettings, id?: PocketID) => void }

// --- redux --- //

const mapStateToProps = (state: State, { id }: OwnProps) => ({
  pocket: id !== undefined ? getPocketById(state, id) : undefined
} as StateProps)

const mapDispatchToProps = {
  onConfirm: (settings: PocketSettings, id?: PocketID) =>
    id !== undefined
      ? updatePocketSettings({ id, settings })
      : newPocket(settings)
} as Handlers

// --- functions --- //

const defaultNames = [
  "Memes", "Cat photos", "Weird YouTube videos", "Articles", "Stuff",
  "Job listings", "Things"
]

const FlexPocketIcon = flexify(PocketIcon)

// --- component --- //

const PocketSettingsComponent = ({
  id, setRoute, pocket, onConfirm
}: OwnProps & StateProps & Handlers) => {
  const [settings, updateSettings] = useSettings<PocketSettings>({
    name: pocket ? pocket.name : getRandomOf(defaultNames),
    color: pocket ? pocket.color : '',
    icon: pocket ? pocket.icon : emoji.random().emoji
  } as PocketSettings)

  const handleConfirm = () => {
    onConfirm(settings, id)
    setRoute(route.pocketList())
  }

  return (
    <div id="pocket-detail">
      <PopupHeader>
        <h1>{id === undefined ? 'New' : 'Edit'} Pocket</h1>
      </PopupHeader>
      <FlexParent as='section'>
        <FlexPocketIcon icon={settings.icon} flex={1} />
        <input
          type="text"
          value={settings.name}
          onChange={(e) => updateSettings('name', e.target.value)}
          placeholder="Pocket Name"
        />
      </FlexParent>
      <section className="picker">
        <ColorPicker
          color={settings.color as Color}
          onChangeComplete={
            (colorResult) =>
              updateSettings('color', colorResult.hex)}
          triangle={'hide'}
        />
        <EmojiPicker
          perLine={7}
          set='twitter'
          showPreview={false}
          onSelect={(em) => updateSettings('icon', em.id ? em.id : '')}
        />
      </section>
      <nav>
        <div
          className="cancel"
          onClick={() => setRoute(route.pocketList())}
        >
          &lt;--
        </div>
        <div className="confirm" onClick={handleConfirm}>--&gt;</div>
      </nav>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PocketSettingsComponent)

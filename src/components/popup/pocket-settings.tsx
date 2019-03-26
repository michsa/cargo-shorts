import 'emoji-mart/css/emoji-mart.css'
import { Picker, EmojiData } from 'emoji-mart'
import React, { useState } from 'react'
import { Color, TwitterPicker } from 'react-color'
import { connect } from 'react-redux'

import { newPocket, updatePocketSettings } from '../../redux/actions/ui'
import { getPocketById } from '../../redux/selectors/pocket'
import { Pocket, PocketID, PocketListRoute, PocketSettings, State } from '../../types'
import { getRandomOf } from '../../utils'
import { FlexParent, FlexChild } from '../shared/flexbox'
import PocketIcon from '../shared/pocket-icon'

import { route, useSettings } from './hooks'
import PopupHeader from './popup-header'

// --- interfaces --- //

interface OwnProps {
  id?: PocketID,
  setRoute: (route: PocketListRoute) => void
}

interface StateProps { pocket?: Pocket }

interface Handlers { onConfirm: (pocket: PocketSettings, id?: PocketID) => void }

type ActivePicker = 'icon' | 'color'

// --- redux mappings --- //

const mapStateToProps = (state: State, { id }: OwnProps) => ({
  pocket: id !== undefined ? getPocketById(state, id) : undefined
} as StateProps)

const mapDispatchToProps = {
  onConfirm: (settings: PocketSettings, id?: PocketID) =>
    id !== undefined
      ? updatePocketSettings({ id, settings })
      : newPocket(settings)
} as Handlers

// --- default settings --- //

const defaultNames = [
  "Memes", "Cat photos", "Weird YouTube videos", "Articles", "Stuff",
  "Job listings", "Things"
]

const emojis = [
  ':sunglasses:', ':joy:', ':ok_hand:', ':muscle:', ':strawberry:',
  ':pumpkin:', ':mage:', ':sparkles:', ':sun-with-face:', ':rainbow:',
  ':floppy_disk:', ':phone:', ':candle:', ':books:', ':briefcase:',
  ':shopping_trolley:', ':100:', ':nerd_face:', ':wink:', ':scream:',
  ':heart_eyes:', ':grimacing:', ':japanese_goblin:', ':ghost:', 
  ':alien:', ':space_invader:', ':merperson:', ':shrug:', ':dancers:',
  ':pray:', ':sparkling_heart:', ':sweat_drops:', ':peach:', ':socks:',
  ':eggplant:', ':high_heel:', ':crown:', ':lipstick:', ':lizard:', 
  ':camel:', ':hatching_chick:', ':pig:', ':sheep:', ':unicorn_face:',
  ':dragon:', ':squid:', ':snail:', ':tulip:', ':palm_tree:', ':whale:', 
  ':mushroom:', ':pizza:', ':camera:', ':selfie:', ':joystick:', ':tada:'
]

const colors = [
  "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4",
  "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107",
  "#ff9800", "#ff5722", "#795548"
]

// --- component --- //

const PocketSettingsComponent = ({
  id, setRoute, pocket, onConfirm
}: OwnProps & StateProps & Handlers) => {

  const [settings, updateSettings] = useSettings({
    name: pocket ? pocket.name : getRandomOf(defaultNames),
    color: pocket ? pocket.color : getRandomOf(colors),
    icon: pocket ? pocket.icon : getRandomOf(emojis)
  } as PocketSettings)

  const handleConfirm = () => {
    onConfirm(settings, id)
    setRoute(route.pocketList())
  }

  const [activePicker, setPicker] = useState('icon' as ActivePicker)

  return (
    <div id="pocket-settings">
      <PopupHeader>
        <FlexParent justifyContent="space-between" as="nav" alignItems="baseline">
          <FlexChild className="button" flex={0} onClick={() => setRoute(route.pocketList())}>
            Cancel
          </FlexChild>
          <FlexChild flex={1} as="h1" className="title">
            {id === undefined ? 'New' : 'Edit'} Pocket
          </FlexChild>
          <FlexChild className="button" flex={0} onClick={handleConfirm}>
            Save
          </FlexChild>
        </FlexParent>
      </PopupHeader>

      <FlexParent className="inputs" as="section" alignItems="center">
        <FlexChild flex={0} onClick={() => setPicker('icon')}>
          <PocketIcon icon={settings.icon} />
        </FlexChild>
        <FlexChild flex={1}>
          <input
            type="text"
            value={settings.name}
            onChange={(e) => updateSettings('name', e.target.value)}
            placeholder="Memes"
          />
        </FlexChild>
        <FlexChild flex={1} className="color" onClick={() => setPicker('color')} />
      </FlexParent>
      <section className="pickers">{
        activePicker === 'color'
          ? <TwitterPicker
            color={settings.color as Color}
            colors={colors}
            onChangeComplete={
              (colorResult) =>
                updateSettings('color', colorResult.hex)}
            triangle={'hide'}
          />
          : <Picker
            native={true}
            emoji=":eye-in-speech-bubble:"
            title="Pick an icon!"
            emojiSize={18}
            perLine={8}
            exclude={['recent']}
            onSelect={
              (emoji: EmojiData) =>
                updateSettings('icon', emoji.colons || '')}
          />
      }</section>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PocketSettingsComponent)

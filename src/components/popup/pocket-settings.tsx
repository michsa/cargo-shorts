import Color from 'color'
import { Emoji, EmojiData, Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState } from 'react'
import { TwitterPicker } from 'react-color'
import { connect } from 'react-redux'

import { deletePocket, newPocket, updatePocketSettings } from '../../redux/actions/ui'
import { getPocketById } from '../../redux/selectors/pocket'
import styled from '../../styled-components'
import { Pocket, PocketID, PocketListRoute, PocketSettings, State } from '../../types'
import { getRandomOf } from '../../utils'
import { FlexCenter, FlexChild, FlexParent } from '../shared/flexbox'
import PocketIcon from '../shared/pocket-icon'
import { Button } from '../shared/utils'

import { route, useSettings } from './hooks'
import PopupHeader from './popup-header'

// --- interfaces --- //

interface OwnProps {
  id?: PocketID,
  setRoute: (route: PocketListRoute) => void
}

interface StateProps { pocket?: Pocket }

interface Handlers {
  onConfirm: (pocket: PocketSettings, id?: PocketID) => void,
  onDelete: (id: PocketID) => void
}

type ActivePicker = 'icon' | 'color'

// --- redux mappings --- //

const mapStateToProps = (state: State, { id }: OwnProps) => ({
  pocket: id !== undefined ? getPocketById(state, id) : undefined
} as StateProps)

const mapDispatchToProps = {
  onConfirm: (settings: PocketSettings, id?: PocketID) =>
    id !== undefined
      ? updatePocketSettings({ id, settings })
      : newPocket(settings),
  onDelete: (id: PocketID) => deletePocket(id)
} as Handlers

// --- default settings --- //

const defaultNames = [
  "Memes", "Cat photos", "Weird YouTube videos", "Articles", "Stuff",
  "Job listings", "Things", "Recipes", "Insurance quotes", "Blogs",
  "Totally legal downloads", "Let's plays", "Inspirational quotes",
  "Possible ARGs", "Vacation pics", "Reaction GIFs", "Computer parts",
  "Groceries", "Free apps", "Flash games", "Podcasts", "Webcomics",
  "Food porn", "Books", "Tutorials", "TED talks", "Research papers"
]

const emojis = [
  ':sunglasses:', ':joy:', ':ok_hand:', ':muscle:', ':strawberry:',
  ':pumpkin:', ':mage:', ':sparkles:', ':sun_with_face:', ':rainbow:',
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

const Inputs = styled(FlexCenter) <{ color: string }>`
  background-color: ${props => props.color};
  * {
    color: ${props =>
    Color(props.color).isDark() !== props.theme.isDark
      ? props.theme.altBackgroundColor
      : props.theme.textColor
  };
    border-color: ${props =>
    Color(props.color).isDark() !== props.theme.isDark
      ? props.theme.altBackgroundColor
      : props.theme.textColor
  };
  }
`

// --- component --- //

const PocketSettingsComponent = ({
  id, setRoute, pocket, onConfirm, onDelete
}: OwnProps & StateProps & Handlers) => {

  const [settings, updateSettings] = useSettings({
    name: pocket ? pocket.name : '',
    color: pocket ? pocket.color : getRandomOf(colors),
    icon: pocket ? pocket.icon : getRandomOf(emojis)
  } as PocketSettings)

  const handleConfirm = () => {
    onConfirm(settings, id)
    setRoute(route.pocketList())
  }

  const handleDelete = () => {
    setRoute(route.pocketList())
    return id && onDelete(id)
  }

  const [activePicker, setPicker] = useState('color' as ActivePicker)
  const [placeholder] = useState(getRandomOf(defaultNames) || 'Pocket Name')

  return (
    <div id="pocket-settings">
      <PopupHeader>
        <FlexCenter>
          <h1 className="title">
            {id ? 'Edit' : 'New'} Pocket
          </h1>
        </FlexCenter>
      </PopupHeader>

      <Inputs color={settings.color} className="inputs" as="section">
        <FlexChild className="icon-input" flex={0} onClick={() => setPicker('icon')}>
          <PocketIcon icon={settings.icon} />
        </FlexChild>
        <FlexChild flex={5} className="name-input">
          <input
            type="text"
            autoFocus={true}
            value={settings.name}
            onChange={(e) => updateSettings('name', e.target.value)}
            placeholder={placeholder}
            maxLength={40}
          />
        </FlexChild>
        <FlexChild className="input-color" flex={1} onClick={() => setPicker('color')}>
          <Emoji emoji=":art:" size={16} native={true} />
        </FlexChild>
      </Inputs>

      <FlexParent as="section" className="pickers" justifyContent="center">{
        activePicker === 'color'
          ? <TwitterPicker
            color={settings.color}
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
      }</FlexParent>

      <FlexParent
        className="nav-buttons"
        justifyContent="space-between"
        as="nav"
        alignItems="center"
      >
        <FlexChild flex={1}>
          <Button icon=":x:" onClick={() => setRoute(route.pocketList())}>
            Cancel
          </Button>
        </FlexChild>
        <FlexChild flex="0 1 16px" />
        {id &&
          <React.Fragment>
            <FlexChild flex={1} className="delete-button">
              <Button icon=":wastebasket:" onClick={handleDelete} />
            </FlexChild>
            <FlexChild flex="0 1 16px" />
          </React.Fragment>
        }
        <FlexChild flex={1}>
          <Button icon=":heavy_check_mark:" onClick={handleConfirm}>
            Save
          </Button>
        </FlexChild>
      </FlexParent>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PocketSettingsComponent)

import Color from 'color'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState } from 'react'
import { TwitterPicker } from 'react-color'
import { connect } from 'react-redux'

import { pocketDefaults as defaults } from '../../constants'
import { deletePocket, newPocket, updatePocketSettings } from '../../redux/actions/ui'
import { getPocketById } from '../../redux/selectors/pocket'
import styled from '../../styled-components'
import { Pocket, PocketID, PocketListRoute, PocketSettings, State } from '../../types'
import { getRandomOf } from '../../utils'
import { IconButton } from '../shared/button'
import { Emoji, Picker } from '../shared/emoji'
import { FlexCenter, FlexChild, FlexParent } from '../shared/flexbox'
import PocketIcon from '../shared/pocket-icon'

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
    color: pocket ? pocket.color : getRandomOf(defaults.color),
    icon: pocket ? pocket.icon : getRandomOf(defaults.icon)
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
  const [placeholder] = useState(getRandomOf(defaults.name) || 'Pocket Name')

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
          <Emoji emoji=":art:" size={16} />
        </FlexChild>
      </Inputs>

      <FlexParent as="section" className="pickers" justifyContent="center">{
        activePicker === 'color'
          ? <TwitterPicker
            color={settings.color}
            colors={defaults.color}
            onChangeComplete={
              (colorResult) =>
                updateSettings('color', colorResult.hex)}
            triangle={'hide'}
          />
          : <Picker
            onSelect={(emoji) =>
              updateSettings('icon', emoji.colons || '')
            }
          />
      }</FlexParent>

      <FlexParent
        className="nav-buttons"
        justifyContent="space-between"
        as="nav"
        alignItems="center"
      >
        <FlexChild flex={1}>
          <IconButton icon=":x:" onClick={() => setRoute(route.pocketList())}>
            Cancel
          </IconButton>
        </FlexChild>
        <FlexChild flex="0 1 16px" />
        {id &&
          <React.Fragment>
            <FlexChild flex={1} className="delete-button">
              <IconButton icon=":wastebasket:" onClick={handleDelete} />
            </FlexChild>
            <FlexChild flex="0 1 16px" />
          </React.Fragment>
        }
        <FlexChild flex={1}>
          <IconButton icon=":heavy_check_mark:" onClick={handleConfirm}>
            Save
          </IconButton>
        </FlexChild>
      </FlexParent>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PocketSettingsComponent)

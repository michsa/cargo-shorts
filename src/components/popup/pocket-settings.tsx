import Color from 'color'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState } from 'react'
import { TwitterPicker } from 'react-color'
import { connect } from 'react-redux'
import { Flex } from 'reflexbox'

import { pocketDefaults as defaults } from '../../constants'
import {
  deletePocket,
  newPocket,
  updatePocketSettings
} from '../../redux/actions/ui'
import { getPocketById } from '../../redux/selectors/pocket'
import styled from '../../styled-components'
import {
  Args,
  Pocket,
  PocketID,
  PocketListRoute,
  PocketSettings,
  State
} from '../../types'
import { getRandomOf } from '../../utils'
import { IconButton } from '../shared/button'
import { Emoji, Picker } from '../shared/emoji'
import PocketIcon from '../shared/pocket-icon'
import { Triangle } from '../shared/triangle'

import { route, useSettings } from './hooks'
import PopupHeader from './popup-header'

// --- interfaces --- //

interface OwnProps {
  id?: PocketID
  setRoute: (route: PocketListRoute) => void
}

interface StateProps {
  pocket?: Pocket
}

interface Handlers {
  onConfirm: (pocket: PocketSettings, id?: PocketID) => void
  onDelete: (id: PocketID) => void
}

type ActivePicker = 'icon' | 'color'

// --- redux mappings --- //

const mapStateToProps = (state: State, { id }: OwnProps) =>
  ({
    pocket: id !== undefined ? getPocketById(state, id) : undefined
  } as StateProps)

const mapDispatchToProps = {
  onConfirm: (settings: PocketSettings, id?: PocketID) =>
    id !== undefined
      ? updatePocketSettings({ id, settings })
      : newPocket(settings),
  onDelete: (id: PocketID) => deletePocket(id)
} as Handlers

const Inputs = styled(Flex)<{ color: string }>`
  background-color: ${props => props.color};
  * {
    color: ${props =>
      Color(props.color).isDark() !== props.theme.isDark
        ? props.theme.altBackgroundColor
        : props.theme.textColor};
    border-color: ${props =>
      Color(props.color).isDark() !== props.theme.isDark
        ? props.theme.altBackgroundColor
        : props.theme.textColor};
    &::placeholder {
      color: ${props =>
        Color(
          Color(props.color).isDark() !== props.theme.isDark
            ? props.theme.altBackgroundColor
            : props.theme.textColor
        )
          .alpha(0.5)
          .string()};
    }
  }
`

const PickerPlaceholder = () => (
  <div style={{ position: 'relative', width: '100%' }}>
    <div style={{ position: 'absolute', top: '32%', left: '12%' }}>
      pick an icon
    </div>
    <div style={{ position: 'absolute', top: '8%', left: '24%' }}>
      give it a name
    </div>
    <div style={{ position: 'absolute', top: '28%', right: '12%' }}>
      choose a color
    </div>
  </div>
)

// --- component --- //

const PocketSettingsComponent = ({
  id,
  setRoute,
  pocket,
  onConfirm,
  onDelete
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

  const nameInput = React.createRef<HTMLInputElement>()
  const callAndRefocus = <T extends Function, never>(
    fn: T,
    ...args: Args<T>
  ) => {
    if (nameInput.current) {
      nameInput.current.focus()
    }
    return fn(...args)
  }

  const [activePicker, setPicker] = useState('color' as ActivePicker)
  const [placeholder] = useState(getRandomOf(defaults.name) || 'Pocket Name')

  return (
    <div id="pocket-settings">
      <PopupHeader>
        <Flex justifyContent="center" alignItems="center">
          <h1 className="title">{id ? 'Edit' : 'New'} Pocket</h1>
        </Flex>
      </PopupHeader>

      <Inputs color={settings.color} className="inputs" as="section">
        <Flex className="icon-input" flex={0} onClick={() => setPicker('icon')}>
          <PocketIcon icon={settings.icon} />
        </Flex>
        <Flex flex={5} className="name-input">
          <input
            type="text"
            ref={nameInput}
            autoFocus={true}
            value={settings.name}
            onChange={e => updateSettings('name', e.target.value)}
            placeholder={placeholder}
            maxLength={40}
          />
        </Flex>
        <Flex
          className="input-color"
          flex={0}
          onClick={() => callAndRefocus(setPicker, 'color')}
        >
          <Emoji emoji="🎨" size={19} />
        </Flex>
      </Inputs>

      <Flex className="pickers" justifyContent="center" flexWrap="wrap">
        {activePicker === 'color' ? (
          <React.Fragment>
            <Triangle side="right" margin={6} />
            <TwitterPicker
              color={settings.color}
              colors={defaults.color}
              triangle="hide"
              onChangeComplete={colorResult =>
                callAndRefocus(updateSettings, 'color', colorResult.hex)
              }
            />
          </React.Fragment>
        ) : activePicker === 'icon' ? (
          <React.Fragment>
            <Triangle margin={4} width={9} />
            <Picker
              onSelect={emoji =>
                callAndRefocus(updateSettings, 'icon', emoji.native)
              }
            />
          </React.Fragment>
        ) : (
          <PickerPlaceholder />
        )}
      </Flex>

      <Flex
        className="nav-buttons"
        justifyContent="space-between"
        as="nav"
        alignItems="center"
      >
        <Flex flex={1}>
          <IconButton icon="🙅" onClick={() => setRoute(route.pocketList())}>
            Cancel
          </IconButton>
        </Flex>
        <Flex flex="0 1 16px" />
        {id && (
          <React.Fragment>
            <Flex flex={0} className="delete-button">
              <IconButton icon="🗑️" onClick={handleDelete} />
            </Flex>
            <Flex flex="0 1 16px" />
          </React.Fragment>
        )}
        <Flex flex={1}>
          <IconButton icon="👌" onClick={handleConfirm}>
            Save
          </IconButton>
        </Flex>
      </Flex>
    </div>
  )
}

// 🙅
// ❌

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PocketSettingsComponent)

/** @jsx jsx */
import { jsx } from '@emotion/core'
import Color from 'color'
import 'emoji-mart/css/emoji-mart.css'
import { createRef, Fragment, useState } from 'react'
import { TwitterPicker } from 'react-color'
import { connect } from 'react-redux'

import { pocketDefaults as defaults } from '../../constants'
import {
  deletePocket,
  newPocket,
  updatePocketSettings
} from '../../redux/actions/ui'
import { getPocketById } from '../../redux/selectors/pocket'
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
import Flex from '../shared/flex'
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

const PickerPlaceholder = () => (
  <div css={{ position: 'relative', width: '100%' }}>
    <div css={{ position: 'absolute', top: '32%', left: '12%' }}>
      pick an icon
    </div>
    <div css={{ position: 'absolute', top: '8%', left: '24%' }}>
      give it a name
    </div>
    <div css={{ position: 'absolute', top: '28%', right: '12%' }}>
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

  const nameInput = createRef<HTMLInputElement>()
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
      <PopupHeader css={{ padding: '12px 16px' }}>
        <Flex justifyContent="center" alignItems="center">
          <h1 className="title">{id ? 'Edit' : 'New'} Pocket</h1>
        </Flex>
      </PopupHeader>

      <Flex
        center
        className="inputs"
        css={theme => ({
          backgroundColor: settings.color,
          margin: '12px 8px',
          padding: '0 8px',
          height: 40,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.3)',
          '*': {
            color:
              Color(settings.color).isDark() !== theme.isDark
                ? theme.colors.altBackground
                : theme.colors.text,
            borderColor:
              Color(settings.color).isDark() !== theme.isDark
                ? theme.colors.altBackground
                : theme.colors.text,
            '&::placeholder': {
              color: Color(
                Color(settings.color).isDark() !== theme.isDark
                  ? theme.colors.altBackground
                  : theme.colors.text
              )
                .alpha(0.5)
                .string()
            }
          }
        })}
      >
        <Flex
          css={{
            borderBottomStyle: 'dotted',
            borderBottomWidth: 2,
            cursor: 'pointer',
            height: 24,
            display: 'flex',
            alignItems: 'center'
          }}
          className="icon-input"
          flex={0}
          onClick={() => setPicker('icon')}
        >
          <PocketIcon icon={settings.icon} />
        </Flex>
        <Flex
          flex={5}
          className="name-input"
          css={{
            margin: '0 6px',
            borderBottomStyle: 'dotted',
            borderBottomWidth: 2,
            height: 24,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <input
            type="text"
            ref={nameInput}
            autoFocus={true}
            value={settings.name}
            onChange={e => updateSettings('name', e.target.value)}
            placeholder={placeholder}
            maxLength={40}
            css={{
              fontFamily: 'Catamaran", sans-serif',
              width: '100%',
              padding: 2,
              fontSize: '1.2em',
              fontWeight: 600,
              border: 0,
              outline: 0,
              backgroundColor: 'transparent'
            }}
          />
        </Flex>
        <Flex
          className="input-color"
          css={{ padding: '0px 4px', cursor: 'pointer' }}
          flex={0}
          onClick={() => callAndRefocus(setPicker, 'color')}
        >
          <Emoji emoji="🎨" size={19} />
        </Flex>
      </Flex>

      <Flex
        className="pickers"
        justifyContent="center"
        wrap
        css={{
          height: 258,
          position: 'relative',
          width: 276,
          margin: '0 auto'
        }}
      >
        {activePicker === 'color' ? (
          <Fragment>
            <Triangle side="right" margin={6} />
            <TwitterPicker
              color={settings.color}
              colors={defaults.color}
              triangle="hide"
              onChangeComplete={colorResult =>
                callAndRefocus(updateSettings, 'color', colorResult.hex)
              }
            />
          </Fragment>
        ) : activePicker === 'icon' ? (
          <Fragment>
            <Triangle margin={4} width={9} />
            <Picker
              onSelect={emoji =>
                callAndRefocus(updateSettings, 'icon', emoji.native)
              }
            />
          </Fragment>
        ) : (
          <PickerPlaceholder />
        )}
      </Flex>

      <Flex
        className="nav-buttons"
        justifyContent="space-between"
        as="nav"
        alignItems="center"
        css={{
          margin: '16px 8px 12px',
          '& > button': {
            borderStyle: 'solid',
            width: '100%',
            height: 36
          }
        }}
      >
        <Flex flex={1}>
          <IconButton icon="🙅" onClick={() => setRoute(route.pocketList())}>
            Cancel
          </IconButton>
        </Flex>
        <Flex flex="0 1 16px" />
        {id && (
          <Fragment>
            <Flex
              flex={0}
              className="delete-button"
              css={{
                borderColor: '#F44336',
                ':hover': { backgroundColor: '#FF5722' }
              }}
            >
              <IconButton icon="🗑️" onClick={handleDelete} />
            </Flex>
            <Flex flex="0 1 16px" />
          </Fragment>
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

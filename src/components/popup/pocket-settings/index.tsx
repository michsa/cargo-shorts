/** @jsx jsx */
import { jsx } from '@emotion/core'

import 'emoji-mart/css/emoji-mart.css'
import { createRef, Fragment, useState } from 'react'
import { TwitterPicker } from 'react-color'
import { connect } from 'react-redux'

import { pocketDefaults as defaults } from '../../../constants'
import {
  deletePocket,
  newPocket,
  updatePocketSettings
} from '../../../redux/actions/ui'
import { getPocketById } from '../../../redux/selectors/pocket'
import {
  Pocket,
  PocketID,
  PocketListRoute,
  PocketSettings,
  State
} from '../../../types'
import { getRandomOf } from '../../../utils'
import { IconButton } from '../../shared/button'
import { Picker } from '../../shared/emoji'
import Flex from '../../shared/flex'
import { Triangle } from '../../shared/triangle'

import { route, useSettings } from '../hooks'
import PopupHeader from '../popup-header'

import Inputs from './inputs'
import PickerPlaceholder from './picker-placeholder'

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

export type ActivePicker = 'icon' | 'color'

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
  const refocus = (): void => {
    if (nameInput.current) {
      nameInput.current.focus()
    }
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

      <Inputs
        {...{ settings, updateSettings, setPicker, placeholder, nameInput }}
      />

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
              onChangeComplete={colorResult => {
                refocus()
                updateSettings('color', colorResult.hex)
              }}
            />
          </Fragment>
        ) : activePicker === 'icon' ? (
          <Fragment>
            <Triangle margin={4} width={9} />
            <Picker
              onSelect={emoji => {
                refocus()
                updateSettings('icon', emoji.native)
              }}
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

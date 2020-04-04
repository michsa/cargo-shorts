/** @jsx jsx */
import { jsx } from '@emotion/core'
import { createRef, useState } from 'react'
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
import Flex from '../../shared/flex'
import { route, useSettings } from '../hooks'
import PopupHeader from '../popup-header'
import Inputs from './inputs'
import NavButtons from './nav-buttons'
import Pickers from './pickers'

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
    id && onDelete(id)
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
    <Flex column id="pocket-settings">
      <PopupHeader>
        <Flex justifyContent="center" alignItems="center">
          <h1
            css={{
              fontSize: 17,
              fontWeight: 700,
              padding: 0,
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: 1
            }}
          >
            {id ? 'Edit' : 'New'} Pocket
          </h1>
        </Flex>
      </PopupHeader>
      <Inputs
        {...{ settings, updateSettings, setPicker, placeholder, nameInput }}
      />
      <Pickers {...{ activePicker, settings, updateSettings, refocus }} />
      <NavButtons {...{ setRoute, id, handleDelete, handleConfirm }} />
    </Flex>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PocketSettingsComponent)

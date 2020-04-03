/** @jsx jsx */
import { jsx } from '@emotion/core'
import 'emoji-mart/css/emoji-mart.css'
import { Fragment } from 'react'
import { TwitterPicker } from 'react-color'

import { PocketSettings, Pocket } from '../../../types'
import { pocketDefaults as defaults } from '../../../constants'
import { Picker } from '../../shared/emoji'
import Flex from '../../shared/flex'
import { Triangle } from '../../shared/triangle'

import { ActivePicker } from '.'
import PickerPlaceholder from './picker-placeholder'

interface Props {
  settings: PocketSettings
  updateSettings: <K extends 'name' | 'color' | 'icon'>(
    key: K,
    value: Pick<Pocket, 'name' | 'color' | 'icon'>[K]
  ) => void
  activePicker: ActivePicker
  refocus: () => void
}

const Pickers = ({
  activePicker,
  settings,
  updateSettings,
  refocus
}: Props) => (
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
)

export default Pickers

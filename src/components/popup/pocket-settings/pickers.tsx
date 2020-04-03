/** @jsx jsx */
import { jsx } from '@emotion/core'
import 'emoji-mart/css/emoji-mart.css'
import { Fragment } from 'react'
import { SliderPicker, CirclePicker } from 'react-color'

import { pocketDefaults as defaults } from '../../../constants'
import { PocketSettings, Pocket } from '../../../types'
import { Picker as EmojiPicker } from '../../shared/emoji'
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
        <CirclePicker
          color={settings.color}
          colors={defaults.color}
          //triangle="hide"
          css={{ width: 276 }}
          onChangeComplete={colorResult => {
            refocus()
            updateSettings('color', colorResult.hex)
            console.log('change complete', colorResult)
          }}
          circleSize={24}
          circleSpacing={8}
        />
        <SliderPicker
          color={settings.color}
          //colors={defaults.color}
          //triangle="hide"
          css={{ width: 276 }}
          onChangeComplete={colorResult => {
            refocus()
            updateSettings('color', colorResult.hex)
            console.log('change complete', colorResult)
          }}
        />
      </Fragment>
    ) : activePicker === 'icon' ? (
      <Fragment>
        <Triangle margin={4} width={9} />
        <EmojiPicker
          onSelect={emoji => {
            refocus()
            updateSettings('icon', emoji)
            console.log('updated: ', emoji)
          }}
        />
      </Fragment>
    ) : (
      <PickerPlaceholder />
    )}
  </Flex>
)

export default Pickers

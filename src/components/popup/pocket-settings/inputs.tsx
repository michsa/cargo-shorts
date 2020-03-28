/** @jsx jsx */
import { jsx } from '@emotion/core'
import Color from 'color'
import { RefObject, Dispatch, SetStateAction } from 'react'

import { Pocket, PocketSettings } from '../../../types'

import { Emoji } from '../../shared/emoji'
import Flex from '../../shared/flex'
import PocketIcon from '../../shared/pocket-icon'

import { ActivePicker } from '.'

interface Props {
  settings: PocketSettings
  updateSettings: <K extends 'name' | 'color' | 'icon'>(
    key: K,
    value: Pick<Pocket, 'name' | 'color' | 'icon'>[K]
  ) => void
  nameInput: RefObject<HTMLInputElement>
  placeholder: string
  setPicker: Dispatch<SetStateAction<ActivePicker>>
}

const Inputs = ({
  settings,
  updateSettings,
  nameInput,
  placeholder,
  setPicker
}: Props) => (
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
          fontFamily: 'Catamaran, sans-serif',
          width: '100%',
          padding: 2,
          fontSize: '1.1em',
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
      onClick={() => setPicker('color')}
    >
      <Emoji emoji="🎨" size={19} />
    </Flex>
  </Flex>
)

export default Inputs

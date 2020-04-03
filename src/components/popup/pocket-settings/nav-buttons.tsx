/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'

import { PocketID, PocketListRoute } from '../../../types'
import { IconButton } from '../../shared/button'
import Flex from '../../shared/flex'
import { route } from '../hooks'

interface Props {
  id?: PocketID
  setRoute: (route: PocketListRoute) => void
  handleConfirm: () => void
  handleDelete: () => void
}

const NavButtons = ({ setRoute, id, handleDelete, handleConfirm }: Props) => (
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
)

// 🙅
// ❌

export default NavButtons

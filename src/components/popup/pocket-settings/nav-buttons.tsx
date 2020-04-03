/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'

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

const DeleteButton = styled(IconButton)({
  borderColor: '#F44336',
  ':hover': { backgroundColor: '#FF5722' }
})

const NavButtons = ({ setRoute, id, handleDelete, handleConfirm }: Props) => (
  <Flex
    className="nav-buttons"
    justifyContent="stretch"
    alignItems="center"
    gap={8}
    css={{
      margin: '16px 8px 12px',
      button: { borderStyle: 'solid' }
    }}
  >
    <IconButton flex={1} icon="🙅" onClick={() => setRoute(route.pocketList())}>
      Cancel
    </IconButton>
    {id && (
      <DeleteButton
        // className="delete-button"
        flex={0}
        icon="🗑️"
        onClick={handleDelete}
      />
    )}
    <IconButton flex={1} icon="👌" onClick={handleConfirm}>
      Save
    </IconButton>
  </Flex>
)

// 🙅
// ❌

export default NavButtons

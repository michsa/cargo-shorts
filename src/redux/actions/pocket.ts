import { action } from 'typesafe-actions'

import { Pocket } from '../../types'

export const newPocket =
  (pocket: Pocket) => action('NEW_POCKET', pocket)

export const removePocket =
  (pocket: Pocket) => action('REMOVE_POCKET', pocket)

export const modifyPocket =
  (pocket: Pocket) => action('MODIFY_POCKET', pocket)

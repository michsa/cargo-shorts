import { camelToKebab, pairToStyle, createStyleCreatorFromAllowedProps, flexboxKeys } from '../src/components/shared/flexbox'

describe('UI Actions', () => {
  it('camelToKebab', () => {
    expect(camelToKebab('justifyContent')).toEqual('justify-content')
    expect(camelToKebab('nochange')).toEqual('nochange')
    expect(camelToKebab('Capital')).toEqual('-capital')
  })

  it('pairToStyle', () => {
    expect(pairToStyle(['justifyContent', 'flex-start'])).toEqual(
      'justify-content: flex-start'
    )
  })

  it('createStyleCreatorFromAllowedProps', () => {
    console.log(createStyleCreatorFromAllowedProps(flexboxKeys)({ flex: 1 })({ justifyContent: 'center' }))
  })
})

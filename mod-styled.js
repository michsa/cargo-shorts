export const parser = 'tsx' //'@typescript-eslint/parser'

export default function transformer(file, api) {
  console.log(api)
  const j = api.jscodeshift
  const root = j(file.source)

  root.find(j.ImportDeclaration).forEach(p => {
    p.value.source.value = p.value.source.value.replace(
      'styled-components',
      'styled'
    )
  })

  return root.toSource()
}

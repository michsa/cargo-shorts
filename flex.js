export const parser = 'tsx' //'@typescript-eslint/parser'

const fancyFilter = (filter, data) => {
  if (typeof filter === 'object' && filter.test) {
    return filter.test(data)
  }
  if (typeof filter === 'string') {
    return data === filter
  }
  if (Array.isArray(filter)) {
    return filter.includes(data)
  }
}

// Press ctrl+space for code completion
export default function transformer(file, api) {
  console.log(api)
  const j = api.jscodeshift
  const root = j(file.source)

  const renameTo = name => p => {
    p.value.openingElement.name.name = name
    if (p.value.closingElement) p.value.closingElement.name.name = name
  }

  const byName = name => p =>
    fancyFilter(name, p.value.openingElement.name.name)

  const addAttributes = (newAttrs, { overwrite } = {}) => p => {
    const attributes = p.value.openingElement.attributes
    const props = attributes.reduce(
      (acc, x) => ({ ...acc, [x.name.name]: x }),
      {}
    )
    Object.entries(newAttrs).forEach(([k, v]) => {
      if (Object.keys(props).includes(k)) {
        console.log('found prop:', k, props[k])
        if (overwrite) props[k].value.value = v
      } else {
        console.log('not found:', k)
        attributes.push(j.jsxAttribute(j.jsxIdentifier(k), j.literal(v)))
      }
    })
    console.log(newAttrs, props)
  }

  root
    .findJSXElements()
    .filter(byName(/Flex(Parent|Child)/))
    .forEach(renameTo('Flex'))

  root
    .findJSXElements('FlexCenter')
    .forEach(addAttributes({ justifyContent: 'center', alignItems: 'center' }))
    .forEach(renameTo('Flex'))

  root
    .find(j.ImportDeclaration)
    .filter(p => fancyFilter(/\/flexbox/, p.value.source.value))
    .forEach(p => {
      p.value.source.value = 'reflexbox'
      p.value.specifiers = [
        j.importSpecifier(j.identifier('Flex'), j.identifier('Flex'))
      ]
    })

  return root.toSource()
}

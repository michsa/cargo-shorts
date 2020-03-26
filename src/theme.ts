export interface Theme {
  isDark: boolean
  backgroundColor: string
  altBackgroundColor: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  accentColor: string
}

const theme: Theme = {
  isDark: false,
  backgroundColor: '#FFFFFF',
  altBackgroundColor: '#FAFAFA',
  primaryColor: '#00ACEA', // sky blue
  secondaryColor: '#00EFD1', // cyan
  textColor: '#083863', // navy
  accentColor: '#FEDB41' // yellow
}

export default theme

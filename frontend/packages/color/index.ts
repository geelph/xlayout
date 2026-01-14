import { themeColor, generateTailwindColorByColor } from './src/theme'

export { themeColor, generateTailwindColorByColor }
function generateCssColorVariables(colors: TailWindColor) {
  let cssVariables = ''
  for (const [colorName, colorShades] of Object.entries(colors)) {
    for (const [shade, value] of Object.entries(colorShades)) {
      cssVariables += `--color-${colorName}${shade === 'DEFAULT' ? '' : '-' + shade}: ${value};\n`
    }
  }

  return cssVariables
}

function generateCssColorVariablesByKey(colors: ThemeColor, key: ThemeColorKey) {
  const primaryColor: Recordable = {}
  for (const [shade] of Object.entries(colors[key])) {
    primaryColor[shade] = `var(--color-${key}${shade === 'DEFAULT' ? '' : '-' + shade})`
  }

  return primaryColor
}

export const themeColorCssVariables = generateCssColorVariables(themeColor)

export const unocssPrimaryColor = generateCssColorVariablesByKey(themeColor, 'primary')

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'no-restricted-syntax': [
        'warn',
        {
          selector: "Literal[value=/\u2014/]",
          message: 'No em dashes in visible strings. Use a comma, colon, or rewrite the sentence.',
        },
        {
          selector: "TemplateLiteral",
          message: 'Check template literals for em dashes (\u2014) before committing.',
        },
      ],
    },
  },
])

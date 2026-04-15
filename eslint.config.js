

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import remotion from '@remotion/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwindcss from 'eslint-plugin-tailwindcss'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['**/dist', '**/.eslintrc.cjs']
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'prettier'
    )
  ),
  {
    plugins: {
      react,
      prettier,
      remotion,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      tailwindcss,
      'unused-imports': unusedImports
    },
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parser: tsParser
    },
    settings: {
      'import/extensions': ['.js', '.jsx', '.tsx', '.ts'],
      'import/resolver': {
        typescript: {}
      },
      tailwindcss: {
        cssConfigPath: path.join(__dirname, 'src/index.css')
      }
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          printWidth: 100,
          trailingComma: 'none',
          arrowParens: 'avoid',
          endOfLine: 'auto',
          plugins: ['prettier-plugin-tailwindcss']
        }
      ],
      'react/jsx-sort-props': [
        'error',
        {
          reservedFirst: true,
          shorthandFirst: true,
          callbacksLast: true,
          ignoreCase: true,
          multiline: 'last',
          noSortAlphabetically: false
        }
      ],
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true
        }
      ],
      'simple-import-sort/imports': 'error',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-var-requires': 'off',
      'unused-imports/no-unused-imports': 'error',
      'import/no-unresolved': 'off',
      'import/no-relative-parent-imports': 'off',
      'comma-spacing': 'warn',
      quotes: ['warn', 'single'],
      indent: [
        'error',
        2,
        {
          SwitchCase: 1
        }
      ],
      'key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true
        }
      ],
      'no-console': [
        'error',
        {
          allow: ['log', 'warn', 'error']
        }
      ],
      'no-unused-vars': ['off'],
      'no-inner-declarations': 'off',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 2,
          maxEOF: 1,
          maxBOF: 0
        }
      ],
      'no-trailing-spaces': 'warn',
      'object-curly-spacing': ['warn', 'always'],
      'array-bracket-spacing': ['warn', 'never'],
      'space-before-blocks': 'warn',
      'space-infix-ops': 'warn',
      'space-before-function-paren': [
        'warn',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always'
        }
      ],
      'padded-blocks': ['warn', 'never'],
      'eol-last': ['warn', 'always'],
      'keyword-spacing': [
        'warn',
        {
          before: true,
          after: true
        }
      ],
      'arrow-spacing': 'warn',
      'id-denylist': ['warn', 'require'],
      'space-in-parens': ['warn', 'never']
    }
  }
]


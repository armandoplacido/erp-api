// @ts-check
import eslint from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import neostandard from 'neostandard'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'coverage/**', 'node_modules/**'],
  },

  // 1) Base: recomendadas do ESLint + typescript-eslint com checagem de tipos
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // 2) Standard (equivalente ao que a Rocketseat usava), sem regras de estilo:
  //    a formatação fica com o Prettier
  ...neostandard({ ts: true, noStyle: true }),

  // 3) Regras do projeto
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.vitest },
      parserOptions: {
        projectService: {
          // Arquivos de config fora do tsconfig.json
          allowDefaultProject: ['vitest.config.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-console': 'warn',
    },
  },

  // 4) Prettier por último; as opções ficam no .prettierrc.json
  prettierRecommended,
)

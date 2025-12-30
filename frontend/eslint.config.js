import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	globalIgnores(['dist', 'node_modules']),

	{
		files: ['**/*.{js,jsx}'],

		extends: [
			js.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
			// ⚠️ pas de plugin:prettier/recommended ici
		],

		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},

		rules: {
			// ton ancienne règle
			'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
		},
	},
]);

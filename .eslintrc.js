module.exports = {
    env: {
        es6: true,
    },
    extends: ['airbnb', 'prettier', 'prettier/react'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': 2,
        'react/jsx-filename-extension': [
            'warn',
            {
                extensions: ['.jsx', 'js'],
            },
        ],
        'import/prefer-default-export': 'off',
    },
};

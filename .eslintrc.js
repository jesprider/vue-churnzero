const config = {
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    globals: {
        ChurnZero: true,
    },
    extends: [
        'airbnb-base',
        'plugin:prettier/recommended',
    ],
    plugins: [
        'jest',
    ],
    rules: {
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'no-underscore-dangle': ['error', {
            allow: [
                '__vueChurnZero__',
            ]
        }],
        'no-param-reassign': ['error', {
            ignorePropertyModificationsFor: [
                'Vue',
            ],
        }],
        'prettier/prettier': ['error', {
            'trailingComma': 'es5',
            'singleQuote': true,
            'tabWidth': 4,
        }],
    }
};

module.exports = config;

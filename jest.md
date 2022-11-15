yarn add jest @types/jest ts-jest -D
yarn jest --init

Configurar no jest.config
bail: true,
testMatch: ['**/*.spec.ts'],
preset: 'ts-jest',

package.json
"lint": "next lint",
"test": "jest",
"testwatch": "jest --watch",
"test:nowatch": "jest --watchAll=false",
"test:coverage": "jest --watchAll=false --coverage",
"prepare": "husky install"

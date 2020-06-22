# To up and run Web3 with react-native

react-native init APPNAME
npm i --save react-native-crypto
npm i --save react-native-randombytes
react-native link react-native-randombytes
npm i --save-dev rn-nodeify@latest
./node_modules/.bin/rn-nodeify --install
npm i --save node-libs-browser

# modify APPNAME/metro.config.js to read:

const extraNodeModules = require('node-libs-browser');

module.exports = {
  resolver: {
    extraNodeModules,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};

# modify shim.js to read:


if (typeof __dirname === 'undefined') global.__dirname = '/'
if (typeof __filename === 'undefined') global.__filename = ''
if (typeof process === 'undefined') {
  global.process = require('process')
} else {
  const bProcess = require('process')
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p]
    }
  }
}

process.browser = false
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer

if (typeof location === 'undefined') global.location = { port: 80, protocol: 'https:' }
const isDev = typeof __DEV__ === 'boolean' && __DEV__
process.env['NODE_ENV'] = isDev ? 'development' : 'production'
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : ''
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
require('crypto')

# import './shim' in App.js at top
# npm i --save web3
#react-native run-android


'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./sovra.cjs.production.min.js')
} else {
  module.exports = require('./sovra.cjs.development.js')
}

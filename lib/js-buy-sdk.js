'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _shopifyBuy = require('shopify-buy');

var _shopifyBuy2 = _interopRequireDefault(_shopifyBuy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.fetch = _nodeFetch2.default;

const client = _shopifyBuy2.default.buildClient({
  storefrontAccessToken: '12e0b3951e63ae04a6bf73993342dc75',
  domain: 'gridprints.myshopify.com'
});

exports.default = client;
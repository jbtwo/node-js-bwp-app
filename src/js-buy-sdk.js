import fetch from 'node-fetch';
import Client from 'shopify-buy';

global.fetch = fetch;

const client = Client.buildClient({
	storefrontAccessToken: '12e0b3951e63ae04a6bf73993342dc75',
  	domain: 'gridprints.myshopify.com'
});

export default client;

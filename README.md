# node-js-buy
An example using [js-buy-sdk](https://github.com/Shopify/js-buy-sdk) built with Node, Express and Pug taken from Shopify's [storefront-api-examples](https://github.com/Shopify/storefront-api-examples) repo. It's running on Google Cloud, and rendering content from my Shopify store [BigWallPrints.com](https://bigwallprints.com).

## Changes made to run on Google Cloud

* Added all dependencies to `package.json`
* Added `app.yaml` file
* Changed `src/app.js` to listen on port 8080
* Added brand logo
* Changed stylesheet directory, updated `src/app.js` accordingly

## Customizations made to app

* Changed header image to match brand
* Added brand logo
* Added h3 text
* Added backgrounds to make text legible

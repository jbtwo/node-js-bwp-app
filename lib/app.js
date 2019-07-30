'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsBuySdk = require('./js-buy-sdk');

var _jsBuySdk2 = _interopRequireDefault(_jsBuySdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
const shopPromise = _jsBuySdk2.default.shop.fetchInfo();
const productsPromise = _jsBuySdk2.default.product.fetchAll();

app.set('view engine', 'pug');

app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use(_express2.default.static('public'));

app.get('/', (req, res) => {
  const checkoutId = req.query.checkoutId;

  // Create a checkout if it doesn't exist yet
  if (!checkoutId) {
    return _jsBuySdk2.default.checkout.create().then(checkout => {
      res.redirect(`/?checkoutId=${checkout.id}`);
    });
  }

  // Fetch the checkout
  const cartPromise = _jsBuySdk2.default.checkout.fetch(checkoutId);

  return Promise.all([productsPromise, cartPromise, shopPromise]).then(([products, cart, shop]) => {
    res.render('index', {
      products,
      cart,
      shop,
      isCartOpen: req.query.cart
    });
  });
});

app.post('/add_line_item/:id', (req, res) => {
  const options = req.body;
  const productId = req.params.id;
  const checkoutId = options.checkoutId;
  const quantity = parseInt(options.quantity, 10);

  delete options.quantity;
  delete options.checkoutId;

  return productsPromise.then(products => {
    const targetProduct = products.find(product => {
      return product.id === productId;
    });

    // Find the corresponding variant
    const selectedVariant = _jsBuySdk2.default.product.helpers.variantForOptions(targetProduct, options);

    // Add the variant to our cart
    _jsBuySdk2.default.checkout.addLineItems(checkoutId, [{ variantId: selectedVariant.id, quantity }]).then(checkout => {
      res.redirect(`/?cart=true&checkoutId=${checkout.id}`);
    }).catch(err => {
      return err;
    });
  });
});

app.post('/remove_line_item/:id', (req, res) => {
  const checkoutId = req.body.checkoutId;

  return _jsBuySdk2.default.checkout.removeLineItems(checkoutId, [req.params.id]).then(checkout => {
    res.redirect(`/?cart=true&checkoutId=${checkout.id}`);
  });
});

app.post('/decrement_line_item/:id', (req, res) => {
  const checkoutId = req.body.checkoutId;
  const quantity = parseInt(req.body.currentQuantity, 10) - 1;

  return _jsBuySdk2.default.checkout.updateLineItems(checkoutId, [{ id: req.params.id, quantity }]).then(checkout => {
    res.redirect(`/?cart=true&checkoutId=${checkout.id}`);
  });
});

app.post('/increment_line_item/:id', (req, res) => {
  const checkoutId = req.body.checkoutId;
  const quantity = parseInt(req.body.currentQuantity, 10) + 1;

  return _jsBuySdk2.default.checkout.updateLineItems(checkoutId, [{ id: req.params.id, quantity }]).then(checkout => {
    res.redirect(`/?cart=true&checkoutId=${checkout.id}`);
  });
});

app.listen(4200, () => {
  console.log('Example app listening on port 4200!'); // eslint-disable-line no-console
});
module.exports = (app) => {

    const menu = require('../controllers/menu.js');
    const user = require('../controllers/user.js');
    const store = require('../controllers/store.js');
    const order = require('../controllers/order.js');

    //User 
    app.get('/get_pizza_menu', menu.getPizzas)
    app.post('/check_email_exists', user.checkAccountExists)
    app.post('/login', user.login)
    app.post('/register', user.register)

    //Store
    app.post('/find_nearest_stores', store.findNearestStores)
    app.post('/set_order_delivery_type', order.updateCollectionType)

    //order
    app.post('/init_order', order.initOrder)
    app.post('/update_collection_type', order.updateCollectionType)
    app.post('/random_max_price_order', order.randomMaxPriceOrder)
    app.post('/clear_order_items', order.clearOrderItems)


}
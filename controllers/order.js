var hellPizza = require('/Users/gabriel/Desktop/hell_pizza_npm')
var async = require('async')
const error_codes = {
    missing_param: "Missing parameter: "
}
module.exports = {

    initOrder(req, res) {
        hellPizza.Order.initOrder(req.body.order_type_id, req.body.store_id, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },

    clearOrderItems(req, res) {
        if (!req.body.token)
            return res.status(401).send({ error: error_codes.missing_param + 'order_token' })

        hellPizza.Order.getOrder(req.body.token, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            if (response.items.length === 0)
                return res.status(200).send({ response: response });

            var responses = []
            var errors = []
            var items = response.items
            for (var i = 0; i < items.length; i++) {
                hellPizza.Order.removeItem(req.body.token, items[i].order_item_id, function (err, response) {
                    err ? errors.push(err) : responses.push(response)

                    if (responses.length + errors.length === items.length)  //got a response for every call
                        return res.status(200).send({ response: response, errors: errors });
                })
            }
        })
    },

    updateCollectionType(req, res) {
        hellPizza.Order.updateCollectionType(req.body.token, req.body.order_id, req.body.type, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },

    updateCollectionTime(req, res) {
        hellPizza.Order.updateCollectionTime(req.body.token, req.body.order_id, req.body.time, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },

    updateStoreId(req, res) {
        hellPizza.Order.updateStoreId(req.body.order_token, req.body.order_id, req.body.store_id, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },

    addItemToOrder(req, res) {
        hellPizza.Order.addItem(req.body.order_token, req.body.item_id, req.body.item_size_id, req.body.item_quantity, req.body.modifiers, req.body.notes, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
    removeItemFromOrder(req, res) {
        hellPizza.Order.removeItem(req.body.order_token, req.body.order_item_id, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },

    getOrder(req, res) {
        hellPizza.Order.getOrder(req.body.order_token, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },

    randomMaxPriceOrder(req, res) {
        if (!req.body.max_price)
            return res.status(401).send({ error: error_codes.missing_param + 'max_price' })

        if (!req.body.token)
            return res.status(401).send({ error: error_codes.missing_param + 'token' })

        if (!req.body.store_id)
            return res.status(401).send({ error: error_codes.missing_param + 'store_id' })

        var store_id = req.body.store_id

        loadInMenus(store_id, function (err, menus) {
            if (err) return res.status(500).send({ error: err })

            var errors = []
            hellPizza.Order.getOrder(req.body.token, function (err, response) {
                if (err) return res.status(500).send({ error: err })

                evaluateNext(null, response)
            })

            function evaluateNext(err, response) {
                if (err) {
                    errors.push(err)
                    var random_menu = Math.floor(Math.random() * menus.length)
                    var selected_menu = menus[random_menu]
                    return addRandomItemToOrder(req.body.token, selected_menu, evaluateNext)
                } //if it fails to add (eg. due to out of stock on item) should continue.

                if (response.total_price < req.body.max_price) {
                    var random_menu = Math.floor(Math.random() * menus.length) //rand between 0 and 4
                    var selected_menu = menus[random_menu]
                    return addRandomItemToOrder(req.body.token, selected_menu, evaluateNext)
                }
                return res.status(200).send({ order: response, errors: errors })
            }
        })
    },
}

function addRandomItemToOrder(order_token, selected_menu, callback) {
    var rnd = Math.floor(Math.random() * selected_menu.items.length)
    var random_item = selected_menu.items[rnd]

    var random_size_num = Math.floor(Math.random() * random_item.sizes.length)
    var random_size = random_item.sizes[random_size_num]

    hellPizza.Order.addItem(order_token, random_item.item_id, random_size.item_size_id, 200, {}, "", function (err, response) {
        if (err) return callback(err)

        return callback(null, response)
    })
}

function loadInMenus(store_id, callback) {
    
    async.parallel([
        function (callback) {
            hellPizza.Menu.getPizzas(store_id, function (err, response) {
                callback(err, response)
            })
        },
        function (callback) {
            hellPizza.Menu.getSides(store_id, function (err, response) {
                callback(err, response)
            })
        },
        function (callback) {
            hellPizza.Menu.getDesserts(store_id, function (err, response) {
                callback(err, response)
            })
        },
        function (callback) {
            hellPizza.Menu.getSalads(store_id, function (err, response) {

                callback(err, response)
            })
        },
        function (callback) {
            hellPizza.Menu.getSoftDrinks(store_id, function (err, response) {
                callback(err, response)
            })
        }
    ], function (err, menus) {

        return callback(err, menus)
    })
}
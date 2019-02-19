var hellPizza = require('/Users/gabriel/Desktop/hell_pizza_npm')

module.exports = {

    getPizzas(req, res) {
        hellPizza.Menu.getPizzas(req.body.store_id, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
    getSoftDrinks(req, res) {
        hellPizza.Menu.getSoftDrinks(req.body.store_id, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
    getSides(req, res) {
        hellPizza.Menu.getSides(req.body.store_id, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
    getDesserts(req, res) {
        hellPizza.Menu.getDesserts(req.body.store_id, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
    getSalads(req, res) {
        hellPizza.Menu.getSalads(req.body.store_id, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
}
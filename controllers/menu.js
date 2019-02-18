var hellPizza = require('/Users/gabriel/Desktop/hell_pizza_npm')

module.exports = {

    getPizzas(req, res) {
        hellPizza.Menu.getPizzas(function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
    getSoftDrinks(req, res) {
        hellPizza.Menu.getSoftDrinks(function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
    getSides(req, res) {
        hellPizza.Menu.getSides(function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
    getDesserts(req, res) {
        hellPizza.Menu.getDesserts(function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
    getSalads(req, res) {
        hellPizza.Menu.getSalads(function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
}
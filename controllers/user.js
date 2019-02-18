var hellPizza = require('/Users/gabriel/Desktop/hell_pizza_npm')

module.exports = {

    checkAccountExists(req, res) {
        hellPizza.User.checkAccountExists(req.body.email, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    },
    login(req, res) {
        hellPizza.User.login(req.body.email, req.body.password, function (err, response) {
            if (err) return res.status(500).send({ error: err })
            //token is sent back, token is required to 
            return res.status(200).send({ response: response });
        })
    },
    register(req, res) {
        hellPizza.User.register(req.body.email, req.body.first_name, req.body.password, req.body.phone_number, function (err, response) {
            if (err) return res.status(500).send({ error: err })

            return res.status(200).send({ response: response });
        })
    }
}
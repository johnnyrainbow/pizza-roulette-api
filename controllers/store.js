var hellPizza = require('/Users/gabriel/Desktop/hell_pizza_npm')

module.exports = {

    findNearestStores(req, res) {
        hellPizza.User.findAddress(req.body.address, function (err, response) {
            if (err) return res.status(500).send({ error: err })
            var address_response = response[0] //just take the first location in arr 

            hellPizza.Store.getServiceableStores(address_response.location_hash, function (err, response) {
                if (err) return res.status(500).send({ error: err })

                return res.status(200).send({ response: response });
            })
        })
    },
}
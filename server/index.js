const express = require('express');
const path = require('path');
const rp = require('request-promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public', 'dist')));


app.route('/Kyle-service/bundle.js')
    .get((req, res) => {
        rp('http://localhost:3001/bundle.js')
        .then((body) => res.send(body))
        .catch(() => res.sendStatus(404))
    });

app.route('/api/listings/:Listing_id')
    .get((req, res) => {
        console.log(req.params);
        rp(`http://localhost:3001/api/listings/${req.params.Listing_id}`)
        .then((body) => res.send(body))
        .catch(() => res.sendStatus(500))
    }) 

app.listen(PORT, () => console.log(`...proxy listening on PORT ${PORT}`));

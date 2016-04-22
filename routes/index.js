var express = require('express');
var router = express.Router();
var ImageModel = require('../models/image');
//var googleImages = require('google-images');
//var cseid = process.env.CSEID;
var apikey = process.env.APIKEY;
//var client = googleImages(cseid, apikey);
var search = require('bing.search');

/* GET latest query */
router.get('/latest', function(req, res) {
    res.json( ImageModel.find({}).limit(1).sort({ created_at: -1 }) );
});

/* GET query to search. */
router.get('/:name', function(req, res) {
    var name = req.params.name;
    var page = req.query.offset || 1;
    var skip = (page === 1) ? 0 : page * 10;

    console.log(name, page, skip)
    if (Number(page) === 1) {
        var entry = new ImageModel({ name: name });

        entry.save(function(err, doc) {
            if (err) {
                return res.status(400).json({ error: err });
            }
        });
    }

    var newSearch = new search(apikey);
    newSearch.images(name, {top: 10, skip: skip}, function(err, results) {
        res.json(results);
    });

});

module.exports = router;

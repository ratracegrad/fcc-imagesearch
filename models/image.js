'use strict';

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    name: {
        type:       String,
        unique:     true,
        required:   true
    },
    created_at: {
        type:       Date,
        default:    Date.now
    }
});

module.exports = mongoose.model('Image', imageSchema);

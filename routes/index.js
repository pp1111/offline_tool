'use strict'

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

const q = require('q');
const Analytics = require('../models/analytics');

let api = {
    get: {
        list: (req, res, next) => q.async(function* () {
            yield mongoose.connect(`mongodb://localhost/${req.get('host')}`);
            let users = yield Analytics.find({});
            yield mongoose.disconnect();
            res.send(users);
        })().catch(next).done(),
        user: (req, res, next) => q.async(function* () {
            yield mongoose.connect(`mongodb://localhost/${req.get('host')}`);
            let user = yield Analytics.findOne({ cid: req.params.cid });
            yield mongoose.disconnect();
            res.send(user);
        })().catch(next).done(),
    },

    edit: {
        user: (req, res, next) => q.async(function* () {
            yield mongoose.connect(`mongodb://localhost/${req.get('host')}`);
            let cid = req.params.cid;
            let user = req.body;
            yield Analytics.update(
                { cid: cid },
                { 
                    $set: { 
                        v: req.body.v,
                        t: req.body.t,
                        tid: req.body.tid,
                    }
                },
                { multi: true }
            )

            yield mongoose.disconnect();
        })().catch(next).done(),
    },

    post: {
        adWords: (req, res, next) => q.async(function* () {
            res.end('adWords');
        })().catch(next).done(),
        doubleClick: (req, res, next) => q.async(function* () {

        })().catch(next).done(),
        analytics: (req, res, next) => q.async(function* () {
            res.end('analytics');
        })().catch(next).done(),
        remote: (req, res, next) => q.async(function* () {
            yield mongoose.connect(`mongodb://localhost/${req.get('host')}`);
            let user = {
                gclid: req.body.gclid || null,
                cid: req.body._ga,
                tcid: req.body.transactionId,
            };

            yield Analytics.create(user);
            yield mongoose.disconnect();
            res.status(204);
        })().catch(next).done(),
    }
}

/* GET home page. */
router.get('/', (req, res, next) => {
    res.sendfile('./views/main.html');
});

router.get('/users', api.get.list);
router.get('/users/:cid', api.get.user);

router.put('/users/:cid', api.edit.user);

router.post('/adWords', api.post.adWords);
router.post('/doubleClick', api.post.doubleClick);
router.post('/analytics', api.post.analytics);
router.post('/ids', api.post.remote);


module.exports = router;

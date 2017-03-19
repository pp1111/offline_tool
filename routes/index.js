'use strict'

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect(`mongodb://localhost/localhost:3000`);
const q = require('q');
const Analytics = require('../models/analytics');
const AdWords = require('../models/adWords');
const DoubleClick = require('../models/doubleClick');

let api = {
    analytics: {
        getList: (req, res, next) => q.async(function* () {
            let users = yield Analytics.find({});
            res.send(users);
        })().catch(next).done(),
        get: (req, res, next) => q.async(function* () {
            let user = yield Analytics.findOne({ cid: req.params.cid });
            res.send(user);
        })().catch(next).done(),
        post: (req, res, next) => q.async(function* () {

        })().catch(next).done(),
        put: (req, res, next) => q.async(function* () {
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

        })().catch(next).done(),
    },
    adWords: {
        getList : (req, res, next) => q.async(function* () {
            let users = yield AdWords.find({});
            res.send(users);
        })().catch(next).done(),
        get : (req, res, next) => q.async(function* () {
            let user = yield AdWords.findOne({ cid: req.params.cid });
            res.send(user);
        })().catch(next).done(),
        post : (req, res, next) => q.async(function* () {
        
        })().catch(next).done(),
        put: (req, res, next) => q.async(function* () {
            let cid = req.params.cid;
            let user = req.body;
            yield AdWords.update(
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

        })().catch(next).done(),
    },
    doubleClick: {
        getList : (req, res, next) => q.async(function* () {
            let users = yield DoubleClick.find({});
            res.send(users);
        })().catch(next).done(),
        get : (req, res, next) => q.async(function* () {
            let user = yield DoubleClick.findOne({ cid: req.params.cid });
            res.send(user);
        })().catch(next).done(),
        post : (req, res, next) => q.async(function* () {
        
        })().catch(next).done(),
        put: (req, res, next) => q.async(function* () {
            let cid = req.params.cid;
            let user = req.body;
            yield DoubleClick.update(
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

        })().catch(next).done(),
    },

    post: {
        remote: (req, res, next) => q.async(function* () {
            let user = {
                gclid: req.body.gclid || null,
                cid: req.body._ga.substring(6),
                tcid: req.body.transactionId,
                utm_source: req.body.utm_source,
                utm_medium: req.body.utm_medium,
                utm_campaign: req.body.utm_campaign,
            };

            yield Analytics.create(user);
            yield AdWords.create(user);
            yield DoubleClick.create(user);

            res.status(204);
        })().catch(next).done(),
        doubleClick: (req, res, next) => q.async(function* () {

        })().catch(next).done(),
    }
}

/* GET home page. */

router.get('/analytics', api.analytics.getList);
router.get('/analytics/:cid', api.analytics.get);
router.post('/analytics', api.analytics.post);
router.put('/analytics/:cid', api.analytics.put);

router.get('/adWords', api.adWords.getList);
router.get('/adWords/:cid', api.adWords.get);
router.post('/adWords', api.adWords.post);
router.put('/adWords/:cid', api.adWords.put);

router.get('/doubleClick', api.doubleClick.getList);
router.get('/doubleClick/:cid', api.doubleClick.get);
router.post('/doubleClick', api.doubleClick.post);
router.put('/doubleClick/:cid', api.doubleClick.put);

router.post('/ids', api.post.remote);

router.get('/', (req, res, next) => {
    res.sendfile('./views/main.html');
});


module.exports = router;

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
const querystring = require('querystring');

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

    get: {
        remote: (req, res, next) => q.async(function* () {
            console.log(req.query);
            let user = {
                gclid: req.query.gclid || null,
                cid: req.query._ga.substring(6),
                tcid: req.query.tcid,
                utm_source: req.query.utm_source,
                utm_medium: req.query.utm_medium,
                utm_campaign: req.query.utm_campaign,
            };

            yield Analytics.create(user);

            res.status(200).end();
        })().catch(err => console.log(err)).done(),
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

router.get('/tracking/:tracking_data', api.get.remote);

router.get('/', (req, res, next) => {
    res.sendfile('./views/main.html');
});


module.exports = router;

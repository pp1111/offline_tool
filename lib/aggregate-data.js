'use strict'

const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect(`mongodb://localhost/localhost:3000`);
const q = require('q');
const Analytics = require('../models/analytics');

q.async(function* () {
    let applications = yield Analytics.find();
    let applicationMap = new Map();

    applications = applications.map(application => { 
        let ip = application.tcid.split('_')[0];
        let date = application.tcid.split('_')[1].split('T')[0];
        let time = application.tcid.split('_')[1].split('T')[1];

        return {
            cid: application.cid,
            gclid: application.gclid,
            ip: ip,
            date: date,
            time: time,
        }
    });

    console.log(JSON.stringify(applications, false, 4));

})().done();    
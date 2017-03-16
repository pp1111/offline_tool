'use strict'

const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect(`mongodb://localhost/localhost:3000`);
const Analytics = require('../models/analytics');

const q = require('q');

const fs = require('fs');
const request = require('request');
const https = require('https');

const credentials = {
    user: 'witbee',
    accessKey: 'UXFmYmQzYk5MWWg5MGEzMWdrUGhtUjAz',
}
const auth = "Basic " + new Buffer(credentials.user + ":" + credentials.accessKey).toString("base64");

const moment = require('moment');

const getContent = function(options) {
    return new Promise((resolve, reject) => {
      const request = https.get(options, (response) => {
          let body = '';
          response.on('data', (chunk) => body += chunk);
          response.on('end', () => resolve(body));
      });
      request.on('error', (err) => reject(err))
    })
};

let dateFrom = moment().subtract(3, 'days').endOf('day').toString();
let dateTo = moment().subtract(1, 'days').endOf('day').toString();

q.async(function* () {
    let applicationsDb = yield Analytics.find({
        created: {
            $gte: dateFrom,
            $lte: dateTo,
        }
    });
    let applicationMap = new Map();

    applicationsDb = applicationsDb.map(application => { 
        let ip = application.tcid.split('_')[0];
        let date = application.tcid.split('_')[1].split('T')[0];
        let time = application.tcid.split('_')[1].split('T')[1];

        return {
            cid: application.cid,
            gclid: application.gclid,
            ip: ip,
            date: date,
            time: time,
            state: "clicked"
        }
    });

    let options = {
        host: 'apiv2.systempartnerski.pl',
        path: '/partner-api/token',
        headers: {
            "Authorization" : auth
        } 
    }

    const getToken = yield getContent(options);
    const token = JSON.parse(getToken).token;

    let bankierDate = new Date(dateTo).toJSON().substring(0,10);
    options = {
        host: 'apiv2.systempartnerski.pl',
        path: `/partner-api/wnioski?status_wniosku_id=PTW&data_zmiany_statusu=${bankierDate}`,
        headers: {
            "X-Auth-Token": token
        } 
    }

    const results = yield getContent(options);
    const applications = JSON.parse(results);

    const tcids = applications.wniosek.map(application => {
        let tcid = `${application.adres_ip}_${application.data_otwarcia}`
        tcid = tcid.replace(" ", "T");
        tcid = tcid.slice(0, tcid.length - 6);

        let ip = tcid.split('_')[0];
        let date = tcid.split('_')[1].split('T')[0];
        let time = tcid.split('_')[1].split('T')[1];

        return {
            ip: ip,
            date: date,
            time: time
        }
    });

    console.log(tcids);
    applicationsDb.forEach(application => {
        tcids.forEach(tcid => {
            if (application.ip == tcid.ip) {
                console.log(`hey ${application.ip} ${application.time}`);
            }
        })
    })

    yield mongoose.disconnect();

})().done();


function timeSlip (time) {
    let hours = parseInt(time.split(":")[0]);
    let minutes = parseInt(time.split(":")[1]);
    let seconds = parseInt(time.split(":")[2]);

    seconds += 5;
    if (seconds >= 60) {
        seconds -= 60;
        minutes += 1;
        if (minutes >= 60) {
            minutes -= 60;
            hours += 1;
            if (hours >= 24) {
                hours -= 24;
            }
        }
    }

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${hours}:${minutes}:${seconds}`
}

console.log(timeSlip('23:59:55'));
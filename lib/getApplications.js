'use strict';

const fs = require('fs');
const request = require('request');
const https = require('https');
const credentials = {
	user: 'witbee',
	accessKey: 'UXFmYmQzYk5MWWg5MGEzMWdrUGhtUjAz',
}
const auth = "Basic " + new Buffer(credentials.user + ":" + credentials.accessKey).toString("base64");
const q = require('q');

const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect(`mongodb://localhost/localhost:3000`);

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

q.async(function *() {
  let options = {
    host: 'apiv2.systempartnerski.pl',
    path: '/partner-api/token',
    headers: {
        "Authorization" : auth
    } 
  }

  const getToken = yield getContent(options);
  const token = JSON.parse(getToken).token;

  options = {
    host: 'apiv2.systempartnerski.pl',
    path: '/partner-api/wnioski',
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
    return tcid;
  });

  const ipMap = tcids.map(tcid => {
    let obj = {};

    obj[tcid.split("_")[0]] = tcid.split("_")[1];
    return obj;
  })
  console.log(ipMap);
  yield mongoose.disconnect();
})().done();

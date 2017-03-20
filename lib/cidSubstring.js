'use strict'

const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect(`mongodb://localhost/localhost:3000`);
const Analytics = require('../models/analytics');

const q = require('q');

q.async(function* () {

	let applicationsDb = yield Analytics.find({});

	applicationsDb.map(application => {
		if (application.cid.substring(0,6) == "GA1.2.") {
			application.cid = application.cid.substring(6);
		}

		return application;
	})

	for (let application of applicationsDb) {
		yield Analytics.update({_id: application._id}, { $set: {cid: application.cid}});
	}

	yield mongoose.disconnect();

})().done();
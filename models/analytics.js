'use strict';

const mongoose = require('mongoose');
const timestampsPlugin = require('../lib/timestamps-plugin');

let AnalyticsSchema = new mongoose.Schema(
    {
        gclid: { type: String, required: false },
        cid: { type: String, required: true },
        tcid: { type: String, required: true },
        v: { type: String, required: false },
        t: { type: String, required: false },
        tid: { type: String, required: false },
    }, { collection: 'analytics' }
);

AnalyticsSchema.plugin(timestampsPlugin, { createdAt: 'created', updatedAt: 'modified' });

let user = mongoose.model('user', AnalyticsSchema);

AnalyticsSchema.statics.create = function (userIds) {
    const user = new User({
        gclid: userIds.gclid,
        cid: userIds.cid,
        tcid: userIds.transactionId,
    });

    return user.save();
};

module.exports = user;
'use strict';

const mongoose = require('mongoose');
const timestampsPlugin = require('../lib/timestamps-plugin');

let AdWordsSchema = new mongoose.Schema(
    {
        gclid: { type: String, required: false },
        cid: { type: String, required: true },
        tcid: { type: String, required: true },
        conversationName: { type: String, required: false },
        conversationValue: { type: String, required: false },
        conversationCurrency: { type: String, required: false },
        conversationTime: { type: String, required: false },
    }, { collection: 'adWords' }
);

AdWordsSchema.plugin(timestampsPlugin, { createdAt: 'created', updatedAt: 'modified' });

let user = mongoose.model('analytics', AdWordsSchema);

AdWordsSchema.statics.create = function (userIds) {
    const user = new User({
        gclid: userIds.gclid,
        cid: userIds.cid,
        tcid: userIds.transactionId,
    });

    return user.save();
};

module.exports = user;
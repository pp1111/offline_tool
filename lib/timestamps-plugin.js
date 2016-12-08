'use strict';

function timestampsPlugin (schema, options) {
    var createdAt = (options && options.createdAt) ? options.createdAt : 'createdAt',
        updatedAt = (options && options.updatedAt) ? options.updatedAt : 'updatedAt',
        schemaAdditions = {};

    schemaAdditions[createdAt] = Date;
    schemaAdditions[updatedAt] = Date;

    schema.add(schemaAdditions);

    schema.pre('save', function(next) {
      var now = new Date();

      if (!this[createdAt] && !this.ignoreTimestamps) {
        this[createdAt] = now;
      }

      if (!this.ignoreTimestamps) {
          this[updatedAt] = now;
      }

      next();
    });

    var genUpdates = function() {
      var now = new Date();
      var updates = {$set: {}, $setOnInsert: {}};
      updates.$set[updatedAt] = now;
      updates.$setOnInsert[createdAt] = now;

      return updates;
    };

    schema.pre('findOneAndUpdate', function(next) {
        if (!this.options.ignoreTimestamps) {
            this.findOneAndUpdate({}, genUpdates());
        }
      next();
    });

    schema.pre('update', function(next) {
        if (!this.options.ignoreTimestamps) {
            this.update({}, genUpdates());
        }
      next();
    });
}

module.exports = exports = timestampsPlugin;
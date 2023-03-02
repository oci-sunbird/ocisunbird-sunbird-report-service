const _ = require('lodash');
var debug = require('debug')('parameters:$state');

const { locationSearch } = require("../../helpers/learnerHelper");

module.exports = {
    name: '$state',
    value: (user) => _.get(_.find(_.get(user, 'userLocations') || _.get(user, 'profileLocation'), ['type', 'state']), 'name'),
    cache: true,
    async masterData({ user, req }) {
        try {
            const body = { "request": { 'filters': { 'type': 'state' } } };
            const response = await locationSearch({ body });
            const result = response.data;
            return _.map(_.get(result, 'result.response') || [], 'name');
        } catch (error) {
            debug(`$state masterData fetch failed`, JSON.stringify(error));
            return [];
        }
    }
}
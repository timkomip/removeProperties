if (typeof require !== 'undefined') {
    var _ = require('underscore');
}

function removeProperties(obj, props) {
    var cleanObj;
    if (_.intersection(_.keys(obj), props).length) {
        cleanObj = _.omit(obj, props);
    } else {
        cleanObj = obj;
    }

    for (var p in cleanObj) {
        if (!_.isString(cleanObj[p])) {
            cleanObj[p] = removeProperties(cleanObj[p], props);
        }
    }

    return cleanObj;
} 

if (module) {
    module.exports = removeProperties;
}

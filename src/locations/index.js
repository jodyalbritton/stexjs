const request = require('request')
const rp = require('request-promise')


/**
 * Gets a list of locations.
 *
 * @param {Object} client - Client object previously instantiated
 * @param {string} capability - The capability to filter by; if not specified,
 *  all locations will be returned.
 * @param {string} url - The URL to make the request to. Used to handle paging;
 *  calling clients should not need to specify this.
 * @param {Array} locationsAccum - An accumulator for recursive API calls to
 *  handle paged result sets. Calling clients should not need to specify this.
 * @returns {Object} - The request-promise for this API request.
 */
function getLocationsFunction(client, url, locationsAccum) {
    let options = {
        method: 'GET',
        url: client.url + "locations",
        headers: client.headers,
        json: true
    }
    

    return rp(options)
    .then(response => {
        if (!locationsAccum) {
            locationsAccum = []
        }
        locationsAccum = locationsAccum.concat(response.items)
        if (response._links) {
            return getLocations(options, response._links.next.href, locationsAccum)
        }
        return locationsAccum
        })
        .catch(function(err) {
        console.log(`Error getting locations: ${err}`)
    })
}

/**
 * Gets a list of locations.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} locationId - The selected Location ID
 * @returns {Object} - The request-promise for this API request.
 */
function showLocationFunction(client, locationId) {
    let options = {
        method: 'GET',
        url: client.url + "locations/"+locationId,
        headers: client.headers,
        json: true
    }

    return rp(options)
}



export {getLocationsFunction, showLocationFunction}
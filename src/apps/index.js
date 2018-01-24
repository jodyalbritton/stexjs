const request = require('request')
const rp = require('request-promise')



/**
 * Gets a list of apps.
 *
 * @param {Object} client - Client object previously instantiated
 * @param {string} capability - The capability to filter by; if not specified,
 *  all apps will be returned.
 * @param {string} url - The URL to make the request to. Used to handle paging;
 *  calling clients should not need to specify this.
 * @param {Array} appsAccum - An accumulator for recursive API calls to
 *  handle paged result sets. Calling clients should not need to specify this.
 * @returns {Object} - The request-promise for this API request.
 */
export function list(client, url, appsAccum) {
    let options = {
        method: 'GET',
        url: client.url + "apps",
        headers: client.headers,
        json: true
    }
    

    return rp(options)
    .then(response => {
        if (!appsAccum) {
            appsAccum = []
        }
        appsAccum = appsAccum.concat(response.items)
        if (response._links.next) {
            return list(options, response._links.next.href, appsAccum)
        }
        return appsAccum
        })
        .catch(function(err) {
        console.log(`Error getting apps: ${err}`)
    })
}



/**
 * Gets one apps.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} appId - The selected App ID
 * @returns {Object} - The request-promise for this API request.
 */
export function show(client, appId) {
    let options = {
        method: 'GET',
        url: client.url + "apps/"+appId,
        headers: client.headers,
        json: true
    }

    return rp(options)
}

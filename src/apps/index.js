const request = require('request')
const rp = require('request-promise')



/**
 * Gets a list of apps.
 *
 * @param {Object} client - Client object previously instantiated
 * 
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


/**
 * Create a webhook smartapp
 * 
 * @param {Object{}} client - Client object previously instantiated 
 * @param {string} appName - A globally unique, developer-defined identifier for an app.
 * @param {string} displayName - A default display name for an app.
 * @param {string} description - A default description for an app.
 * @param {boolean} singleInstance - Inform the installation systems that a particular app can only be installed once within a user's account.
 * @param {string} targetUrl - The callback url for the app
*/


export function createWebhookApp(client, appName, displayName, description, singleInstance, targetUrl) {
    let body = {
        appName: appName, 
        displayName: displayName,
        description: description,
        singleInstance: singleInstance,
        appType: "WEBHOOK_SMART_APP",
        webhookSmartApp: {
            targetUrl
        }
    }
    
    let options = {
        method: 'POST',
        url: client.url + "apps",
        headers: client.headers,
        body: body,
        json: true
    }

    return rp(options)
    .then(response => {
      return response
    })
    .catch(function(err) {
        console.log(`Error installing app: ${err}`)
    })
}


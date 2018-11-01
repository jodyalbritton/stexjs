const request = require('request')
const rp = require('request-promise')


/**
 * Gets a list of scenes.
 *
 * @param {Object} client - Client object previously instantiated
 * @param {string} locationId - The location to filter by; if not specified,
 *  all scenes will be returned.
 * @param {string} url - The URL to make the request to. Used to handle paging;
 *  calling clients should not need to specify this.
 * @param {Array} scenesAccum - An accumulator for recursive API calls to
 *  handle paged result sets. Calling clients should not need to specify this.
 * @returns {Object} - The request-promise for this API request.
 */
export function list(client, url, scenesAccum) {
    let options = {
        method: 'GET',
        url: client.url + "scenes",
        headers: client.headers,
        json: true
    }
    

    return rp(options)
    .then(response => {
        if (!scenesAccum) {
            scenesAccum = []
        }
        scenesAccum = scenesAccum.concat(response.items)
        if (response._links) {
            return getScenes(options, response._links.next.href, scenesAccum)
        }
        return scenesAccum
        })
        .catch(function(err) {
        console.log(`Error getting scenes: ${err}`)
    })
}

 /**
 * Execute Scene
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} sceneId - the selected Device ID
 * @returns {Object} - The request-promise for this API request.
 */

export function executeCommand(client, sceneId){
    let body = {}
    
    let options = {
        method: 'POST',
        url: client.url + "scenes/"+sceneId+"/execute",
        headers: client.headers,
        body: body,
        json: true
    }



    return rp(options)
    .then(response => {
      return response
    })
    .catch(function(err) {
        console.log(`Error executing scene: ${err}`)
    })
 }


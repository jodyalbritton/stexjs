const request = require('request')
const rp = require('request-promise')



/**
 * Gets a list of devices
 *
 * @param {Object} client - Client object previously instantiated
 * @param {string} capability - The capability to filter by; if not specified,
 *  all devices will be returned.
 * @param {string} url - The URL to make the request to. Used to handle paging;
 *  calling clients should not need to specify this.
 * @param {Array} devicesAccum - An accumulator for recursive API calls to
 *  handle paged result sets. Calling clients should not need to specify this.
 * @returns {Object} - The request-promise for this API request.
 */
export function list(client, capability, url, devicesAccum) {
    let options = {
        method: 'GET',
        url: url ? url : client.url + "devices",
        headers: client.headers,
        qs: capability ? {"capability": capability} : {},
        json: true
    }
    console.log(options)

    return rp(options)
    .then(response => {
        if (!devicesAccum) {
            devicesAccum = []
        }
        devicesAccum = devicesAccum.concat(response.items)
        if (response._links.next) {
            return list(options, capability, response._links.next.href, devicesAccum)
        }
        return devicesAccum
    })
    .catch(function(err) {
        console.log(`Error getting devices: ${err}`)
    })
}

/**
 * Gets a list of devices.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} deviceId - The selected Device ID
 * @returns {Object} - The request-promise for this API request.
 */
export function getOne(client, deviceId) {
    let options = {
        method: 'GET',
        url: client.url + "devices/"+deviceId,
        headers: client.headers,
        json: true
    }

    return rp(options)
    .then(response => {
        return response
    })
    .catch(function(err) {
        console.log(`Error getting device: ${err}`)
    })
}


/**
 * Get full status of a device.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} deviceId - the selected Device ID
 * @returns {Object} - The request-promise for this API request.
 */

 export function getFullStatus(client, deviceId){
    let options = {
        method: 'GET',
        url: client.url + "devices/"+deviceId+"/status",
        headers: client.headers,
        json: true
    }

    return rp(options)
    .then(response => {
        return response
    })
    .catch(function(err) {
        console.log(`Error getting device status: ${err}`)
    })
 }


 /**
 * Get component status of a device.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} deviceId - the selected Device ID
 * @param {string} componentId - the slected component ID
 * @returns {Object} - The request-promise for this API request.
 */

export function getComponentStatus(client, deviceId, componentId){
    let options = {
        method: 'GET',
        url: client.url + "devices/"+deviceId+"/components/"+componentId+"/status",
        headers: client.headers,
        json: true
    }

    return rp(options)
    .then(response => {
        return response
    })
    .catch(function(err) {
        console.log(`Error getting device component status: ${err}`)
    })
 }

 /**
 * Get capability status of a device.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} deviceId - the selected Device ID
 * @param {string} componentId - the slected component ID
 * @param {string} capabilityId - the slected capbility ID
 * @returns {Object} - The request-promise for this API request.
 */

export function getCapabilityStatus(client, deviceId, componentId, capabilityId){
    let options = {
        method: 'GET',
        url: client.url + "devices/"+deviceId+"/components/"+componentId+"/capabilities/"+capabilityId+"/status",
        headers: client.headers,
        json: true
    }

    return rp(options)
    .then(response => {
        return response
    })
    .catch(function(err) {
        console.log(`Error getting device capability status: ${err}`)
    })
 }


 /**
 * Execute Commands on a device.
 *
 * @param {Object{}} client - Client object previously instantiated
 * @param {string} deviceId - the selected Device ID
 * @param {string} componentId - the slected component ID
 * @param {string} capabilityId - the slected capbility ID
 * @param {string} command - the slected command
 * @param {Array} args - The command arguments
 * @returns {Object} - The request-promise for this API request.
 */

export function executeCommand(client, deviceId, componentId, capabilityId, command, args){
    let body = {
        commands: [
            {
                component: componentId,
                capability: capabilityId,
                command: command,
                arguments: args
            }
        ]
    }
    
    let options = {
        method: 'POST',
        url: client.url + "devices/"+deviceId+"/commands",
        headers: client.headers,
        body: body,
        json: true
    }



    return rp(options)
    .then(response => {
      return response
    })
    .catch(function(err) {
        console.log(`Error executing command: ${err}`)
    })
 }


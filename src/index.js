import * as device from './devices'
import {getLocationsFunction, showLocationFunction} from './locations'

export class StexClient {
    constructor(access_token) {
        this.access_token = access_token
        this.url = 'https://api.smartthings.com/v1/'
        this.headers = {
            'Authorization' : 'Bearer '+ access_token,
            'Content-type' : 'application/json'
        }
    }

    
     /**
     * Locations
     */
    
    /**
     * Gets a list of locations.
     *
     * @param {string} capability - The capability to filter by; if not specified,
     *  all locations will be returned.
     * @param {Array} locationsAccum - An accumulator for recursive API calls to
     *  handle paged result sets. Calling clients should not need to specify this.
     * 
     * @returns {Object} - The request-promise for this API request.
     */


    listLocations(client, locationsAccum) {
        return getLocationsFunction(client, locationsAccum)
    }

    
    /**
     * Returns a request-promise for the status of the specified locationId.
     *
     * @param {string} deviceId - The ID of the location.
     *
     * @returns {Object} - The request-promise for this API call.
     */
    showLocation(client, locationId) {
        return showLocationFunction(client, locationId)
    }


    /**
     * DEVICES
     */
    
    /**
     * Gets a list of devices.
     *
     * @param {string} capability - The capability to filter by; if not specified,
     *  all devices will be returned.
     * @param {Array} devicesAccum - An accumulator for recursive API calls to
     *  handle paged result sets. Calling clients should not need to specify this.
     * @returns {Object} - The request-promise for this API request.
     */


    listDevices(client, capability,devicesAccum) {
        return device.list(client, capability,devicesAccum)
    }

    
    /**
     * Returns a request-promise for the object of the specified deviceId.
     *
     * @param {string} deviceId - The ID of the device.
     *
     * @returns {Object} - The request-promise for this API call.
     */
    showDevice(client, deviceId) {
        return device.getOne(client, deviceId)
    }


    /**
     * Returns a request-promise for the status of the specified deviceId.
     *
     * @param {string} deviceId - The ID of the device.
     *
     * @returns {Object} - The request-promise for this API call.
     */
    showDeviceFullStatus(client, deviceId) {
        return device.getFullStatus(client, deviceId)
    }


    /**
     * Returns a request-promise for the status of the specified deviceId.
     *
     * @param {string} deviceId - The ID of the device.
     * 
     * @param {string} componentId - The ID of the component 
     *
     * @returns {Object} - The request-promise for this API call.
     */
    showDeviceComponentStatus(client, deviceId, component) {
        return device.getComponentStatus(client, deviceId, component)
    }


    /**
     * Returns a request-promise for the status of the specified deviceId.
     *
     * @param {string} deviceId - The ID of the device.
     * 
     * @param {string} componentId - The ID of the component 
     * 
     * @param {string} capabilityId - The ID of the capability 
     *
     * @returns {Object} - The request-promise for this API call.
     */
    showDeviceCapabilityStatus(client, deviceId, componentId, capabilityId) {
        return device.getCapabilityStatus(client, deviceId, componentId, capabilityId)
    }


    /**
     * Returns a request-promise for the status of the specified deviceId.
     *
     * @param {string} deviceId - The ID of the device.
     * 
     * @param {string} componentId - The ID of the component 
     * 
     * @param {string} capabilityId - The ID of the capability 
     * 
     * @param {string} command - the command
     * 
     * @param {Array} args - the command arguments
     *
     * @returns {Object} - The request-promise for this API call.
     */
    executeDeviceCommands(client, deviceId, componentId, capabilityId, command, args) {
        return device.executeCommand(client, deviceId, componentId, capabilityId, command, args)
    }
	
    /**
     * Returns a request-promise for the supported attribues of the specified deviceId.
     *
     * @param {string} deviceId - The ID of the device.
     *
     * @returns {Object} - The request-promise for this API call.
     */
	listSupportedAttributes(client, deviceId) {
        return getSupportedAttributes(client, deviceId)
    }
    

}

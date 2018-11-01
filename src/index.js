import * as devices from './devices'
import * as apps from './apps'
import * as locations from './locations'
import * as installedApps from './installedapps'
import * as subcriptions from './subscriptions'
import * as scenes from './scenes'

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
     * @param {Object} client - Client object
     * @param {string} capability - The capability to filter by; if not specified,
     *  all locations will be returned.
     * @param {Array} locationsAccum - An accumulator for recursive API calls to
     *  handle paged result sets. Calling clients should not need to specify this.
     * 
     * @returns {Object} - The request-promise for this API request.
     */
    listLocations(client, locationsAccum) {
        return locations.list(client, locationsAccum)
    }

    
    /**
     * Returns a request-promise for the status of the specified locationId.
     *
     * @param {string} deviceId - The ID of the location.
     *
     * @returns {Object} - The request-promise for this API call.
     */
    showLocation(client, locationId) {
        return locations.show(client, locationId)
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
        return devices.list(client, capability,devicesAccum)
    }

    
    /**
     * Returns a request-promise for the object of the specified deviceId.
     *
     * @param {string} deviceId - The ID of the device.
     *
     * @returns {Object} - The request-promise for this API call.
     */
    showDevice(client, deviceId) {
        return devices.getOne(client, deviceId)
    }


    /**
     * Returns a request-promise for the status of the specified deviceId.
     *
     * @param {string} deviceId - The ID of the device.
     *
     * @returns {Object} - The request-promise for this API call.
     */
    showDeviceFullStatus(client, deviceId) {
        return devices.getFullStatus(client, deviceId)
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
        return devices.getComponentStatus(client, deviceId, component)
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
        return devices.getCapabilityStatus(client, deviceId, componentId, capabilityId)
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
        return devices.executeCommand(client, deviceId, componentId, capabilityId, command, args)
    }


    /**
     * Apps
     */

    /**
     * Gets a list of apps.
     * @param {Object} client - Client object
     *  all apps will be returned.
     * @param {Array} appsAccum - An accumulator for recursive API calls to
     *  handle paged result sets. Calling clients should not need to specify this.
     * 
     * @returns {Object} - The request-promise for this API request.
     */
    listApps(client, appsAccum) {
        return apps.list(client, appsAccum)
    }

    
    /**
     * Returns a request-promise for the status of the specified appId.
     *
     * @param {string} appsId - The ID of the app.
     *
     * @returns {Object} - The request-promise for this API call.
     */
    showApp(client, appId) {
        return apps.show(client, appId)
    }

    /**
    * Installed Apps
    */


    /**
     * Scenes 
    */

    /**
     * Gets a list of scenes.
     * @param {Object} client - Client object
     * @param {string} locationId - The location to filter by; if not specified,
     *  all scenes will be returned.
     * @param {Array} scenesAccum - An accumulator for recursive API calls to
     *  handle paged result sets. Calling clients should not need to specify this.
     * 
     * @returns {Object} - The request-promise for this API request.
     */
    listScenes(client, scenesAccum) {
        return scenes.list(client, scenesAccum)
    }

    /**
     *
     * @param {string} sceneId - The ID of the device.
     * 
     * @returns {Object} - The request-promise for this API call.
     */
    executeScene(client, sceneId) {
        return scenes.executeCommand(client, sceneId)
    }

    /**
    * Subcriptions
    */

    createDeviceSubscription(
        client, 
        appId, 
        deviceId, 
        componentId, 
        capability, 
        attribute,  
        stateChangeOnly,
        value){
            
        return(
                subcriptions.createDeviceSubscription(
                    client, 
                    appId, 
                    deviceId, 
                    componentId, 
                    capability, 
                    attribute, 
                    stateChangeOnly,
                    value 
                )
            )
        }    
    
    deleteAppSubscriptions(client, appId) {
        return(subcriptions.deleteAppSubscriptions(client,appId))
    }
}

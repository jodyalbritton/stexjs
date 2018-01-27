const request = require('request')
const rp = require('request-promise')


export function createDeviceSubscription(
    client, 
    appId, 
    deviceId, 
    componentId, 
    capability, 
    attribute, 
    value, 
    stateChangeOnly, 
    subscriptionName){
    let body = {
        
        sourceType : 'DEVICE',
        device : {
            deviceId : deviceId,
            componentId : componentId,
            capability: capability,
            attribute: attribute,
            value: value,
            stateChangeOnly: stateChangeOnly,
            subscriptionName: subscriptionName
        }

    }
    
    let options = {
        method: 'POST',
        url: client.url + "installedapps/"+appId+"/subscriptions",
        headers: client.headers,
        body: body,
        json: true
    }



    return rp(options)
 }
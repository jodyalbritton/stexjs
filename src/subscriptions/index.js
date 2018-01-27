const request = require('request')
const rp = require('request-promise')


export function createDeviceSubscription(
    client, 
    appId, 
    deviceId, 
    componentId, 
    capability, 
    attribute, 
    stateChangeOnly,
    value){
    let body = {
        
        sourceType : 'DEVICE',
        device : {
            deviceId : deviceId,
            componentId : componentId,
            capability: capability,
            attribute: attribute,
            value: value,
            stateChangeOnly: stateChangeOnly,
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


 export function deleteAppSubscriptions(client, appId){

    let options = {
        method: 'DELETE',
        url: client.url + "installedapps/"+appId+"/subscriptions",
        headers: client.headers,
        body: body,
        json: true
    }

    return rp(options)
 }
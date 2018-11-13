# SmartThings ES6 SDK


### testing 

git clone https://github.com/jodyalbritton/stexjs

cd stexjs


npm install

npm run build 

Get a token 

https://account.smartthings.com/tokens

node


```
> Stex = require("./dist/legacy/index.js")
> client = new Stex.StexClient("your-personal-access-token")
> let results = []
> devices = client.listDevices(client, "switch", "", []).then(function(response){ results = response})
> results
```

### As a module

```
import * as Stex from 'stexjs'
const client = new Stex.StexClient(token)

client.listDevices(client, 'powerMeter').then((deviceList) => {
    console.log(deviceList)
})
```

results should be an array of devices. 


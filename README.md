# Node GMT

A simple way to handle time zones by GMT on node.js

## Getting Started

Install node-gmt using npm:

```sh
$ npm install --save node-gmt
```

Retrieving a relative time on a different timezone.

```js
const GMT = require('node-gmt');

let gmt = new GMT('GMT+05:00');

let someDate = new Date('August 1, 2018 00:00:00');
let relativeDate = gmt.relativeDate(someDate);

console.log("The moment ", someDate.toISOString(), " is ",  
    relativeDate.toISOString(), " at ", gmt.toString());
```

The output will be: `The moment  2018-08-01T03:00:00.000Z  is  2018-08-01T11:00:00.000Z  at  GMT+05:00`
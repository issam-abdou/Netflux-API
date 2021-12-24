"use strict";

require("core-js/modules/es.promise.js");

/* ####### EX 01 ########

et valid = false;

let promise = new Promise ((resolve,reject)=>{
    if (valid) {
        resolve('Goooooooooood');
    } else {
        reject('BAAAAAAAAAAAD')
    }
})

promise.then((msg)=>{
    console.log(msg);
}).catch((msg)=>{
    console.log(msg);
})
*/

/* ########### EX 02 ########## */

/*
console.log('first');

setTimeout(() => {
    console.log('Second');
}, 3000);

console.log('Third');
*/
let prom = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('---Second---');
  }, 4000);
});

async function aww() {
  try {
    console.log('first');
    let kk = await prom;
    console.log(kk);
    console.log('Third');
  } catch (error) {
    console.log(error);
  }
}

aww();
/*
prom.then((msg)=>{
    console.log('first');
    console.log(msg);
    console.log("Third");
})

async function getCost() {
    let user = await getUser(100);
    let service = await getServices(user);
    let cost = await getServiceCost(service);
    console.log(cost);
}
*/
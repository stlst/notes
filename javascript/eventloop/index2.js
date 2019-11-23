console.log(1);
setTimeout(() => { // callback1
    console.log(2);
    Promise.resolve().then(() => { // callback2
        console.log(3)
    });
});
new Promise((resolve, reject) => {
    console.log(4)
    resolve(5)
}).then((data) => { // callback3
    console.log(data);
    Promise.resolve().then(() => { // callback4
        console.log(6)
    }).then(() => { // callback5
        console.log(7)
        setTimeout(() => { // callback6
            console.log(8)
        }, 0);
    });
})
setTimeout(() => { // callback7
    console.log(9);
})
console.log(10);
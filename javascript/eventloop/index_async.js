async function async1() {
    await async2()
    console.log('1')
}
async function async2() {
    console.log('2')
}
console.log('3')
async1()
new Promise(resolve => {
        console.log('4')
        resolve()
    })
    .then(function () {
        console.log('5')
        setTimeout(function () {
            console.log('6')
        }, 0)
    })
    .then(function () {
        console.log('7')
    })
setTimeout(function () {
    console.log('8')
}, 0)
console.log('9')
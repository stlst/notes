setTimeout(() => {
    console.log('1');
}, 0);
var obj = {
    func: function () {
        setTimeout(function () {
            console.log('2');
        }, 0);
        return new Promise(function (resolve) {
            console.log('3');
            resolve();
        });
    },
};
obj.func().then(function () {
    console.log('4');
});
console.log('5');
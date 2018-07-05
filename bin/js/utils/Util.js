/*
* name;
*/
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.getRandom = function (min, max) {
        if (min > max) {
            throw "max < min";
        }
        var random = Math.random();
        var rand = max - min;
        return min + Math.round(random * rand);
    };
    Util.getArrayElement = function (arr, count) {
        var shuffled = arr.slice(0);
        var i = arr.length;
        var min = i - count;
        var index, temp;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    };
    return Util;
}());
//# sourceMappingURL=Util.js.map
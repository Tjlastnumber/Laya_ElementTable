/*
* name;
*/
class Util{
    constructor(){

    }

    public static getRandom(min: number, max: number):number {
        if (min > max) {
            throw "max < min";
        }
        var random = Math.random();
        var rand = max - min;

        return min + Math.round(random * rand);
    }

    public static getArrayElement(arr: Array<any>, count: number): Array<any> {
        var shuffled: Array<any> = arr.slice(0);
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
    }
}
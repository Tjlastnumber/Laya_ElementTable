var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var CardFloatScript = /** @class */ (function (_super) {
    __extends(CardFloatScript, _super);
    function CardFloatScript() {
        var _this = _super.call(this) || this;
        _this.isSelect = false;
        _this.eventDispatch = new Laya.EventDispatcher;
        return _this;
    }
    CardFloatScript.prototype._initialize = function (owner) {
        _super.prototype._initialize.call(this, owner);
        this.card = owner;
    };
    CardFloatScript.prototype.Float = function () {
        this.isSelect = !this.isSelect;
        this.eventDispatch.event("Float", [this.card, this.isSelect]);
    };
    CardFloatScript.prototype.onSelected = function (handler) {
        this.eventDispatch.on("Float", this, handler);
    };
    return CardFloatScript;
}(Laya.Script));
//# sourceMappingURL=CardFloatScript.js.map
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
var CardScript = /** @class */ (function (_super) {
    __extends(CardScript, _super);
    function CardScript() {
        var _this = _super.call(this) || this;
        _this.isSelect = false;
        _this.eventDispatch = new Laya.EventDispatcher;
        return _this;
    }
    Object.defineProperty(CardScript.prototype, "IsSelect", {
        get: function () {
            return this.isSelect;
        },
        set: function (v) {
            this.isSelect = v;
            if (this.IsSelect) {
                this.material.albedo = new Laya.Vector4(1, 0, 1, 1);
            }
            else {
                this.material.albedo = new Laya.Vector4(1, 1, 1, 1);
            }
        },
        enumerable: true,
        configurable: true
    });
    CardScript.prototype._initialize = function (owner) {
        _super.prototype._initialize.call(this, owner);
        this.Card = owner;
    };
    CardScript.prototype._start = function () {
        this.material = this.getMesh();
    };
    CardScript.prototype.Select = function () {
        this.IsSelect = !this.IsSelect;
        this.eventDispatch.event("Select", [this]);
    };
    CardScript.prototype.getMesh = function () {
        var cardMesh = this.Card.getChildByName('Card');
        var material = cardMesh.meshRender.material;
        return material;
    };
    CardScript.prototype.onSelected = function (handler) {
        this.eventDispatch.on("Select", this, handler);
    };
    return CardScript;
}(Laya.Script));
//# sourceMappingURL=CardScript.js.map
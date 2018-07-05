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
var FlipScript = /** @class */ (function (_super) {
    __extends(FlipScript, _super);
    function FlipScript() {
        return _super.call(this) || this;
    }
    FlipScript.prototype._initialize = function (owner) {
        _super.prototype._initialize.call(this, owner);
        this._self = owner;
        this._self.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this._self.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this._self.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
    };
    FlipScript.prototype._update = function (state) {
        _super.prototype._update.call(this, state);
        this.flip(state.elapsedTime);
    };
    FlipScript.prototype.mouseDown = function (e) {
        console.debug(e.target);
        this.isMouseDown = true;
    };
    FlipScript.prototype.mouseUp = function (e) {
        this.isMouseDown = false;
    };
    FlipScript.prototype.mouseOut = function (e) {
        this.isMouseDown = false;
    };
    FlipScript.prototype.flip = function (elapsedTime) {
        if (this.isMouseDown) {
            this._self.transform.rotate(new Laya.Vector3(180, 0, 0), true, false);
        }
    };
    return FlipScript;
}(Laya.Script));
//# sourceMappingURL=FlipScript.js.map
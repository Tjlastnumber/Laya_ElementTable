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
var DragScript = /** @class */ (function (_super) {
    __extends(DragScript, _super);
    function DragScript() {
        return _super.call(this) || this;
    }
    DragScript.prototype._initialize = function (owner) {
        _super.prototype._initialize.call(this, owner);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        this._self = owner;
    };
    DragScript.prototype._update = function (state) {
        _super.prototype._update.call(this, state);
        this.updatePosition(state.elapsedTime);
    };
    DragScript.prototype.mouseDown = function (e) {
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;
    };
    DragScript.prototype.mouseUp = function (e) {
        this.isMouseDown = false;
    };
    DragScript.prototype.mouseOut = function (e) {
        this.isMouseDown = false;
    };
    DragScript.prototype.updatePosition = function (elapsedTime) {
        if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY)) {
            if (this.isMouseDown) {
                var x = this._self.transform.position.x;
                var z = this._self.transform.position.z;
                var offsetX = Laya.stage.mouseX - this.lastMouseX;
                var offsetZ = Laya.stage.mouseY - this.lastMouseY;
                this._self.transform.translate(new Laya.Vector3((x - offsetX) * 0.0006, 0, (z - offsetZ) * 0.0006));
            }
        }
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
    };
    return DragScript;
}(Laya.Script));
//# sourceMappingURL=DragScript.js.map
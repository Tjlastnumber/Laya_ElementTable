/*
* name;
*/
class DragScript extends Laya.Script{
    protected lastMouseX: number;
    protected lastMouseY: number;
    protected isMouseDown: Boolean;
    protected _self: Laya.Sprite3D;

    constructor(){
        super();
    }

    public _initialize(owner: Laya.Sprite3D): void {
        super._initialize(owner);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);

        this._self = owner;
    }

    public _update(state: Laya.RenderState): void {
        super._update(state);
        this.updatePosition(state.elapsedTime);
    }

    protected mouseDown(e: Laya.Event): void {
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;
    }

    protected mouseUp(e: Laya.Event): void {
        this.isMouseDown = false;
    }

    protected mouseOut(e: Laya.Event): void {
        this.isMouseDown = false;
    }

    protected updatePosition(elapsedTime: number) {
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
    }
}
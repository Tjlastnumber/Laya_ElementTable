/*
* name;
*/
class CardScript extends Laya.Script {
    private eventDispatch: Laya.EventDispatcher;

    public Card: Laya.Sprite3D;

    private material: Laya.StandardMaterial;

    private isSelect: Boolean = false;

    public set IsSelect(v : Boolean) {
        this.isSelect = v;
        if (this.IsSelect) {
            this.material.albedo = new Laya.Vector4(1, 0, 1, 1);
        } else {
            this.material.albedo = new Laya.Vector4(1, 1, 1, 1);
        }
    }

    public get IsSelect() : Boolean {
        return this.isSelect;
    }

    constructor() {
        super()
        this.eventDispatch = new Laya.EventDispatcher;
    }

    _initialize(owner: Laya.Sprite3D): void {
        super._initialize(owner);
        this.Card = owner;
    }

    _start() {
        this.material = this.getMesh();
    }

    Select() {
        this.IsSelect = !this.IsSelect
        this.eventDispatch.event("Select", [this]);
    }

    private getMesh() {
        var cardMesh:Laya.MeshSprite3D = this.Card.getChildByName('Card') as Laya.MeshSprite3D;
        var material:Laya.StandardMaterial = cardMesh.meshRender.material as Laya.StandardMaterial;
        return material;
    }

    public onSelected(handler: Function): void {
        this.eventDispatch.on("Select", this, handler);
    }

}
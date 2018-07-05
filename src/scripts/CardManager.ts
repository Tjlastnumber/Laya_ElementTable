/*
* name;
*/
import Handler = laya.utils.Handler;
class CardManager {
    SCORE: string = "score_event";

    CARD_COMPLETED = "card_completed";

    CARD_MODEL: string = "LayaScene_CardModel/CardModel.lh";

    CARD_RESOURCE_PATH = "LayaScene_CardModel/CardModel.json";

    CARD_RESOURCE: Array<any>;

    private static _INSTANC: CardManager;

    private _eventDispatcher: Laya.EventDispatcher;

    private _cards: Array<Laya.Sprite3D>;

    private _scene: Laya.Scene;

    private _selectedCardList: Array<Laya.Sprite3D> = new Array<Laya.Sprite3D>();

    constructor() {
        this._eventDispatcher = new Laya.EventDispatcher();
        this._cards = new Array<Laya.Sprite3D>();
    }

    static getInstance(scene: Laya.Scene): CardManager {
        if (!CardManager._INSTANC) {
            CardManager._INSTANC = new CardManager();
            this._INSTANC._scene = scene;
            Laya.loader.load([{ url: CardManager._INSTANC.CARD_RESOURCE_PATH, type: Laya.Loader.JSON }],
                Laya.Handler.create(this._INSTANC, this._INSTANC._resourceLoadCompleted, [CardManager._INSTANC.CARD_RESOURCE_PATH]));
        }
        return this._INSTANC;
    }

    public setScene(scene: Laya.Scene): CardManager {
        this._scene = scene;
        return this;
    }

    public create(completed?: Handler, progress?: Handler, clas?: any, params?: Array<any>, priority?: number, cache?: boolean, group?: string)
        : this {
        // 注册卡片资源加载完成事件
        this._eventDispatcher.on(this.CARD_COMPLETED, completed.caller, completed.method, completed.args);
        Laya.loader.create(this.CARD_MODEL, Handler.create(this, this._cardComplete), progress, clas, params, priority, cache, group);
        return this;
    }

    private _resourceLoadCompleted(path: string) {
        this.CARD_RESOURCE = Laya.loader.getRes(path);
    }

    private _cardComplete(): void {
        // 创建原始 Card
        var _card = Laya.Sprite3D.load(this.CARD_MODEL);
        _card.transform.translate(new Laya.Vector3(0.25, 0.1, 0.1));
        _card.transform.scale = new Laya.Vector3(0.5, 0.5, 0.5);
        // _card.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        // 添加卡片碰撞体添加浮动脚本 
        _card.addComponent(CardScript) as CardScript;
        // 加入卡片队列
        this._cards.push(_card);
        this._scene.addChild(_card);

        // 克隆原始卡片 
        this._cloneCard(0, _card, this._scene);
        // 批量绑定卡片选中事件
        this._bindingSelectedEvent();
        // 触发卡片资源加载完成事件
        this._eventDispatcher.event(this.CARD_COMPLETED);
    }

    private _cloneCard(index: number, original: Laya.Sprite3D, parent: laya.display.Node) {
        index++;
        var card = Laya.Sprite3D.instantiate(original, parent, false);
        card.transform.translate(new Laya.Vector3(-0.1, 0, 0));
        this._cards.push(card);
        if (index >= this.CARD_RESOURCE.length - 1) { return; }
        // 迭代克隆卡片
        this._cloneCard(index, card, this._scene);
    }

    private _bindingSelectedEvent() {
        var randomCardResource = Util.getArrayElement(this.CARD_RESOURCE, this.CARD_RESOURCE.length);
        this._cards.forEach((card, index, arr) => {
            var cardResource = randomCardResource[index];
            // 获取唱片贴图
            var image = cardResource.value;
            // 创建标准材质
            var material: Laya.StandardMaterial = new Laya.StandardMaterial();
            // 加载贴图纹理
            material.diffuseTexture = Laya.Texture2D.load(image);     
            // 获取卡片贴图纹理
            var cardMesh = card.getChildByName("Card") as Laya.MeshSprite3D;
            // 设置卡片贴图
            cardMesh.meshRender.material = material;
            card.name = cardResource.key; 
            var cardScript = card.getComponentByType(CardScript) as CardScript;
            cardScript.onSelected(args => {
                var target = args.Card as Laya.Sprite3D;
                if (target) {
                    if (args.IsSelect) {
                        // 记录选中卡片
                        this._selectedCardList.push(target);
                        if (this._selectedCardList.length > 1) {
                            // 判断选中卡片中是否有相同名称的
                            if (this._selectedCardList.every(v => v.name === target.name)) {
                                // 触发计分事件
                                this._eventDispatcher.event(this.SCORE);
                                this._selectedCardList.forEach(el => {
                                    el.removeComponentByType(CardScript);
                                })
                                this._selectedCardList = new Array<Laya.Sprite3D>();
                                return;
                            } 
                            // 未选则正确清除所有卡片选中状态
                            this._selectedCardList.forEach(el => {
                                var script = el.getComponentByType(CardScript) as CardScript;
                                script.IsSelect = false;
                            })
                            // 清除卡片选择队列
                            this._selectedCardList = new Array<Laya.Sprite3D>();
                        }
                    } else {
                        this._selectedCardList.splice(this._selectedCardList.indexOf(target), 1);
                    }
                }
            });
        });
    }

    public scoreEvent(handler: Handler) {
        // 注册计分事件
        this._eventDispatcher.on(this.SCORE, handler.caller, handler.method);
    }
}
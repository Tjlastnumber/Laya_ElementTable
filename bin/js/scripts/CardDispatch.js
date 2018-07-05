/*
* name;
*/
var Handler = laya.utils.Handler;
var CardDispatch = /** @class */ (function () {
    function CardDispatch() {
        this.CARD_MODEL = "LayaScene_CardModel/CardModel.lh";
        this.CARD_RESOURCE = [
            {
                key: 'H',
                value: 'LayaScene_CardModel/Assets/Card/Maps/1.png'
            },
            {
                key: 'H',
                value: 'LayaScene_CardModel/Assets/Card/Maps/C001.png'
            },
            {
                key: 'Li',
                value: 'LayaScene_CardModel/Assets/Card/Maps/C003.png'
            },
            {
                key: 'Sc',
                value: 'LayaScene_CardModel/Assets/Card/Maps/C021.png'
            },
            {
                key: 'Li',
                value: 'LayaScene_CardModel/Assets/Card/Maps/D003.png'
            },
            {
                key: 'Sc',
                value: 'LayaScene_CardModel/Assets/Card/Maps/D021.png'
            }
        ];
        this.selectedCard = new Array();
        this._eventDispatcher = new Laya.EventDispatcher();
        this.Cards = new Array();
    }
    CardDispatch.getInstance = function () {
        if (!CardDispatch.instance) {
            CardDispatch.instance = new CardDispatch();
        }
        return this.instance;
    };
    CardDispatch.prototype.setScene = function (scene) {
        this._scene = scene;
        return this;
    };
    CardDispatch.prototype.create = function (completed, progress, clas, params, priority, cache, group) {
        // 注册卡片资源加载完成事件
        this._eventDispatcher.on("CardComplete", completed.caller, completed.method, completed.args);
        Laya.loader.create(this.CARD_MODEL, Handler.create(this, this.cardComplete), progress, clas, params, priority, cache, group);
        return this;
    };
    CardDispatch.prototype.cardComplete = function () {
        // 创建原始 Card
        var _card = Laya.Sprite3D.load(this.CARD_MODEL);
        _card.name = 'Card0';
        _card.transform.translate(new Laya.Vector3(0.25, 0.1, 0.1));
        _card.transform.scale = new Laya.Vector3(0.5, 0.5, 0.5);
        // _card.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        // 添加卡片碰撞体添加浮动脚本 
        _card.addComponent(CardFloatScript);
        // 加入卡片队列
        this.Cards.push(_card);
        this._scene.addChild(_card);
        // 克隆原始卡片 
        this._cloneCard(0, _card, this._scene);
        this._bindingSelectedEvent();
        this._eventDispatcher.event("CardComplete");
    };
    CardDispatch.prototype._cloneCard = function (index, original, parent) {
        index++;
        var card = Laya.Sprite3D.instantiate(original, parent, false);
        card.transform.translate(new Laya.Vector3(-0.1, 0, 0));
        card.name = "Card" + index;
        this.Cards.push(card);
        if (index >= this.CARD_RESOURCE.length - 1) {
            return;
        }
        // 迭代克隆卡片
        this._cloneCard(index, card, this._scene);
    };
    CardDispatch.prototype._bindingSelectedEvent = function () {
        var _this = this;
        this.Cards.forEach(function (card, index, arr) {
            var random = Math.random();
            console.debug(random);
            var cardResource = _this.CARD_RESOURCE[index];
            // 获取唱片贴图
            var image = cardResource.value;
            // 创建标准材质
            var material = new Laya.StandardMaterial();
            // 加载贴图纹理
            material.diffuseTexture = Laya.Texture2D.load(image);
            // 获取卡片贴图纹理
            var cardMesh = card.getChildByName("Card");
            // 设置卡片贴图
            cardMesh.meshRender.material = material;
            card.name = cardResource.key;
            var cardScript = card.getComponentByType(CardFloatScript);
            cardScript.onSelected(function (args) {
                var selector = args.Card;
                if (selector) {
                    if (args.IsSelect) {
                        _this.selectedCard.push(selector);
                        if (_this.selectedCard.length > 1) {
                            // TODO: 触发计分逻辑
                            if (_this.selectedCard.every(function (v) { return v.name === selector.name; })) {
                                _this._eventDispatcher.event("score");
                                _this.selectedCard.forEach(function (el) {
                                    el.removeComponentByType(CardFloatScript);
                                });
                                _this.selectedCard = new Array();
                                return;
                            }
                            _this.selectedCard.forEach(function (el) {
                                var script = el.getComponentByType(CardFloatScript);
                                script.IsSelect = false;
                            });
                            _this.selectedCard = new Array();
                        }
                    }
                    else {
                        _this.selectedCard.splice(_this.selectedCard.indexOf(selector), 1);
                    }
                }
            });
        });
    };
    CardDispatch.prototype.score = function (handler) {
        // 注册计分事件
        this._eventDispatcher.on("score", handler.caller, handler.method);
    };
    return CardDispatch;
}());
//# sourceMappingURL=CardDispatch.js.map
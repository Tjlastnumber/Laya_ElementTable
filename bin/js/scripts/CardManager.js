/*
* name;
*/
var Handler = laya.utils.Handler;
var CardManager = /** @class */ (function () {
    function CardManager() {
        this.SCORE = "score_event";
        this.CARD_COMPLETED = "card_completed";
        this.CARD_MODEL = "LayaScene_CardModel/CardModel.lh";
        this.CARD_RESOURCE_PATH = "LayaScene_CardModel/CardModel.json";
        this._selectedCardList = new Array();
        this._eventDispatcher = new Laya.EventDispatcher();
        this._cards = new Array();
    }
    CardManager.getInstance = function (scene) {
        if (!CardManager._INSTANC) {
            CardManager._INSTANC = new CardManager();
            this._INSTANC._scene = scene;
            Laya.loader.load([{ url: CardManager._INSTANC.CARD_RESOURCE_PATH, type: Laya.Loader.JSON }], Laya.Handler.create(this._INSTANC, this._INSTANC._resourceLoadCompleted, [CardManager._INSTANC.CARD_RESOURCE_PATH]));
        }
        return this._INSTANC;
    };
    CardManager.prototype.setScene = function (scene) {
        this._scene = scene;
        return this;
    };
    CardManager.prototype.create = function (completed, progress, clas, params, priority, cache, group) {
        // 注册卡片资源加载完成事件
        this._eventDispatcher.on(this.CARD_COMPLETED, completed.caller, completed.method, completed.args);
        Laya.loader.create(this.CARD_MODEL, Handler.create(this, this._cardComplete), progress, clas, params, priority, cache, group);
        return this;
    };
    CardManager.prototype._resourceLoadCompleted = function (path) {
        this.CARD_RESOURCE = Laya.loader.getRes(path);
    };
    CardManager.prototype._cardComplete = function () {
        // 创建原始 Card
        var _card = Laya.Sprite3D.load(this.CARD_MODEL);
        _card.transform.translate(new Laya.Vector3(0.25, 0.1, 0.1));
        _card.transform.scale = new Laya.Vector3(0.5, 0.5, 0.5);
        // _card.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
        // 添加卡片碰撞体添加浮动脚本 
        _card.addComponent(CardScript);
        // 加入卡片队列
        this._cards.push(_card);
        this._scene.addChild(_card);
        // 克隆原始卡片 
        this._cloneCard(0, _card, this._scene);
        // 批量绑定卡片选中事件
        this._bindingSelectedEvent();
        // 触发卡片资源加载完成事件
        this._eventDispatcher.event(this.CARD_COMPLETED);
    };
    CardManager.prototype._cloneCard = function (index, original, parent) {
        index++;
        var card = Laya.Sprite3D.instantiate(original, parent, false);
        card.transform.translate(new Laya.Vector3(-0.1, 0, 0));
        this._cards.push(card);
        if (index >= this.CARD_RESOURCE.length - 1) {
            return;
        }
        // 迭代克隆卡片
        this._cloneCard(index, card, this._scene);
    };
    CardManager.prototype._bindingSelectedEvent = function () {
        var _this = this;
        var randomCardResource = Util.getArrayElement(this.CARD_RESOURCE, this.CARD_RESOURCE.length);
        this._cards.forEach(function (card, index, arr) {
            var cardResource = randomCardResource[index];
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
            var cardScript = card.getComponentByType(CardScript);
            cardScript.onSelected(function (args) {
                var target = args.Card;
                if (target) {
                    if (args.IsSelect) {
                        // 记录选中卡片
                        _this._selectedCardList.push(target);
                        if (_this._selectedCardList.length > 1) {
                            // 判断选中卡片中是否有相同名称的
                            if (_this._selectedCardList.every(function (v) { return v.name === target.name; })) {
                                // 触发计分事件
                                _this._eventDispatcher.event(_this.SCORE);
                                _this._selectedCardList.forEach(function (el) {
                                    el.removeComponentByType(CardScript);
                                });
                                _this._selectedCardList = new Array();
                                return;
                            }
                            // 未选则正确清除所有卡片选中状态
                            _this._selectedCardList.forEach(function (el) {
                                var script = el.getComponentByType(CardScript);
                                script.IsSelect = false;
                            });
                            // 清除卡片选择队列
                            _this._selectedCardList = new Array();
                        }
                    }
                    else {
                        _this._selectedCardList.splice(_this._selectedCardList.indexOf(target), 1);
                    }
                }
            });
        });
    };
    CardManager.prototype.scoreEvent = function (handler) {
        // 注册计分事件
        this._eventDispatcher.on(this.SCORE, handler.caller, handler.method);
    };
    return CardManager;
}());
//# sourceMappingURL=CardManager.js.map
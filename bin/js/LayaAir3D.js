// 程序入口
var LayaAir3D = /** @class */ (function () {
    function LayaAir3D() {
        this.SCENE_MODEL = "LayaScene_TableScene/TableScene.ls";
        this.CARD_MODEL = "LayaScene_CardModel/CardModel.lh";
        this.CARD_MESH = "LayaScene_CardModel/Assets/Card/Models/Card-mesh.lm";
        this.UI = [
            "res/atlas/comp.atlas"
        ];
        this._score = 0;
        //初始化引擎
        Laya3D.init(0, 0, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();
        Laya.loader.load(this.UI, Laya.Handler.create(this, this.UICompleted));
    }
    LayaAir3D.prototype.UICompleted = function () {
        this._progressBarUI = new uiExtend.ProgressBarExtend();
        this._progress = this._progressBarUI.ProgressBar;
        Laya.stage.addChild(this._progressBarUI);
        Laya.loader.create(this.SCENE_MODEL, Laya.Handler.create(this, this.SceneCompleted), Laya.Handler.create(this, this.LoadProgress, null, false));
    };
    LayaAir3D.prototype.SceneCompleted = function () {
        // this._progressBarUI.removeSelf();
        this._scene = Laya.Loader.getRes(this.SCENE_MODEL);
        Laya.stage.addChild(this._scene);
        Laya.stage.setChildIndex(this._scene, 0);
        this._camera = this._scene.getChildByName('Main Camera');
        // this._camera.transform.translate(new Laya.Vector3(0, 1, .5));
        this._camera.addComponent(CameraMoveScript);
        CardManager.getInstance(this._scene)
            .create(Laya.Handler.create(this, this.CardCreateCompleted))
            .scoreEvent(Laya.Handler.create(this, this.setScore));
        this._progressBarUI.removeSelf();
    };
    LayaAir3D.prototype.setScore = function () {
        // TODO: 计分
        this._Label_Score.text = "分数：" + ++this._score;
    };
    /**
     * 加载进度条
     * @param value 进度值
     */
    LayaAir3D.prototype.LoadProgress = function (value) {
        this._progress.value = value;
    };
    LayaAir3D.prototype.CardCreateCompleted = function () {
        var _this = this;
        var ui = new uiExtend.MainUIExtend();
        this._Label_Score = ui.Score;
        this._Label_Time = ui.Time;
        Laya.stage.addChild(ui);
        this._sceneScript = this._scene.addScript(SceneScript);
        this._sceneScript.camera = this._camera;
        this._Label_Time.text = "3";
        Laya.timer.loop(1000, this, function () {
            var time = Number(_this._Label_Time.text);
            if (time <= 0)
                return;
            _this._Label_Time.text = (--time).toString();
        });
        Laya.timer.once(3 * 1000, this, function () {
            var gameOverUI = new uiExtend.GameOverUIExtend();
            gameOverUI.show();
        });
    };
    return LayaAir3D;
}());
new LayaAir3D();
//# sourceMappingURL=LayaAir3D.js.map
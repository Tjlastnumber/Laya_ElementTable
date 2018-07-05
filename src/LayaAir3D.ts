// 程序入口
class LayaAir3D {
    SCENE_MODEL: string = "LayaScene_TableScene/TableScene.ls";
    CARD_MODEL: string = "LayaScene_CardModel/CardModel.lh";
    CARD_MESH: string = "LayaScene_CardModel/Assets/Card/Models/Card-mesh.lm";
    UI: Array<String> = [
        "res/atlas/comp.atlas"
    ];

    _scene: Laya.Scene;
    _sceneScript: SceneScript;
    _camera: Laya.Camera;
    _card: Laya.Sprite3D;
    _progressBarUI: uiExtend.ProgressBarExtend;
    _progress: Laya.ProgressBar;

    _Label_Score: Laya.Label;
    _Label_Time: Laya.Label;

    _cardList: Array<Laya.Sprite3D>;

    constructor() {
        //初始化引擎
        Laya3D.init(0, 0, true);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        Laya.loader.load(this.UI, Laya.Handler.create(this, this.UICompleted));
    }

    public UICompleted(): void {
        this._progressBarUI = new uiExtend.ProgressBarExtend();
        this._progress = this._progressBarUI.ProgressBar;
        Laya.stage.addChild(this._progressBarUI);
        Laya.loader.create(this.SCENE_MODEL, Laya.Handler.create(this, this.SceneCompleted), Laya.Handler.create(this, this.LoadProgress, null, false));
    }

    public SceneCompleted():void {
        // this._progressBarUI.removeSelf();
        this._scene = Laya.Loader.getRes(this.SCENE_MODEL);
        Laya.stage.addChild(this._scene);
        Laya.stage.setChildIndex(this._scene, 0);
        this._camera = this._scene.getChildByName('Main Camera') as Laya.Camera;
        // this._camera.transform.translate(new Laya.Vector3(0, 1, .5));
        this._camera.addComponent(CameraMoveScript);
        CardManager.getInstance(this._scene)
            .create(Laya.Handler.create(this, this.CardCreateCompleted))
            .scoreEvent(Laya.Handler.create(this, this.setScore));


        this._progressBarUI.removeSelf();
    }

    private _score = 0;

    public setScore(): void {
        // TODO: 计分
        this._Label_Score.text = "分数：" + ++this._score;
    }

    /**
     * 加载进度条
     * @param value 进度值
     */
    public LoadProgress(value: number): void {
        this._progress.value = value;
    }

    public CardCreateCompleted(): void {
        var ui: uiExtend.MainUIExtend = new uiExtend.MainUIExtend();
        this._Label_Score = ui.Score;
        this._Label_Time = ui.Time;
        Laya.stage.addChild(ui);

        this._sceneScript = this._scene.addScript(SceneScript) as SceneScript;
        this._sceneScript.camera = this._camera;

        // 设置游戏结束倒计时
        this._Label_Time.text = "3";
        Laya.timer.loop(1000, this, () => {
            var time = Number(this._Label_Time.text);
            if (time <= 0) return;
            this._Label_Time.text = (--time).toString();
        })
        Laya.timer.once(3 * 1000, this, () => {
            var gameOverUI: uiExtend.GameOverUIExtend = new uiExtend.GameOverUIExtend();
            gameOverUI.show();
        })
    }
}
new LayaAir3D();
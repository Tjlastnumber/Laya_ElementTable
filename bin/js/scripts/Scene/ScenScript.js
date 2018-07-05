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
var SceneScript = /** @class */ (function (_super) {
    __extends(SceneScript, _super);
    function SceneScript() {
        var _this = _super.call(this) || this;
        /***获得的物品***/
        _this.nameArray = [];
        _this.isMouseDown = false;
        return _this;
    }
    /**
     * 覆写3D对象加载组件时执行的方法
     * @param owner 加载此组件的3D对象
     */
    SceneScript.prototype._load = function (owner) {
        //获取脚本所属对象
        this.scene = owner;
    };
    /**
     * 覆写加载组件的3D对象实例化完成后，第一次更新时执行
     */
    SceneScript.prototype._start = function (state) {
        //创建一条射线
        this.ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
        //创建矢量3D精灵
        this.phasorSprite3D = new Laya.PhasorSpriter3D();
        //创建碰撞信息
        this.rayCastHit = new Laya.RaycastHit();
        //鼠标点击事件回调
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
    };
    SceneScript.prototype._update = function (state) {
        _super.prototype._update.call(this, state);
    };
    /**
    * 渲染的最后阶段执行
    * @param    state 渲染状态参数。
    */
    SceneScript.prototype._postRenderUpdate = function (state) {
        if (!this.camera) {
            throw "not find camera";
        }
        //画参考线
        //根据鼠标屏幕2D座标修改生成射线数据 
        //            camera.viewportPointToRay(new Laya.Vector2(Laya.stage.mouseX,Laya.stage.mouseY),ray);
        this.camera.viewportPointToRay(new Laya.Vector2(Laya.MouseManager.instance.mouseX, Laya.MouseManager.instance.mouseY), this.ray);
        //射线检测，最近物体碰撞器信息，最大检测距离为300米，默认检测第0层
        Laya.Physics.rayCast(this.ray, this.rayCastHit, 300);
        //摄像机位置
        var position = new Laya.Vector3(this.camera.position.x, 0, this.camera.position.z);
        //开始绘制矢量3D精灵，类型为线型
        this.phasorSprite3D.begin(Laya.WebGLContext.LINES, this.camera);
        //根据射线的原点绘制参考直线（为了观察方便而绘制，但矢量线并不是射线真正的路径）
        // this.phasorSprite3D.line(this.ray.origin, new Laya.Vector4(1, 0, 0, 1),
        //     position, new Laya.Vector4(1, 0, 0, 1));
        //如果与物品相交,画三面边线
        if (this.rayCastHit.sprite3D) {
            //从碰撞信息中获取碰撞处的三角面顶点
            var trianglePositions = this.rayCastHit.trianglePositions;
            //矢量绘制三角面边线
            this.phasorSprite3D.line(trianglePositions[0], new Laya.Vector4(1, 0, 0, 1), trianglePositions[1], new Laya.Vector4(1, 0, 0, 1));
            this.phasorSprite3D.line(trianglePositions[1], new Laya.Vector4(1, 0, 0, 1), trianglePositions[2], new Laya.Vector4(1, 0, 0, 1));
            this.phasorSprite3D.line(trianglePositions[2], new Laya.Vector4(1, 0, 0, 1), trianglePositions[0], new Laya.Vector4(1, 0, 0, 1));
        }
        //结束绘制
        this.phasorSprite3D.end();
    };
    /**
     * 鼠标点击拾取
     */
    SceneScript.prototype.onMouseDown = function () {
        //如果碰撞信息中的模型不为空,删除模型
        if (this.rayCastHit.sprite3D) {
            var parent = this.rayCastHit.sprite3D.parent;
            var target = parent.getComponentByType(CardScript);
            if (target != null) {
                target.Select();
            }
        }
    };
    SceneScript.prototype.onMouseUp = function () {
        if (this.isMouseDown) {
            this.isMouseDown = false;
        }
    };
    return SceneScript;
}(Laya.Script));
//# sourceMappingURL=ScenScript.js.map
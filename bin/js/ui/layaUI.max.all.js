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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var game_overUI = /** @class */ (function (_super) {
        __extends(game_overUI, _super);
        function game_overUI() {
            return _super.call(this) || this;
        }
        game_overUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.game_overUI.uiView);
        };
        game_overUI.uiView = { "type": "Dialog", "props": { "width": 600, "renderType": "mask", "height": 400 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "comp/blank.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "y": 152, "x": 240, "width": 120, "text": "Game Over", "name": "label", "height": 28, "fontSize": 18, "color": "#ff0400", "centerY": -34, "centerX": 0, "bold": false, "align": "center" } }, { "type": "Button", "props": { "y": 190, "x": 235, "width": 131, "skin": "comp/button.png", "name": "btn_restart", "label": "重新开始", "height": 39, "centerX": 0 } }] };
        return game_overUI;
    }(Dialog));
    ui.game_overUI = game_overUI;
})(ui || (ui = {}));
(function (ui) {
    var mainUI = /** @class */ (function (_super) {
        __extends(mainUI, _super);
        function mainUI() {
            return _super.call(this) || this;
        }
        mainUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.mainUI.uiView);
        };
        mainUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "Label", "props": { "top": 10, "text": "分数：0", "right": 10, "name": "score", "color": "#ffffff" } }, { "type": "Label", "props": { "top": 10, "text": "100", "name": "time", "color": "#ffffff", "centerX": 0 } }] };
        return mainUI;
    }(View));
    ui.mainUI = mainUI;
})(ui || (ui = {}));
(function (ui) {
    var progressViewUI = /** @class */ (function (_super) {
        __extends(progressViewUI, _super);
        function progressViewUI() {
            return _super.call(this) || this;
        }
        progressViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.progressViewUI.uiView);
        };
        progressViewUI.uiView = { "type": "View", "props": { "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "template/Progress/loading bar_icloud.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "width": 165, "text": "加载中...", "skin": "template/Progress/label.png", "height": 26, "fontSize": 20, "font": "Microsoft YaHei", "color": "#000000", "centerY": 0, "centerX": 0, "bold": true, "align": "center" } }, { "type": "ProgressBar", "props": { "width": 468, "visible": true, "value": 0, "skin": "template/Progress/Loading_bar_icloud.png", "sizeGrid": "0,6,0,6", "name": "ProgressBar", "height": 6, "centerY": 20, "centerX": 0 } }] };
        return progressViewUI;
    }(View));
    ui.progressViewUI = progressViewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map
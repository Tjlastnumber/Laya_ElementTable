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
var MainUI = ui.mainUI;
var ProgressBarUI = ui.progressViewUI;
var GameOverUI = ui.game_overUI;
var uiExtend;
(function (uiExtend) {
    var MainUIExtend = /** @class */ (function (_super) {
        __extends(MainUIExtend, _super);
        function MainUIExtend() {
            return _super.call(this) || this;
        }
        MainUIExtend.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.Score = this.getChildByName("score");
            this.Time = this.getChildByName("time");
        };
        return MainUIExtend;
    }(MainUI));
    uiExtend.MainUIExtend = MainUIExtend;
})(uiExtend || (uiExtend = {}));
(function (uiExtend) {
    var ProgressBarExtend = /** @class */ (function (_super) {
        __extends(ProgressBarExtend, _super);
        function ProgressBarExtend() {
            return _super.call(this) || this;
        }
        ProgressBarExtend.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.ProgressBar = this.getChildByName("ProgressBar");
        };
        return ProgressBarExtend;
    }(ProgressBarUI));
    uiExtend.ProgressBarExtend = ProgressBarExtend;
})(uiExtend || (uiExtend = {}));
(function (uiExtend) {
    var GameOverUIExtend = /** @class */ (function (_super) {
        __extends(GameOverUIExtend, _super);
        function GameOverUIExtend() {
            return _super.call(this) || this;
        }
        GameOverUIExtend.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.BtnRestart = this.getChildByName("restart");
            this.Dialog = this.getChildByName("dialog");
        };
        return GameOverUIExtend;
    }(GameOverUI));
    uiExtend.GameOverUIExtend = GameOverUIExtend;
})(uiExtend || (uiExtend = {}));
//# sourceMappingURL=MainUIExtend.js.map
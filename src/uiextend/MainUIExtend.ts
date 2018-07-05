import MainUI = ui.mainUI;
import ProgressBarUI = ui.progressViewUI;
import GameOverUI = ui.game_overUI;
module uiExtend {
    export class MainUIExtend extends MainUI {
        public Score: Laya.Label;
        public Time: Laya.Label;

        constructor() {
            super();
        }

        createChildren(): void {
            super.createChildren();
            this.Score = this.getChildByName("score") as Laya.Label;
            this.Time = this.getChildByName("time") as Laya.Label;
        }
    }
}
module uiExtend {
    export class ProgressBarExtend extends ProgressBarUI {
        public ProgressBar: Laya.ProgressBar
        
        constructor() {
            super();
        }

        createChildren(): void {
            super.createChildren();
            this.ProgressBar = this.getChildByName("ProgressBar") as Laya.ProgressBar;
        }
    }
}

module uiExtend {
    export class GameOverUIExtend extends GameOverUI {
        public BtnRestart: Laya.Button;
        public Dialog: Laya.Dialog;
        
        constructor() {
            super();
        }

        createChildren(): void {
            super.createChildren();
            this.BtnRestart = this.getChildByName("restart") as Laya.Button;
            this.Dialog = this.getChildByName("dialog") as Laya.Dialog;
        }
    }
}
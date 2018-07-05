
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class game_overUI extends Dialog {

        public static  uiView:any ={"type":"Dialog","props":{"width":600,"renderType":"mask","height":400},"child":[{"type":"Image","props":{"top":0,"skin":"comp/blank.png","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"y":152,"x":240,"width":120,"text":"Game Over","name":"label","height":28,"fontSize":18,"color":"#ff0400","centerY":-34,"centerX":0,"bold":false,"align":"center"}},{"type":"Button","props":{"y":190,"x":235,"width":131,"skin":"comp/button.png","name":"btn_restart","label":"重新开始","height":39,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game_overUI.uiView);

        }

    }
}

module ui {
    export class mainUI extends View {

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Label","props":{"top":10,"text":"分数：0","right":10,"name":"score","color":"#ffffff"}},{"type":"Label","props":{"top":10,"text":"100","name":"time","color":"#ffffff","centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.mainUI.uiView);

        }

    }
}

module ui {
    export class progressViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"template/Progress/loading bar_icloud.png","right":0,"left":0,"bottom":0}},{"type":"Label","props":{"width":165,"text":"加载中...","skin":"template/Progress/label.png","height":26,"fontSize":20,"font":"Microsoft YaHei","color":"#000000","centerY":0,"centerX":0,"bold":true,"align":"center"}},{"type":"ProgressBar","props":{"width":468,"visible":true,"value":0,"skin":"template/Progress/Loading_bar_icloud.png","sizeGrid":"0,6,0,6","name":"ProgressBar","height":6,"centerY":20,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.progressViewUI.uiView);

        }

    }
}

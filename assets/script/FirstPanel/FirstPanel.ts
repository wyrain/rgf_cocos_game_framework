/*
 * @Author: rain
 * @Date: 2022-01-07 23:54:29
 * @LastEditTime: 2022-01-09 14:46:19
 * @LastEditors: rain
 * @Description: 第一个界面
 * @FilePath: \rgf\assets\script\FirstPanel\FirstPanel.ts
 * 代码如诗
 */
import { _decorator, Node, log, Label } from "cc";
import EventManager from "../common/EventManager";
import PanelBase from "../common/PanelBase";
import { PanelType } from "../enum/CommonEnum";
import EventEnum from "../enum/EventEnum";
const { ccclass, property, menu } = _decorator;

@ccclass
@menu("FirstPanel/FirstPanel")
export default class FirstPanel extends PanelBase {
    @property(Node)
    btnTest: Node = null;
    @property(Label)
    labTest: Label = null;

    onLoad() {
        this.panelType = PanelType.PANEL;
    }

    onEnable() {
        let events: { [eventName: string]: Function; } = {};
        events[EventEnum.TOUCH_BUTTON_GREEN] = this._onGreenButton;
        EventManager.onAll(events, this);
        EventManager.on(EventEnum.TOUCH_BUTTON_BLUE, this._onBlueButton, this);
    }


    private _onGreenButton(params: any) {
        log("TOUCH_BUTTON_GREEN");
        this.labTest.string = "TOUCH_BUTTON_GREEN" + String(params);
    }

    private _onBlueButton(params: any) {
        log("收到事件：TOUCH_BUTTON_BLUE");
        this.labTest.string = "收到事件：TOUCH_BUTTON_BLUE" + String(params);
    }

    onGreenClick() {
        EventManager.emit(EventEnum.TOUCH_BUTTON_GREEN, "来自Green");
    }

    onBlueClick() {
        EventManager.emit(EventEnum.TOUCH_BUTTON_BLUE, "来自Blue");
    }
}
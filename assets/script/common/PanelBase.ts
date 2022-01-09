/*
 * @Author: rain
 * @Date: 2022-01-08 00:19:14
 * @LastEditTime: 2022-01-09 14:32:15
 * @LastEditors: rain
 * @Description: 面板基类
 * @FilePath: \rgf\assets\script\common\PanelBase.ts
 * 联系方式：w3333y@126.com
 */
import { Component } from "cc";
import { PanelType } from "../enum/CommonEnum";
import EventManager from "./EventManager";

export default class PanelBase extends Component {
    private _panelType: PanelType = PanelType.NONE;
    /** 界面类型 */
    public get panelType(): PanelType {
        return this._panelType;
    }
    public set panelType(value: PanelType) {
        this._panelType = value;
    }

    onLoad() {

    }

    onEnable() {

    }
    onDisable() {
        EventManager.offAll(this);
    }
}
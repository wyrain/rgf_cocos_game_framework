/*
 * @Author: rain
 * @Date: 2022-01-08 23:06:57
 * @LastEditTime: 2022-01-09 13:42:16
 * @LastEditors: rain
 * @Description: 首场景
 * @FilePath: \rgf\assets\script\BootScene\BootScene.ts
 * 代码如诗
 */
import { Component, instantiate, Node, Prefab, resources, _decorator } from "cc";
const { ccclass, menu, property } = _decorator;
@ccclass
@menu("BootScene")
export default class BootScene extends Component {
    @property(Node)
    panelLayer: Node = null;

    onLoad() {
        this._addFirstPanel();
    }

    private _addFirstPanel() {
        resources.load("prefab/FirstPanel", Prefab, (error, prefab) => {
            if (error) {
                return;
            }
            let panel: Node = instantiate(prefab);
            this.panelLayer.addChild(panel);
        });
    }
}
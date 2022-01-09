/*
 * @Author: rain
 * @Date: 2021-12-25 23:39:02
 * @LastEditTime: 2022-01-09 14:52:45
 * @LastEditors: rain
 * @Description: 事件管理类
 * @FilePath: \rgf\assets\script\common\EventManager.ts
 * 代码如诗
 */

export default class EventManager {
    /** 事件容器Map, 实时存储了所有事件, 以事件名为key */
    private static events: Map<string, Map<Object, Function>> = new Map();
    /** 事件记录Map, 存储了各对象身上注册的事件记录, 方便以对象为单位批量注销事件, 不可用于判断对象身上现存哪些事件 */
    private static eventInfo: Map<Object, Array<string>> = new Map();

    /** 注册事件
     * @param name 事件名
     * @param handler 事件回调
     * @param context 回调的调用者
     * @desc 事件重复注册会覆盖
     */
    static on(name: string, handler: Function, context: object) {
        // 存入容器
        if (!this.events.get(name)) {
            this.events.set(name, new Map());
        }
        let eMap: Map<object, Function> = this.events.get(name);
        eMap.set(context, handler);

        // 加上记录, 添加记录是不考虑重复的
        if (!this.eventInfo.get(context)) {
            this.eventInfo.set(context, []);
        }
        let objEvents: Array<string> = this.eventInfo.get(context);
        objEvents.push(name);
    }

    /** 注销事件
     * @param name 事件名
     * @param handler 事件回调
     * @param context 回调的调用者
     */
    static off(name: string, context: any) {
        let eMap: Map<object, Function> = this.events.get(name);
        if (!eMap) {
            console.warn(`事件&{name}未注册, 无需注销`);
            return;
        }
        // 移除事件
        eMap.delete(context);
    }

    /** 派发事件
     * @param name 事件名
     * @param params 传递的参数, 可不传但最多传一个, 需要传多个请用对象包起来
     */
    static emit(name: string, params?: any) {
        let eMap: Map<object, Function> = this.events.get(name);
        if (!eMap) {
            console.warn(`事件&{name}未注册, 无法派发`);
            return;
        }
        for (let [context, handler] of eMap.entries()) {
            handler.call(context, params);
        }
    };

    /** 为对象注册一组事件
     * @eventMap 待注册的事件, 类型:object<string: Function>, 示例: {name1:function1, name2:function2 ...}
     * @context 对象
     */
    static onAll(eventMap: object, context: object) {
        for (const eventName in eventMap) {
            let handler: Function = eventMap[eventName];
            this.on(eventName, handler, context);
        }
    }

    /** 注销对象绑定的全部事件
     * @context 对象
     */
    static offAll(context: object) {
        let infos: Array<string> = this.eventInfo.get(context);
        if (!infos) {
            console.warn(`对象上未检测到事件, 无需注销`);
            return;
        }
        // 移除对象身上的全部事件
        infos.forEach((eventName: string) => {
            this.off(eventName, context);
        });
        // 移除对象的事件记录
        this.eventInfo.delete(context);
    }
}


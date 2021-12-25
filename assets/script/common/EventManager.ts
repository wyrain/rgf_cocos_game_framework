/** rgf游戏开发框架
 * 事件管理类
 * Author: rain
 * Time: 2021-12-25
 */

/** 单个事件数据, 由调用者和回调组成 */
interface EventData {
    context: any;
    handler: Function;
}

export default class EventManager {
    /** 全部事件Map
     * 同一个事件名下, 可以有多个对象的事件注册, 使用数组将这些事件数据存起来
     */
    private static events: Map<string, EventData[]> = new Map();

    /** 注册事件
     * @param name 事件名
     * @param handler 事件回调
     * @param context 回调的调用者
     */
    static on(name: string, handler: Function, context: any) {
        if (!this.events.has(name)) {
            this.events.set(name, []);
        }
        let eventData: EventData = { context: context, handler: handler };
        this.events.get(name).push(eventData);
    }

    /** 注销事件
     * @param name 事件名
     * @param handler 事件回调
     * @param context 回调的调用者
     */
    static off(name: string, handler: Function, context: any) {
        let eventDataList: EventData[] = this.events.get(name);
        if (!eventDataList) {
            console.warn(`事件&{name}不存在`);
            return;
        }
        for (let i = 0, l = eventDataList.length; i < l; i++) {
            let eventData: EventData = eventDataList[i];
            if (!eventData.context || (eventData.context === context && eventData.handler === handler)) {
                eventDataList.splice(i, 1);
            }
        }
    }

    /** 派发事件
     * @param name 事件名
     * @param params 传递的参数, 可不传但最多传一个, 需要传多个请用对象包起来
     */
    static emit(name: string, params: any) {
        let eventDataList: EventData[] = this.events.get(name);
        if (!eventDataList) {
            console.warn(`事件&{name}不存在`);
            return;
        }
        for (let i = 0, l = eventDataList.length; i < l; i++) {
            const { handler, context }: EventData = eventDataList[i];
            handler.call(context, params);
        }
    };
}


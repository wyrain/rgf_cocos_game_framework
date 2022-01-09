/*
 * @Author: rain
 * @Date: 2022-01-09 16:10:33
 * @LastEditTime: 2022-01-09 18:21:58
 * @LastEditors: rain
 * @Description: 对象池
 * @FilePath: \rgf\assets\script\common\PoolManager.ts
 * 联系方式：w3333y@126.com
 */
import { instantiate, log, Node, NodePool, warn } from "cc";

export default class PoolManager {
    private static _instance: PoolManager = null;
    /** 单例 */
    static get instacne(): PoolManager {
        if (!this._instance) {
            this._instance = new PoolManager();
        }
        return this._instance;
    }

    _poolMap: Map<string, NodePool> = new Map();

    getNode(nodeName: string): Node {
        let pool: NodePool = this._poolMap.get(nodeName);
        if (!pool) {
            warn(`${nodeName}节电池不存在`);
            pool = new NodePool();
            this._poolMap.set(nodeName, pool);
        }
        let node: Node = pool.get();
        return node;
    }

    putNode(node: Node) {

    };

    createPool(poolName: string, prefab: Node, size: number) {
        let pool: NodePool = this._poolMap.get(poolName);
        if (!pool) {
            pool = new NodePool();
            this._poolMap.set(poolName, pool);
        }
        for (let i = 0, l = size; i < l; i++) {
            let node: Node = instantiate(prefab);
            pool.put(node);
        }
    }

    clearPool(poolName: string) {
        let pool: NodePool = this._poolMap.get(poolName);
        !!pool && pool.clear();
    }
};
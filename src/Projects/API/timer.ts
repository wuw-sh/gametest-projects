import {world} from "mojang-minecraft";

export interface Timer {
    cb: CallableFunction
    tick: number
    og?: number
}

export const Timers = class timers {
    protected _runtimeId = 0
    protected _intervals = new Map<number, Timer>()
    protected _timeouts = new Map<number, Timer>()

    public start() {
        world.events.tick.subscribe(() => {
            this._intervals.forEach((item, key) => {
                if (isNaN(item.og ?? NaN)) return this._intervals.delete(key)
                item.tick--
                if (item.tick > 0) return
                item.cb()
                item.tick = item.og!
            })
        })
        world.events.tick.subscribe(() => {
            this._timeouts.forEach((item, key) => {
                item.tick--
                if (item.tick > 0) return
                item.cb()
                this._timeouts.delete(key)
            })
        })
    }

    public setInterval = (callback: CallableFunction, tick: number): number => {
        const id = this._runtimeId++
        this._intervals.set(id, {
            cb: callback,
            tick,
            og: tick,
        })
        return id
    }

    public clearInterval = (id: number): void => {
        this._intervals.delete(id)
    }


    public setTimeout = (callback: CallableFunction, tick: number): number => {
        const id = this._runtimeId++
        this._timeouts.set(id, {
            cb: callback,
            tick,
        })
        return id
    }

    public clearTimeout = (id: number): void => {
        this._timeouts.delete(id)
    }
}
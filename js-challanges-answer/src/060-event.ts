class EventEmitter {
    listeners = {}
    on(event, cb){
        if(!this.listeners[event]){
            this.listeners[event] = []
        }
        this.listeners[event].push(cb)
    }
    once(event, cb) {
        const tempFn = () => {
            try{
                cb();
            }finally {
                this.off(event, tempFn)
            }
        }
        this.on(event, tempFn)
    }
    emit(event, ...args){
        const listenersList = this.listeners[event] || []
        listenersList.forEach(cb => {
            try{
                cb(...args)
            } catch (e){
                console.error(e);
            }
        })
    }
    off(event, fn){
        const listenersList = this.listeners[event] || []
        const index = listenersList.indexOf(fn);
        if (index !== -1) {
            listenersList.splice(index, 1); // 改动的注释：使用splice来删除元素
        }
    }
}

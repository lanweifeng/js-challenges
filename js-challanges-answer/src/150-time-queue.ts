
class Queue {
    private promiseChain = Promise.resolve()

    private record: any[] = []

    task (time, fn: Function) {

        this.record.push({time, fn})

        return this
    }

    start () {

        this.record.forEach(item => {
            this.promiseChain = this.promiseChain.then(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        item.fn()
                        resolve()
                    }, item.time)
                })
            })
        })

    }
}

const i = new Queue()
    .task(1000, () => {
        console.log(Date.now() ,1)
    })
    .task(2000, () => {
        console.log(Date.now())
    })
    .task(1000, () => {
        console.log(Date.now(), 3)
    })
    .start()

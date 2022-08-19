interface IState {
    debounceID: NodeJS.Timeout;
    func: string;
}
const states: IState[] = []

/**
 * 
 * @param {T} func 
 */
function removeDebounce<T extends (...args: any[]) => any>(func: T): void {
    for (let i = 0, length = states.length; i < length; i++) {
        if (states[i].func === func.toString()) {
            states.splice(i, 1)
            return
        }
    }
}

/**
 * 処理を指定時間遅らせるてから実行できる。処理が実行される前に同じ処理が再びやってきたら、もう一度遅延しなおす
 * @param {T} func 
 * @param {number} wait 
 * @return {any}
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait?: number): () => Promise<any> {
    const returnFunc = () => {
        const promise = new Promise<any>((resolve, reject) => {
            // 同じ処理が既に遅延待ちじゃないか探す
            for (let i = 0, length = states.length; i < length; i++) {
                if (states[i].func === func.toString()) {
                    clearTimeout(states[i].debounceID)
                    states.splice(i, 1)
                    break
                }
            }

            const debounceID = setTimeout(() => {
                resolve(func())
            }, wait)
            states.push({ debounceID: debounceID, func: func.toString() })
        }).then((val) => {
            removeDebounce(func)
            // promiseでresolveした値をreturnできる。
            return val
        })
        return promise
    }
    // promise を返す関数を返す。こうすると宣言と実行を分けることができる。
    return returnFunc
}

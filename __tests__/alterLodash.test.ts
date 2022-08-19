import { debounce } from "../src/alterLodash"

describe('alterLodash', () => {
    test('2秒後に実行され、200が返ってくる', () => {
        const func = () => {
            return 200
        }
        const db = debounce(func, 2000)
        const prevTime = new Date()
        const promise = db()
        return promise.then((val) => {
            const nowTime = new Date()
            const diff = nowTime.getTime() - prevTime.getTime()
            console.log(diff)
            expect(2000 < diff).toEqual(true)
            expect(val).toEqual(200)
        })
    })
})
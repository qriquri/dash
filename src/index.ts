import { debounce } from "./alterLodash";
import Curl from "./Curl";
 
const test = () => {
    const log = () => {
        console.log("hoge")
        return 200
    }
    const log2 = () => {
        console.log("hogehoge")
        return 400
    }
    const db = debounce(log, 2000)
    db()
    // const promise = db()
    // promise.then((val) => {console.log("foo", val)})
    console.log("fuga")
    const db2 = debounce(log, 2000)
    db2()
    // const promise2 = db2()
    // promise2.then((val) => {console.log("foo", val)})
    
    // const curl = new Curl();
    // console.log(process.argv);
    // httpリクエスト開始
    // await curl.send(process.argv);
      
}

test();

import * as O from 'fp-ts/Option'
export const tryParse = <T> (data : any) : O.Option<T>  => { 
    try {
        const ret : T = data
        return O.some(ret)
    }
    catch {
        console.log("invalid format")
        return O.none
    }
}
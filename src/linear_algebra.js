
let dot = (v1, v2) => {
    return v1.x * v2.x + v1.y * v2.y
}

let scale = (t , v) => {
    return {x:v.x*t, y:v.y*t}
}

let normalization = (v) => {
    let t = Math.sqrt(dot(v, v))
    return scale(t, v)
}

let distance = (v1, v2) =>{
    let v = minus(v1, v2)
    return Math.sqrt(dot(v,v))
}

let minus = (v1, v2) => {
    return {x:v2.x - v1.x, y:v2.y - v1.y}
}

let plus = (v1, v2) => {
    return {x:v1.x + v2.x, y:v1.y + v2.y}
}
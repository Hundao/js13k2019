
let dot = (v1, v2) => {
    return v1.x * v2.x + v1.y * v2.y
}

let scale = (t , v) => {
    return [v.x*t, v.y*t]
}

let normalization = (v) => {
    let t = Math.sqrt(dot(v, v))
    return scale(t, v)
}

let distance = (v1, v2) =>{
    let v = minus(v1, v2)
    return Math.sqrt(v, v)
}

let minus = (v1, v2) => {
    return [v2.x - v1.x, v2.y - v1.y]
}

let plus = (v1, v2) => {
    return [v1.x + v2.x, v1.y + v2.y]
}
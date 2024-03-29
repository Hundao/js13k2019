
let dot = (v1, v2) => {
    return v1[0] * v2[0] + v1[1] * v2[1]
}

let scale = (t , v) => {
    return [v[0] * t, v[1] * t]
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
    return [v2[0] - v1[0], v2[1] - v1[1]]
}

let plus = (v1, v2) => {
    return [v1[0] + v2[0], v1[1] + v2[1]]
}

let randomRange = (n1, n2)=>{
    if(n1 > n2) throw new Error(`n1-${n1} must bigger than n2-${n2}`)

    let dis = n2 - n1
    return n1 + Math.floor(Math.random()*dis)
}
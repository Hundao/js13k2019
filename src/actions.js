
let jump = function(){
    let group = groups['hero']
    group.elements.forEach((e)=>{
        e.f.y -= 1e12
    })
}

let font = function(){
    let group = groups['hero']
    group.elements.forEach((e)=>{
        e.f.x += 1e11
    })
}

let back = function(){
    let group = groups['hero']
    group.elements.forEach((e)=>{
        e.f.x -= 1e11
    })
}
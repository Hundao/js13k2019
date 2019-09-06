
// jump
actions['c'] = function(){
    let group = groups['hero']
    group.elements.forEach((e)=>{
        e.f.y -= 1e11   
    })
}
 
actions['right'] = function(){
    let group = groups['hero']
    group.elements.forEach((e)=>{
        e.f.x += 1e11
    })
}

actions['left'] = function(){
    let group = groups['hero']
    group.elements.forEach((e)=>{
        e.f.x -= 1e11
    })
}

actions['down'] = function(){

    let group = groups['hero']
    group.elements.forEach((e)=>{
        e.f.y += 1e11
    })
}

actions['up'] = function(){

    let group = groups['hero']
    group.elements.forEach((e)=>{
        e.f.y -= 1.5e10
    })
}

actions['q'] = function(){
    running = heroTimeBack
}

antiActions['q'] = function(){
    console.log('anti action q launch')
    running = gaming
}
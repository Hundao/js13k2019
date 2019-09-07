
// jump
actions['c'] = function(){
    let group = groups['hero']
    if(group.canJump){

        let fun =(e)=>{
            e.f[1] -= 5e11
        }

        if(controlKeys['left']){
            fun = (e)=>{
                e.f[1] -= 5e11
                e.f[0] += 5e11
            }
        }



        if(controlKeys['right']){
            fun = (e)=>{
                e.f[1] -= 5e11
                e.f[0] -= 5e11
            }
        }

        group.elements.forEach(fun)
        group.canJump = false
    }
}
 
actions['right'] = function(){
    let group = groups['hero']
    
    group.elements.forEach((e)=>{
        e.f[0] += 1e11
    })
}

actions['left'] = function(){
    let group = groups['hero']
    group.elements.forEach((e)=>{
        e.f[0] -= 1e11
    })
}

actions['down'] = function(){

    let group = groups['hero']
    group.elements.forEach((e)=>{
        e.f[1] += 1e11
    })
}

actions['up'] = function(){

    let group = groups['hero']
    group.elements.forEach((e)=>{
        e.f[1] -= 1.5e10
    })
}

actions['q'] = function(){
    console.log('0-1')
    running = heroTimeBack
}

actions['w'] = function(){
    console.log('0-2')
    running = enemyTimeBack
}

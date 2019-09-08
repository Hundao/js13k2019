
// jump
actions['c'] = function () {
    let group = groups['hero']
    if (group.canJump) {

        let fun = (e) => {
            e.f[1] -= 1.5e12
        }

        if (controlKeys['left']) {
            fun = (e) => {
                e.f[1] -= 5e11
                // e.f[0] += 5e11
            }
        }

        if (controlKeys['right']) {
            fun = (e) => {
                e.f[1] -= 5e11
                // e.f[0] -= 5e11
            }
        }

        group.elements.forEach(fun)
        group.canJump = false
    }
}

actions['right'] = function () {
    let group = groups['hero']

    group.elements.forEach((e) => {
        e.f[0] += 1e11
    })
    group.face = [1, 0]
}

actions['left'] = function () {
    let group = groups['hero']
    group.elements.forEach((e) => {
        e.f[0] -= 1e11
    })
    group.face = [-1, 0]
}

actions['down'] = function () {

    let group = groups['hero']
    group.elements.forEach((e) => {
        e.f[1] += 1e11
    })
}

actions['up'] = function () {

    let group = groups['hero']
    group.elements.forEach((e) => {
        e.f[1] -= 1.5e10
    })
}

actions['q'] = function () {
    running = heroTimeBack
}

actions['w'] = function () {
    running = enemyTimeBack
}

actions['x'] = function () {
    if(bowForce < 200)
        bowForce+=1
    console.log(bowForce)
    shooting = true
}

antiActions['x'] = function(){

}
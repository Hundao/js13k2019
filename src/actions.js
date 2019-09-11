
// jump
actions['c'] = function () {
    let group = groups['hero']
    if (hero.canJump) {

        let fun = (e) => {
            e.f[1] -= 1e12
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
        playJumpAudio()
        hero.canJump = false
    }
}

actions['right'] = function () {
    hero.f[0] += 1e11
    hero.face = 1
    moving = true
}

actions['left'] = function () {
    hero.f[0] -= 1e11
    hero.face = -1
    moving = true
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
    shooting = true
}

antiActions['x'] = function(){

}

actions['m'] = function() {
    stopMusic()
}


// move ground first time
events.push((i, force) => {
    if (!happend[i]) return

    if (hero.pos[0] > 1078 && hero.pos[1] > 450 || force) {
        running = eventing
        groupMove('ground', 5, 0, -130)
        groupMove('ground', 6, 1, 150)
        happend[i] = false
    }

})

// close boss
events.push((i, force) => {
    if (!happend[i]) return

    if (hero.pos[0] > 2200 && hero.pos[1] > 450 || force) {
        running = eventing
        groupMove('ground', 6, 1, -150)

        happend[i] = false
    }
})

// init boss and fix view
events.push((i, force) => {
    if (!happend[i]) return

    if (hero.pos[0] > 2340 || force) {
        fixed = true
        vx = 1955

        toolTextIndex = -1

        groupMove('boss', 0, 0, -200)

        setTimeout(() => {
            bossActive = true
            enemyView = 1000
        }, 3000)

        setTimeout(() => {
            boss.skill.canSummon = true
        }, randomRange(1000, 3000))

        setTimeout(() => {
            boss.skill.canDestory = true
        }, 15000)

        happend[i] = false
    }

})


//show tool tik
events.push((i) => {
    let enm = groups['enemy'].elements.filter((e) => e.id === 3)

    if (happend[i]) {
        if (cycler === 1 && enm.length === 0) {
            setTimeout(() => {
                toolTextIndex = 3
                hero.canBack = true
            }, 3000)
        }

    }

    if (hero.pos[1] < 140 && toolTextIndex === 3) {
        toolTextIndex = -1
        happend[i] = false
    }
})

let isSave = true
events.push((i)=>{
    if (happend[i]){
        if(hero.pos[0] > 1910 && hero.pos[0] < 2000){
            toolTextIndex = -1
            
            if(isSave) {
                save()
                isSave = false
            }

            happend[i] =false
        }
    }
})

let groupMove = (groupKey, index, dir, dis) => {

    let divide = dis * 0.01
    let e = groups[groupKey].elements[index]
    let oriLt = e.lt[dir]

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            e.lt[dir] += divide
        }, 20 * i)
    }

    setTimeout(() => {
        running = gaming
        e.pos[dir] += dis
        e.rd[dir] += dis
        e.lt[dir] = oriLt + dis
    }, 2000)
}



let skepEvent = () => {
    running = eventing
    groupMove(5, 0, -130)
    groupMove(6, 1, 150)
    running = eventing
    // groupMove(6, 1, -150)

    happend[0] = false
    happend[1] = false
}


let showBoss = () => {
    vx = 1955
    fixed = true
}

//----------------------- save and load function

let save = () => {
    console.log('save fixed', fixed)
    let snapshot = {
        happend,
        groups,
        vx,
        bossActive,
        fixed
    }
    globalSnapshot = JSON.stringify(snapshot)

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            saveCap = i * 0.01
        }, i * 10)

        setTimeout(()=>{
            saveCap = ( 99 - i) * 0.01
        }, i * 10 + 2000)
    }

}

let load = () => {
    let load = JSON.parse(globalSnapshot)
    groups = load.groups
    vx = load.vx
    happend = load.happend
    bossActive = load.bossActive
    fixed = load.fixed
    hero = load.groups['hero'].elements[0]
    boss = load.groups['boss'].elements[0]
    
    boss.skill = {
        canDestory: false,
        canSummon: false
    }
    groups['enemy'].elements.forEach((e)=>{
        e.canMove = true
    })
    heroSnapshot = []
}

//----------------------- starting event

let tutorMove = () => {
    if (hero.pos[0] <= 95) {
        toolTextIndex = 0
    }
}

let tutorJump = () => {
    if (hero.pos[0] > 95 && hero.pos[1] > 400) {
        toolTextIndex = 1
    }
}

let tutorAttack = () => {
    if (hero.pos[0] > 172 && hero.pos[0] < 280) {
        toolTextIndex = 2
    }
}

startEvents.push(
    tutorMove,
    tutorJump,
    tutorAttack
)
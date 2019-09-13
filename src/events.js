

events.push((i, force) => {
    if (!happend[i]) return

    if (hero.pos[0] > 1078 && hero.pos[1] > 450 || force) {
        running = eventing
        groupMove('ground', 5, 0, -130)
        groupMove('ground', 6, 1, 150)
        happend[i] = false
    }

})


events.push((i, force) => {
    if (!happend[i]) return

    if (hero.pos[0] > 2200 && hero.pos[1] > 450 || force) {
        running = eventing
        groupMove('ground', 6, 1, -150)

        happend[i] = false
    }
})

events.push((i, force) => {
    if (!happend[i]) return

    if (hero.pos[0] > 2340 || force) {
        fixed = true
        vx = 1955


        groupMove('boss', 0, 0, -200)

        setTimeout(() => {
            bossActive = true
            enemyView = 1000
        }, 3000)

        setTimeout(() => {
            boss.skill.canSummon = true
        }, randomRange(1000, 3000))

        setTimeout(()=>{
            boss.skill.canDestory = true
        }, 15000)

        happend[i] = false
    }

})

events.push((i)=>{
    let enm = groups['enemy'].elements.filter((e)=>e.id===3)
    
    if(happend[i]){
        if(cycler === 1 && enm.length ===0){
            setTimeout(()=>{
                toolTextIndex = 3
                hero.canBack = true
            }, 3000)
        }
    
        if(hero.pos[1] < 140 && toolTextIndex === 3){
            toolTextIndex = -1
            happend[i] = false
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



//----------------------- starting event

let tutorMove = () =>{
    if(hero.pos[0] <= 95){
        toolTextIndex = 0
    }
}

let tutorJump = () =>{
    if(hero.pos[0] > 95 && hero.pos[1] > 400){
        toolTextIndex = 1
    }
}

let tutorAttack = () =>{
    if(hero.pos[0] > 172 && hero.pos[0] < 280){
        toolTextIndex = 2
    }
}

startEvents.push(
    tutorMove,
    tutorJump,
    tutorAttack
)


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
// vx = 1955
// fixed = true
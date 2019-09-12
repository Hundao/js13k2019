let handleArrowContact = () => {

    let dead = {}

    //handle with group

    for (let key in difGupContacts['arrow-ground'].contactPlanes) {
        let plane = difGupContacts['arrow-ground'].contactPlanes[key]
        if (plane.isEverContact) {
            dead[plane.element1Index] = true
        }
    }

    for (let key in difGupContacts['arrow-enemy'].contactPlanes) {
        let plane = difGupContacts['arrow-enemy'].contactPlanes[key]
        if (plane.isEverContact) {
            dead[plane.element1Index] = true
            groups['enemy'].elements[plane.element2Index].hp -= hero.atk
        }
    }

    for (let key in difGupContacts['arrow-boss'].contactPlanes) {
        let plane = difGupContacts['arrow-boss'].contactPlanes[key]
        if (plane.isEverContact) {
            dead[plane.element1Index] = true
        }
    }

    //handle arrive bounding
    groups['arrow'].elements.forEach((e, i) => {
        if (e.lt[0] <= bound.lX + 1 || e.rd[0] >= bound.uX - 1) {
            dead[i] = true
        }
    })


    groups['arrow'].elements = groups['arrow'].elements.filter((e, i) => {
        return (!dead[i])
    })

    difGupContacts['arrow-ground'].contactPlanes = {}
    difGupContacts['arrow-enemy'].contactPlanes = {}
    difGupContacts['arrow-boss'].contactPlanes = {}
}

let handleEnemyMove = () => {
    let enemys = groups['enemy'].elements

    enemys.forEach((e) => {
        if (e.canMove) {
            let dis = distance(hero.pos, e.pos)
            if (dis < enemyView) {
                let target = hero.pos[0] > e.pos[0] ? 1 : -1
                e.face = target
                e.f = plus(e.f, scale(3e12, [target, -10]))

                e.canMove = false
                setTimeout(() => e.canMove = true, 100)
            }
        }
    })

}

let handleViewMove = () => {

    if (fixed) return

    let pos = hero.pos
    let lower = pos[0] - w * 0.5
    let upper = pos[0] + w * 0.5

    if (lower > 0) {
        if (upper < mapw) {
            vx = lower
        }
    }
    else {
        vx = 0
    }
}


let handleHeroAttaced = () => {
    if(hero.isSuper) return 

    for (let key in difGupContacts['enemy-hero'].contactPlanes) {
        let plane = difGupContacts['enemy-hero'].contactPlanes[key]
        if (plane.isEverContact) {
            hero.isSuper = true
            console.log(plane)
            hero.hp -= groups['enemy'].elements[plane.element1Index].atk

            setTimeout(() => {
                hero.isSuper = false
            }, superTime)
        }
    }

}


let handleControl = () => {
    moving = false

    for (let key in controlKeys) {
        if (controlKeys[key]) {
            if (actions[key]) {
                actions[key]()
            }
        }
    }

    if (controlKeys['q']) {
        stopMusic()
        playReserverMusic()
    }
}

let handleShooting = () => {
    if (shooting && !controlKeys['x']) {
        let v = scale(bowForce, [hero.face, -0.1])

        playShootMusic()
        groups['arrow'].elements.push(
            new Arrow(
                hero.pos[0],
                hero.pos[1],
                10,
                10,
                v[0],
                v[1],
                200,
                hero.face
            )
        )

        bowForce = 100
        shooting = false
    }
}

let handleHeroCanJump = () => {
    for (let key in difGupContacts) {
        if (key.indexOf('hero') === -1) continue

        let planes = difGupContacts[key].contactPlanes

        for (let key2 in planes) {
            if(hero.canJump) continue
            if (planes[key2].isEverContact) {
                hero.canJump = true
                break
            }
        }
    }


    for (let key in difGupContacts) {
        if (key.indexOf('hero') === -1) continue

        let planes = difGupContacts[key].contactPlanes
        for (let key2 in planes) {
            planes[key2].isEverContact = false
        }
    }

}

handleBossActive = () =>{
    if(!bossActive) return

    if(boss.skill.canSummon){

        let number = Math.floor(Math.random() * 3) + 1

        let enemys = groups['enemy'].elements
        for(let i = 0; i < number ; i++){
            enemys.push(new Enemy(2530 + i * 100, 400, 100, 100, 0, 0, 55, monsterSkin2, 150, 12))
        }


        boss.skill.canSummon = false
        setTimeout(()=>{
            boss.skill.canSummon = true
        }, randomRange(cd.summon[0], cd.summon[1]))
    }

    if(boss.skill.canDestory){
        boss.skill.canDestory = false

        setTimeout(()=>{
            boss.skill.canDestory = true
        }, randomRange(cd.destory[0], cd.destory[1]))
    }
}

let handleEnemyDie = () =>{
    groups['enemy'].elements = groups['enemy'].elements.filter((e)=>{
        return e.hp > 0
    })
}

let handleResetContactPlane = () =>{
    for(let key in difGupContacts){
        difGupContacts[key].contactPlanes = {}
    }
    
    for(let key in sameGupContacts){
        sameGupContacts[key].contactPlanes = {}
    }
}

let handleMakeSnapshot = () => {
    for (let key in groups) {
        let group = groups[key]

        let snapshot = {
            elements: []
        }

        for (let i in group.elements) {
            let e = group.elements[i]
            snapshot.elements.push({
                pos: [e.pos[0], e.pos[1]],
                v: [e.v[0], e.v[1]],
                lt: [e.lt[0], e.lt[1]],
                rd: [e.rd[0], e.rd[1]]
            })
        }
        snapshot.vx = vx

        group.snapshots.push(snapshot)
    }
}

let handleEnemyTimeBack = () => {
    let group = groups['enemy']

    if (group.snapshots.length > 0) {
        _copyState(group)
        group.snapshots.pop()
    } else {
        console.log('snapshot is no more')
    }
}

let handleHeroTimeBack = () => {

    let group = groups['hero']

    if (group.snapshots.length > 0) {
        _copyState(group, true)
        group.snapshots.pop()
    } else {
        console.log('snapshot is no more')
    }
}

let _copyState = (group, move = false) => {
    let snapshot = group.snapshots[group.snapshots.length - 1]

    for (let i in group.elements) {
        let e = group.elements[i]
        e.pos[0] = snapshot.elements[i].pos[0]
        e.pos[1] = snapshot.elements[i].pos[1]
        e.lt[0] = snapshot.elements[i].lt[0]
        e.lt[1] = snapshot.elements[i].lt[1]
        e.rd[0] = snapshot.elements[i].rd[0]
        e.rd[1] = snapshot.elements[i].rd[1]
        e.v[0] = snapshot.elements[i].v[0]
        e.v[1] = snapshot.elements[i].v[1]
    }

    if (move) {
        vx = snapshot.vx
    }
}

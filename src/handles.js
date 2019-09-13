let handleArrowContact = () => {

    let dead = {}

    let deadRock = {}

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
            boss.hp -= hero.atk
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

    if(groups['rock']){
        groups['rock'].elements.forEach((e,i )=>{
            if (e.lt[1] <= bound.lY + 1 || e.rd[1] >= bound.uY - 1) {
                console.log('rock dead')
                deadRock[i] = true
            }
        })
    
        groups['rock'].elements = groups['rock'].elements.filter((e, i) => {
            return (!deadRock[i])
        })
    }

    difGupContacts['arrow-ground'].contactPlanes = {}
    difGupContacts['arrow-enemy'].contactPlanes = {}
    difGupContacts['arrow-boss'].contactPlanes = {}
}

let handleEnemyMove = () => {
    let enemys = groups['enemy'].elements

    enemys.forEach((e) => {
        let vel = enemyVeclocity * (1 + cycler * 0.4)
        if (e.canMove) {
            let dis = distance(hero.pos, e.pos)
            if (dis < enemyView) {
                let target = hero.pos[0] > e.pos[0] ? 1 : -1
                e.face = target

                e.f = plus(e.f, scale(vel, [target, -10]))

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
    if (!hero.isSuper) {
        for (let key in difGupContacts['enemy-hero'].contactPlanes) {
            let plane = difGupContacts['enemy-hero'].contactPlanes[key]
            if (plane.isEverContact) {
                hero.isSuper = true
                hero.hp -= groups['enemy'].elements[plane.element1Index].atk

                setTimeout(() => {
                    hero.isSuper = false
                }, superTime)
            }
        }
    }

    for (let key in difGupContacts['hero-rock'].contactPlanes) {
        let plane = difGupContacts['hero-rock'].contactPlanes[key]
        if (plane.isEverContact) {

            hero.hp = -1
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

    if (controlKeys['z']) {
        if (hero.canBack) {
            stopMusic()
            playReserverMusic()
        }
    }
}

let handleShooting = () => {
    if (shooting && !controlKeys['x']) {
        let v = scale(bowForce, [hero.face, -0.1])

        playShootMusic()

        if (cycler > 1) {
            groups['arrow'].elements.push(
                new Arrow(
                    hero.pos[0],
                    hero.pos[1] - 4,
                    10,
                    10,
                    v[0],
                    v[1],
                    200,
                    hero.face
                )
            )

            groups['arrow'].elements.push(
                new Arrow(
                    hero.pos[0],
                    hero.pos[1] + 6,
                    10,
                    10,
                    v[0],
                    v[1],
                    200,
                    hero.face
                )
            )
        }
        else {
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
        }

        bowForce = 100
        shooting = false
    }
}

let handleHeroCanJump = () => {
    for (let key in difGupContacts) {
        if (key.indexOf('hero') === -1) continue

        let planes = difGupContacts[key].contactPlanes

        for (let key2 in planes) {
            if (hero.canJump) continue
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

handleBossActive = () => {
    if (!bossActive) return

    if (boss.skill.canSummon) {

        let number = Math.floor(Math.random() * 3) + 1

        let enemys = groups['enemy'].elements
        let hp = 100 * (1 + cycler * 0.4)
        let atk = 12 * (1 + cycler * 0.4)

        for (let i = 0; i < number; i++) {
            enemys.push(new Enemy(2530 + i * 100, 400, 100, 100, 0, 0, 55, monsterSkin2, hp, atk, 10))
        }


        boss.skill.canSummon = false

        timeouts.push(
            setTimeout(() => {
                boss.skill.canSummon = true
            }, randomRange(cd.summon[0], cd.summon[1]))
        )
    }

    if (boss.skill.canDestory) {
        boss.skill.canDestory = false

        let m = Math.floor(Math.random() * 4)
        switch (m) {
            case 0:
                groups['rock'].elements.push(
                    new Rectangle(2700, 2, 20, h -2, -30, 0, 200)
                )
                break;
            case 1:
                groups['rock'].elements.push(
                    new Rectangle(1800, 2, 20, h - 2, 30, 0, 200)
                )
                break;
            case 2:
                if (cycler >= 3) {
                    console.log('create a new row down')
                    groups['rock'].elements.push(
                        new Rectangle(1800, 2, 1200, 20, 0, 15, 200)
                    )
                }
                else {
                    console.log('create a new row up')
                    groups['rock'].elements.push(
                        new Rectangle(1800, 678, 1200, 20, 0, -15, 200)
                    )
                }
                break;
            case 3:
                    console.log('create a new row up')
                groups['rock'].elements.push(
                    new Rectangle(1800, 678, 1200, 20, 0, -20, 200)
                )
                break;
        }

        timeouts.push(
            setTimeout(() => {
                boss.skill.canDestory = true
            }, randomRange(cd.destory[0], cd.destory[1]))
        )
    }
}

let handleEnemyDie = () => {
    groups['enemy'].elements = groups['enemy'].elements.filter((e) => {
        return e.hp > 0
    })

    if (boss) {
        if (boss.hp < 0) {
            running = winning

            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    winCap = i * 0.01
                }, i * 50)
            }
            setTimeout(() => {
                cycler++
                initGaming()
                running = gaming
            }, 5000)
        }
    }
}

let handleResetContactPlane = () => {
    for (let key in difGupContacts) {
        difGupContacts[key].contactPlanes = {}
    }

    for (let key in sameGupContacts) {
        sameGupContacts[key].contactPlanes = {}
    }
}

let handleMakeSnapshot = () => {
    heroSnapshot.push({
        pos: [hero.pos[0], hero.pos[1]],
        v: [hero.v[0], hero.v[1]],
        lt: [hero.lt[0], hero.lt[1]],
        rd: [hero.rd[0], hero.rd[1]],
        vx,
        hp: hero.hp,
        face: hero.face
    })
    // for (let key in groups) {
    //     let group = groups[key]

    //     let snapshot = {
    //         elements: []
    //     }

    //     for (let i in group.elements) {
    //         let e = group.elements[i]
    //         snapshot.elements.push()
    //     }
    //     snapshot.vx = vx

    //     group.snapshots.push(snapshot)
    // }
}

let handleHeroDie = () => {
    if (hero.hp < 0) {
        running = dieing

        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                dieCap = i * 0.01
            }, i * 20)
        }

        setTimeout(() => {
            load()
            running = gaming
        }, 2000)
    }
}

// let handleEnemyTimeBack = () => {
//     let group = groups['enemy']

//     if (group.snapshots.length > 0) {
//         _copyState(group)
//         group.snapshots.pop()
//     } else {
//         console.log('snapshot is no more')
//     }
// }

let handleHeroTimeBack = () => {
    console.log('back tracking !!!')
    if (heroSnapshot.length > 0) {
        let snapshot = heroSnapshot[heroSnapshot.length - 1]
        hero.pos[0] = snapshot.pos[0]
        hero.pos[1] = snapshot.pos[1]
        hero.lt[0] = snapshot.lt[0]
        hero.lt[1] = snapshot.lt[1]
        hero.rd[0] = snapshot.rd[0]
        hero.rd[1] = snapshot.rd[1]
        hero.v[0] = snapshot.v[0]
        hero.v[1] = snapshot.v[1]
        hero.hp = snapshot.hp
        hero.face = snapshot.face

        vx = snapshot.vx

        heroSnapshot.pop()
    }
    else {
        console.log('snapshot is no more')
    }

    // let group = groups['hero']

    // if (group.snapshots.length > 0) {
    //     _copyState(group, true)
    //     group.snapshots.pop()
    // } else {
    //     console.log('snapshot is no more')
    // }
}

// let _copyState = (group, move = false) => {
//     let snapshot = group.snapshots[group.snapshots.length - 1]

//     for (let i in group.elements) {
//         let e = group.elements[i]
//         e.pos[0] = snapshot.elements[i].pos[0]
//         e.pos[1] = snapshot.elements[i].pos[1]
//         e.lt[0] = snapshot.elements[i].lt[0]
//         e.lt[1] = snapshot.elements[i].lt[1]
//         e.rd[0] = snapshot.elements[i].rd[0]
//         e.rd[1] = snapshot.elements[i].rd[1]
//         e.v[0] = snapshot.elements[i].v[0]
//         e.v[1] = snapshot.elements[i].v[1]
//     }

//     if (move) {
//         vx = snapshot.vx
//     }
// }


//----------------------------------------------- Handle Starting Page------------------------------------------------


let handleIdel = () => {
    if (hero.pos[1] > 700) {
        initStarting()
    }
}

let handleEnterGaming = () => {
    if (groups['enemy'].elements.length === 0) {
        running = gaming
        initGaming()
    }
}
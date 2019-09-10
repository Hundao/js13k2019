// using for control the game's flow 

let gaming = () => {
    handleViewMove()
    drawBackground()
    drawGround()
    drawHero()
    drawEnemy()
    drawArrow()
    drawHead()

    for (let i = 0; i < 100; i++) {
        demStep()
    }

    handleControl()
    handleArrowContact()
    handleEnemyMove()
    handleHeroAttaced()
    makeSnapshot()

    events.forEach((e,i )=>e(i))
}

let eventing = () =>{
    drawBackground()
    drawGround()
    drawHero()
    drawEnemy()
    drawArrow()
    drawHead()
}

function execute() {
    running();
    requestAnimationFrame(execute)
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

    if (shooting && !controlKeys['x']) {
        let arrow = groups['arrow']
        let hero = groups['hero'].elements[0]
        let v = scale(bowForce, [hero.face, -0.1])
        playShootMusic()
        arrow.elements.push(
            new Rectangle(
                arrow.elements.length,
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

    if(controlKeys['q']){
        stopMusic()
        playReserverMusic()
    }
}


let makeSnapshot = () => {
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

let heroTimeBack = () => {
    drawBackground()
    drawGround()
    drawEnemy()
    drawHero()
    drawArrow()

    drawBackEffect('rgb(34, 150, 227, 0.08', 'rgb(0, 183, 255, 1')

    let group = groups['hero']

    if (group.snapshots.length > 0) {
        _copyState(group, true)
        group.snapshots.pop()
    } else {
        console.log('snapshot is no more')
    }


    if (controlKeys['q'] === false) {
        running = gaming
        stopReserverMusic()
        playMusic()
    }

}

let enemyTimeBack = () => {
    drawBackground()
    drawGround()
    drawEnemy()
    drawHero()
    drawArrow()

    drawBackEffect('rgb(63, 64, 61, 0.1', 'rgb(227, 32, 64, 1')

    let group = groups['enemy']

    if (group.snapshots.length > 0) {
        _copyState(group)
        group.snapshots.pop()
    } else {
        console.log('snapshot is no more')
    }

    if (controlKeys['w'] === false) {
        running = gaming
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

let handleArrowContact = ()=>{

    let dead = {}

    //handle with group
    
    for(let key in difGupContacts['arrow-ground'].contactPlanes){
        let plane = difGupContacts['arrow-ground'].contactPlanes[key]
        if(plane.isContact){
            dead[plane.element1Index] = true
        }
    }

    for(let key in difGupContacts['arrow-enemy'].contactPlanes){
        let plane = difGupContacts['arrow-enemy'].contactPlanes[key]
        if(plane.isContact){
            dead[plane.element1Index] = true
        }
    }

    //handle arrive bounding
    groups['arrow'].elements.forEach((e, i)=>{
        if(e.lt[0] <= bound.lX+1 || e.rd[0] >= bound.uX -1 ){
            dead[i] = true
        } 
    })


    groups['arrow'].elements = groups['arrow'].elements.filter((e, i)=>{
        return (!dead[i])
    })

    difGupContacts['arrow-ground'].contactPlanes= {}
    difGupContacts['arrow-enemy'].contactPlanes= {}
}

let handleHeroAttaced = ()=>{
    for(let key in difGupContacts['enemy-hero'].contactPlanes){
        let plane = difGupContacts['enemy-hero'].contactPlanes[key]
        if(plane.isContact && groups['hero'].isSuper === false){
            groups['hero'].isSuper = true
            user.hp -= 10

            setTimeout(()=>{
                groups['hero'].isSuper = false
            })
        }
    }

}

let handleEnemyMove = () =>{
    let enemys = groups['enemy'].elements
    let hero = groups['hero'].elements[0]


    enemys.forEach((e)=>{
        if(e.canMove){
            let dis = distance(hero.pos, e.pos)
            if(dis < 500){
                let target = hero.pos[0] > e.pos[0] ? 1 : -1
                e.face = target
                e.f = plus(e.f, scale(3e12, [target, -10]))
                
                e.canMove = false
                setTimeout(()=>e.canMove= true, 100)
            }
        }
    })

}

let handleViewMove = () => {

    if(fixed) return

    let pos = groups['hero'].elements[0].pos
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

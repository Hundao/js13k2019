// using for control the game's flow 

let gaming = () => {
    drawBackground()
    drawGround()
    drawHero()
    drawEnemy()

    for (let i = 0; i < 100; i++) {
        demStep()
    }

    handleControl()
    makeSnapshot()
}


function execute() {
    running();
    requestAnimationFrame(execute)
}

let handleControl = () => {
    for (let key in controlKeys) {
        if (controlKeys[key]) {
            if (actions[key]) {
                actions[key]()
            }
        }
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
    drawBackEffect('rgb(34, 150, 227, 0.08', 'rgb(0, 183, 255, 1')

    let group = groups['hero']

    if (group.snapshots.length > 0) {
        _copyState(group, true)
        group.snapshots.pop()
    }else{
        console.log('snapshot is no more')
    }

    if (controlKeys['q'] === false) {
        running = gaming
    }

}

let enemyTimeBack = () =>{
    drawBackground()
    drawGround()
    drawEnemy()
    drawHero()
    drawBackEffect('rgb(63, 64, 61, 0.1', 'rgb(227, 32, 64, 1')

    let group = groups['enemy']

    if (group.snapshots.length > 0) {
        _copyState(group)
        group.snapshots.pop()
    }else{
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

    if(move){
        vx = snapshot.vx
    }
        
}
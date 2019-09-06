// using for control the game's flow 

let gaming = () => {
    drawBackground()
    drawGround()
    drawHero()

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
                pos: { x: e.pos.x, y: e.pos.y },
                v: { x: e.v.x, y: e.v.y },
                lt: { x: e.lt.x, y: e.lt.y },
                rd: { x: e.rd.x, y: e.rd.y}
            })
        }
        snapshot.vx = vx

        group.snapshots.push(snapshot)
    }
}

let heroTimeBack = () => {
    drawBackground()
    drawGround()
    drawHero()

    let group = groups['hero']

    if (group.snapshots.length > 0) {
        _copyState(group)
        group.snapshots.pop()
    }else{
        console.log('snapshot is no more')
    }

    for (let key in controlKeys) {
        if (controlKeys[key] === false) {
            if(antiActions[key]){
                antiActions[key]()
            }
        }
    }

}

let envTimeBack = () => {

}

let _copyState = (group) => {
    let snapshot = group.snapshots[group.snapshots.length - 1]

    for (let i in group.elements) {
        let e = group.elements[i]
        e.pos.x = snapshot.elements[i].pos.x
        e.pos.y = snapshot.elements[i].pos.y
        e.lt.x = snapshot.elements[i].lt.x
        e.lt.y = snapshot.elements[i].lt.y
        e.rd.x = snapshot.elements[i].rd.x
        e.rd.y = snapshot.elements[i].rd.y
        e.v.x = snapshot.elements[i].v.x
        e.v.y = snapshot.elements[i].v.y
    }
    vx = snapshot.vx
}
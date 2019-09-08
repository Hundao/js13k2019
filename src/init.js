let initHero = () => {
    let group = new Group('hero', 100, 0.999, false)
    let contact = new Contact('hero', 'hero', 1e8, 1e3)

    group.elements.push(
        new Rectangle(0, 300, 400, 20, 40, 0, 0, 15),
    )


    for (let i = 0; i < group.elements.length; i++) {
        for (let j = i + 1; j < group.elements.length; j++) {
            let key = `${i}-${j}`
            contact.contactPlanes[key] = new ContactPlane(i, j)
        }
    }
    group.canJump = false
    group.face = [1, 0]
    groups['hero'] = group
    sameGupContacts['hero-hero'] = contact
    makeParallelBound(group, contact.contactPlanes, 1)
}

initGround = () => {
    let group = new Group('ground', 0, 0, true)
    group.elements.push(
        new Rectangle(0, 0, 550, mapw, 200, 0, 0, 9999),
        // new Rectangle(1, 0, 0, 200, h, 0, 0, 9999),
        // new Rectangle(2, 1200, 100, 1200, 1200, 0, 0, 9999),
        // new Rectangle(3, 2200, 400, 800, 200, 0, 0, 9999)
    )

    contact = new Contact('hero', 'ground', 1e8, 100)

    for (let i = 0; i < groups['hero'].elements.length; i++) {
        for (let j = 0; j < group.elements.length; j++) {
            let key = `${i}-${j}`
            contact.contactPlanes[key] = new ContactPlane(i, j)
        }
    }

    difGupContacts['ground-hero'] = contact
    groups['ground'] = group


    let den = 0.0002
    let space = 10
    group.elements.forEach((e)=>{
        e.stones = []
        let num = den * e.len.w * e.len.h
        for(let s = 0; s < num; s++){
            let x = Math.random() * e.len.w
            let y = Math.random() * ( e.len.h)

            let type = Math.floor(Math.random()* 5)

            switch(type){
                case 0:
                case 1:
                    e.stones.push(
                        [x, y]
                    )
                    break;
                case 2:
                    e.stones.push(
                        [x, y], [x+space, y], [x, y+space], [x +space, y+space]
                    )
                    break;
                case 3:
                    e.stones.push(
                        [x, y], [x+space, y]
                    )
                    break;
                case 4:
                    e.stones.push(
                        [x, y], [x + space, y], [x + space *2 ,y]
                    )

            }
        }
        
    })
}


initEnemy = () => {
    let group = new Group('enemy', 100, 0.99, false)

    group.elements.push(
        // new Rectangle(0, 500, 400, 60, 60, -1e10, 0, 55)
        new Rectangle(0, 500, 400, 10, 10, 0, 0, 55)
    )

    contact = new Contact('enemy', 'ground', 1e7, 100)

    for(let i =0; i < group.elements.length; i++){
        for(let j = 0 ; j < groups['ground'].elements.length; j++){
            let key = `${i}-${j}`
            contact.contactPlanes[key] = new ContactPlane(i, j)
        }
    }
    difGupContacts['enemy-ground'] = contact
    groups['enemy'] = group
}

initArrow = () =>{
    let group = new Group('arrow', 50, 0.999999, false)

    contact = new Contact('arrow', 'ground', 1e7, 0)

    for(let i =0; i < group.elements.length; i++){
        for(let j = 0 ; j < groups['ground'].elements.length; j++){
            let key = `${i}-${j}`
            contact.contactPlanes[key] = new ContactPlane(i, j)
        }
    }

    difGupContacts['arrow-ground'] = contact

    groups['arrow'] = group
}

initSky = () =>{
    let den = 0.001
    let num = w * h * 0.3333 * den
    console.log('num', num)

    for(let i = 0; i < num; i++){
        let x = Math.random() * mapw
        let y = Math.random() * 0.3333 * h

        let type = Math.floor(Math.random() * 3)

        let space = 5
        switch(type){
            case 0:
                sky.push(
                    [x,y],
                    [x+space, y+space],
                    [x-space, y+space],
                    [x, y+2*space]
                )
                break;
            case 1:
                sky.push(
                    [x, y]
                )
                break;
            case 2:
                sky.push(
                    [x,y], [x -space, y+space], [x, y+space], [x+space, y+space], [x, y+2*space]
                )
        }
    }
}
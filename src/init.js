
let initFun = () => {

    initHero()

}



let initHero = () => {
    let group = new Group('hero', 100, 0.999, false)
    let contact = new Contact('hero', 'hero', 1e7, 1e7)

    group.elements.push(
        // new Rectangle(0, 50, 50, 10, 10, 55),
        // new Rectangle(1, 60, 50, 10, 10, 55),
        // new Rectangle(2, 70, 50, 10, 10, 55),
        // new Rectangle(3, 50, 60, 10, 10, 55),
        // new Rectangle(4, 70, 60, 10, 10, 55),
        // new Rectangle(5, 50, 70, 10, 10, 55),
        // new Rectangle(6, 60, 70, 10, 10, 55),
        // new Rectangle(7, 70, 70, 10, 10, 55),
        // new Rectangle(0, 50, 400, 10, 10, 55),
        new Rectangle(0, 300, 400, 10, 10, 0, 0, 55)
    )

    // cor.forEach((e, index)=>{
    //     group.elements.push(new Rectangle(index, e[0], e[1],10 ,10,55))
    // })

    for (let i = 0; i < group.elements.length; i++) {
        for (let j = i + 1; j < group.elements.length; j++) {
            let key = `${i}-${j}`
            contact.contactPlanes[key] = new ContactPlane(i, j)
        }
    }

    groups['hero'] = group
    sameGupContacts['hero-hero'] = contact
    makeParallelBound(group, contact.contactPlanes, 10)
}

initGround = () => {
    let group = new Group('ground', 0, 0, true)
    group.elements.push(
        new Rectangle(0, 0, 600, 2000, 10000, 0, 0, 9999),
        new Rectangle(1, 0, 0, 200, h, 0, 0, 9999),
        new Rectangle(2, 1200, 100, 1200, 1200, 0, 0, 9999),
        new Rectangle(3, 2200, 400, 800, 200, 0, 0, 9999)
    )

    contact = new Contact('hero', 'ground', 10000000, 100)

    for (let i = 0; i < groups['hero'].elements.length; i++) {
        for (let j = 0; j < group.elements.length; j++) {
            let key = `${i}-${j}`
            contact.contactPlanes[key] = new ContactPlane(i, j)
        }
    }

    difGupContacts['ground-hero'] = contact
    groups['ground'] = group
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
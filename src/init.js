let initHero = () => {
    let group = new Group('hero', 100, 0.999, false)
    let contact = new Contact('hero', 'hero', 1e8, 1e3)

    group.elements.push(
        new Hero(100, 400, 20, 40, 0, 0, 15, 100, 20),
    )

    groups['hero'] = group
    hero = group.elements[0]
    // makeParallelBound(group, contact.contactPlanes, 1)
}

initGround = () => {
    let group = new Group('ground', 0, 0, true)
    group.elements.push(
        new Ground(   0, 550, 200, 90, 0, 0, 9999),
        new Ground( 200, 140, 150, 500, 0, 0, 9999),
        new Ground( 350, 400, 600, 240, 0, 0, 9999),
        new Ground( 950, 60, 120, 640, 0, 0, 9999),
        new Ground(1070, 500, 800, 140, 0, 0, 9999),
        new Ground(1200, 150, 820, 140, 0, 0, 9999),
        new Ground(1870, 0, 150, 640, 0, 0, 9999),
        new Ground(2020, 500, 980, 140, 0, 0, 9999),
    )

    contact = new Contact('hero', 'ground', 1e8, 100)

    difGupContacts['ground-hero'] = contact
    groups['ground'] = group

}


initEnemy = () => {
    let group = new Group('enemy', 100, 0.99, false)

    group.elements.push(
        new Enemy(500, 200, 100, 100, 0, 0, 55, monsterSkin2, 100, 10),
        new Enemy(700, 200, 100, 100, 0, 0, 55, monsterSkin2, 100, 10),
        new Enemy(1600, 200, 100, 100, 0, 0, 55, monsterSkin1, 300, 30)
    )

    let contact = new Contact('enemy', 'ground', 9e9, 100)
    let contactHero = new Contact('enemy', 'hero', 1e10, 100)
    let contactEnemy = new Contact('enemy', 'enemy', 1e10, 100)

    groups['enemy'] = group
    difGupContacts['enemy-ground'] = contact
    difGupContacts['enemy-hero'] = contactHero
    sameGupContacts['enemy-enemy'] = contactEnemy
}

initBoss = () => {
    let group = new Group('boss', 100, 0.99, true)
    
    group.elements.push(
        new Boss(2723, 100, 200, 400, 0, 0, 55, 3000, 25),
    )

    boss = group.elements[0]
    groups['boss'] = group
}

initArrow = () =>{
    let group = new Group('arrow', 50, 0.999999, false)

    contact = new Contact('arrow', 'ground', 1e12, 0)
    contactEnemy = new Contact('arrow', 'enemy', 1e10, 0)
    contactBoss = new Contact('arrow', 'boss', 1e10, 0)

    difGupContacts['arrow-ground'] = contact
    difGupContacts['arrow-enemy'] = contactEnemy
    difGupContacts['arrow-boss'] = contactBoss
    groups['arrow'] = group
}

initSky = () =>{
    let den = 0.001
    let num = w * h * 0.3333 * den

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
let initGaming = () => {

    sky = []
    vx = 0
    happend = [true, true, true, true, true]
    enemyView = 500
    fixed = false
    bossActive = false
    bound = {
        uX: 3000,
        uY: 1000,
        lX: 0,
        lY: 0
    }
    toolTextIndex = -1
    heroSnapshot = []

    _initHero()
    _initGround()
    _initEnemy()
    _initBoss()
    _initArrow()
    _initSky()

    let snapshot = {
        happend,
        groups,
        vx,
    }
    globalSnapshot = JSON.stringify(snapshot)

    if(cycler > 1){
        hero.canBack = true
    }
}

let _initHero = () => {
    let group = new Group('hero', 100, 0.999, false)

    group.elements.push(
        new Hero(100, 400, 20, 40, 0, 0, 15, 100, 20),
    )

    groups['hero'] = group
    hero = group.elements[0]
    // makeParallelBound(group, contact.contactPlanes, 1)
}

let _initGround = () => {
    let group = new Group('ground', 0, 0, true)
    group.elements.push(
        new Ground(0, 550, 200, 90, 0, 0, 9999),
        new Ground(200, 140, 150, 500, 0, 0, 9999),
        new Ground(350, 400, 600, 240, 0, 0, 9999),
        new Ground(950, 60, 120, 640, 0, 0, 9999),
        new Ground(1070, 500, 800, 140, 0, 0, 9999),
        new Ground(1200, 150, 820, 140, 0, 0, 9999),
        new Ground(1870, 0, 150, 640, 0, 0, 9999),
        new Ground(2020, 500, 980, 140, 0, 0, 9999),
    )

    contact = new Contact('hero', 'ground', 1e8, 100)

    difGupContacts['ground-hero'] = contact
    groups['ground'] = group

}

let _initEnemy = () => {
    let group = new Group('enemy', 100, 0.99, false)

    let a = 0.4
    let b = 0.2
    let hp1 = 100 * (1 + cycler * a)
    let hp2 = 300 * (1 + cycler * b)
    let atk1 = 10 * (1 + cycler * a)
    let atk2 = 30 * (1 + cycler * b)
    if (cycler <= 1) {
        group.elements.push(
            new Enemy(500, 200, 100, 100, 0, 0, 55, monsterSkin2, hp1, atk1, 1),
            new Enemy(700, 200, 100, 100, 0, 0, 55, monsterSkin2, hp1, atk1, 2),
            new Enemy(1600, 200, 100, 100, 0, 0, 55, monsterSkin1, hp2, atk2, 3)
        )
    } else {
        group.elements.push(
            new Enemy(530, 200, 100, 100, 0, 0, 55, monsterSkin2, hp1, atk1, 1),
            new Enemy(610, 200, 100, 100, 0, 0, 55, monsterSkin2, hp1, atk1, 2),
            new Enemy(420, 200, 100, 100, 0, 0, 55, monsterSkin1, hp1 + 100, atk1, 3),
            new Enemy(1600, 200, 100, 100, 0, 0, 55, monsterSkin1, hp2, atk2, 4),
            new Enemy(1092, 200, 100, 100, 0, 0, 55, monsterSkin1, hp2, atk2, 4)
        )
    }

    let contact = new Contact('enemy', 'ground', 9e9, 100)
    let contactHero = new Contact('enemy', 'hero', 1e10, 100)
    let contactEnemy = new Contact('enemy', 'enemy', 1e10, 100)

    groups['enemy'] = group
    difGupContacts['enemy-ground'] = contact
    difGupContacts['enemy-hero'] = contactHero
    sameGupContacts['enemy-enemy'] = contactEnemy
}

let _initBoss = () => {
    let group = new Group('boss', 100, 0.99, true)

    let hp = 1000 * ( 1 + cycler * 0.3 )
    group.elements.push(
        new Boss(2723, 100, 200, 400, 0, 0, 100, hp, 25),
    )

    boss = group.elements[0]
    groups['boss'] = group
}

let _initArrow = () => {
    let group = new Group('arrow', 50, 0.999999, false)

    contact = new Contact('arrow', 'ground', 1e12, 0)
    contactEnemy = new Contact('arrow', 'enemy', 1e10, 0)
    contactBoss = new Contact('arrow', 'boss', 1e10, 0)

    difGupContacts['arrow-ground'] = contact
    difGupContacts['arrow-enemy'] = contactEnemy
    difGupContacts['arrow-boss'] = contactBoss
    groups['arrow'] = group
}

let _initSky = () => {
    sky = []
    let den = 0.001
    let num = w * h * 0.3333 * den

    for (let i = 0; i < num; i++) {
        let x = Math.random() * mapw
        let y = Math.random() * 0.3333 * h

        let type = Math.floor(Math.random() * 3)

        let space = 5
        switch (type) {
            case 0:
                sky.push(
                    [x, y],
                    [x + space, y + space],
                    [x - space, y + space],
                    [x, y + 2 * space]
                )
                break;
            case 1:
                sky.push(
                    [x, y]
                )
                break;
            case 2:
                sky.push(
                    [x, y], [x - space, y + space], [x, y + space], [x + space, y + space], [x, y + 2 * space]
                )
        }
    }
}

//-----------------------------------------------Starting Page------------------------------------------------

let initStarting = () => {

    bound = {
        uX: w,
        uY: h + 300,
        lX: 0,
        lY: 0
    }

    _initStartHero()
    _initStartGround()
    _initArrow()
    _initStartEnemy()
    _initSky()
}

let _initStartHero = () => {
    let group = new Group('hero', 100, 0.999, false)

    group.elements.push(
        new Hero(40, 400, 20, 40, 0, 0, 15, 100, 20),
    )

    groups['hero'] = group
    hero = group.elements[0]
}

let _initStartGround = () => {
    let group = new Group('ground', 0, 0, true)
    group.elements.push(
        new Ground(0, 550, 150, h - 550, 0, 0, 50),
        new Ground(150, 400, 150, h - 400, 0, 0, 50),
        new Ground(550, 550, 250, h - 340, 0, 0, 50),
        new Ground(600, 400, 168, h - 350, 0, 0, 50)
    )

    contact = new Contact('hero', 'ground', 1e8, 100)

    difGupContacts['ground-hero'] = contact
    groups['ground'] = group
}

let _initStartEnemy = () => {
    let groupEnemy = new Group('enemy', 100, 0.99, false)
    groupEnemy.elements.push(
        new Enemy(630, 300, 100, 100, 0, 0, 55, monsterSkin2, 30, 10, 4)
    )

    groupEnemy.elements[0].face = -1

    let contact = new Contact('enemy', 'ground', 9e9, 100)


    let groupBoss = new Group('boss', 100, 0.99, true)

    groups['enemy'] = groupEnemy
    groups['boss'] = groupBoss
    difGupContacts['enemy-ground'] = contact
}
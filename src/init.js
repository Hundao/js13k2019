
let initFun = ()=>{

    initHero()

}

let initHero = () =>{
    let group = new Group('hero', 100, 0.999, false)
    let contact = new Contact('hero', 'hero', 10000, 1000)

    group.elements.push(
        // new Rectangle(0, 50, 50, 10, 10, 55),
        // new Rectangle(1, 60, 50, 10, 10, 55),
        // new Rectangle(2, 70, 50, 10, 10, 55),
        // new Rectangle(3, 50, 60, 10, 10, 55),
        // new Rectangle(4, 70, 60, 10, 10, 55),
        // new Rectangle(5, 50, 70, 10, 10, 55),
        // new Rectangle(6, 60, 70, 10, 10, 55),
        // new Rectangle(7, 70, 70, 10, 10, 55)
        new Rectangle(0, 50, 400, 10, 10, 55)
        )   

    for(let i = 0; i < group.elements.length; i++){
        for(let j = i + 1; j < group.elements.length; j++){
            let key = `${i}-${j}`
            contact.contactPlanes[key] = new ContactPlane(i, j)
        }
    }

    groups['hero'] = group
    sameGupContacts['hero-hero'] = contact
    // makeParallelBound(group, contact.contactPlanes, 1)
}

initGround = () => {
    let group = new Group('ground', 0, 0, true)
    group.elements.push(
        new Rectangle(0, 0, 600, 2000, 10000, 9999)
    )

    contact = new Contact('hero', 'ground', 10000000, 100)

    for(let i = 0; i < groups['hero'].elements.length; i++){
        for(let j =0; j < group.elements.length; j++){
            let key = `${i}-${j}`
            contact.contactPlanes[key] = new ContactPlane(i, j)
        }
    }

    difGupContacts['ground-hero'] = contact
    groups['ground'] = group
}
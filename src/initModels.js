
let initFun = ()=>{

    initHero()

}

let initHero = () =>{
    let group = new Group('hero', 100, 0.5, false)
    let contact = new Contact('hero', 'hero', 100, 100)

    group.elements.push(
        new Rectangle(0, 50, 50, 10, 10, 55),
        new Rectangle(1, 60, 50, 10, 10, 55),
        new Rectangle(2, 70, 50, 10, 10, 55),
        new Rectangle(3, 50, 60, 10, 10, 55),
        new Rectangle(4, 70, 60, 10, 10, 55),
        new Rectangle(5, 50, 70, 10, 10, 55),
        new Rectangle(6, 60, 70, 10, 10, 55),
        new Rectangle(7, 70, 70, 10, 10, 55)
        )
    
    for(let i = 0; i < group.elements.length; i++){
        for(let j = i + 1; j < group.elements.length; j++){
            let e1 = group.elements[0]
            let e2 = group.elements[1]

            let key = `${e1.id}-${e2.id}`
            contact.contactPlanes[key] = new ContactPlane(i, j)
        }
    }

    groups['hero'] = group
    sameGupContacts['hero-hero'] = contact
    makeParallelBound(group, contact.contactPlanes, 1)
}

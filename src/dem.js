let makeParallelBound = (group, contactPlanes, dis) => {

    for (let key in contactPlanes) {
        let contactPlane = contactPlanes[key]
        let e1 = group.elements[contactPlane.element1Index]
        let e2 = group.elements[contactPlane.element2Index]

        if (e1.lt.x - dis > e2.rd.x + dis || e2.lt.x - dis > e1.rd.x) {
            continue
        }

        if (e1.lt.y - dis > e1.rd.y + dis || e2.lt.y - dis > e1.rd.y + dis) {
            continue
        }

        contactPlane.isBound = true
    }

}


let mainFlow = () => {

    // Contact Detection & Update Contact Plane
    handleContact()

    // Calculate for Force
    receiveForce()

    // F -> A -> V -> X
    verlet()

    // Reset F 
    resetForce()
}

let verlet = () => {
    for (let key in groups) {
        let group = groups[key]

        if (group.isRigid) continue
        for (let i in group.elements) {
            let e = group.elements[i]

            e.v.x *= group.damp
            e.v.y *= group.damp

            let dmpInfluence = 1- group.damp
            e.v.x += (e.f.x * e.invm) * dmpInfluence  * dt
            e.v.y += (e.f.y * e.invm + gravity * e.mass) * dmpInfluence * dt
            //  console.log(e.v.y, e.f.y)

            let disX = e.v.x * dt
            let disY = e.v.y * dt

            if(e.lt.x + disX > bound.lX && e.rd.x + disX < bound.uX){
                e.pos.x += disX
                e.lt.x += disX
                e.rd.x += disX
            }

            if(e.lt.y + disY > bound.lY && e.rd.y + disY < bound.uY){
                e.pos.y += disY
                e.lt.y += disY
                e.rd.y += disY
            }

        }
    }
}


let handleContact = () => {
    for (let key in difGupContacts) {
        let contact = difGupContacts[key]
        let group1 = groups[contact.group1Index]
        let group2 = groups[contact.group2Index]

        for (let i = 0; i < group1.elements.length; i++) {
            for (let j = 0; j < group2.elements.length; j++) {
                let e1 = group1.elements[i]
                let e2 = group2.elements[j]

                let contactPlane = contact.contactPlanes[`${i}-${j}`]
                _updateContactPlane(e1, e2, contactPlane, contact)
            }
        }
    }

    for (let key in sameGupContacts) {
        let contact = sameGupContacts[key]
        let group = groups[contact.group1Index]

        for (let i = 0; i < group.elements.length; i++) {
            for (let j = i + 1; j < group.elements.length; j++) {
                let e1 = group.elements[i]
                let e2 = group.elements[j]

                let contactPlane = contact.contactPlanes[`${i}-${j}`]
                _updateContactPlane(e1, e2, contactPlane, contact)
            }
        }
    }
}

let _updateContactPlane = (e1, e2, contactPlane, contact) => {
    if (e1.lt.x > e2.rd.x || e2.lt.x > e1.rd.x) {
        contactPlane.isContact = false
        if(!contactPlane.isBound) return
    }

    if (e1.lt.y > e2.rd.y || e2.lt.y > e1.rd.y) {
        contactPlane.isContact = false
        if(!contactPlane.isBound) return
    }

    contactPlane.isContact= true
    let d = distance(e1.pos, e2.pos)
    let nc = scale(1 / d, minus(e1.pos, e2.pos))

    let maxX = Math.max(e1.lt.x, e1.rd.x, e2.lt.x, e2.rd.x)
    let minX = Math.min(e1.lt.x, e1.rd.x, e2.lt.x, e2.rd.x)
    let maxY = Math.max(e1.lt.y, e1.rd.y, e2.lt.y, e2.rd.y)
    let minY = Math.min(e1.lt.y, e1.rd.y, e2.lt.y, e2.rd.y)

    let overlapX = (e1.len.w + e2.len.w) - (maxX - minX)
    let overlapY = (e1.len.h + e2.len.h) - (maxY - minY)

    contactPlane.gc = overlapX * overlapY
    contactPlane.nc = nc
    contactPlane.f = scale(contact.kn, scale(contactPlane.gc, contactPlane.nc))
    contactPlane.rV = minus(e2.v, e1.v)
    contactPlane.inD = scale(dt, contactPlane.rV)

}

let receiveForce = () => {
    for (let key in difGupContacts) {
        let contact = difGupContacts[key]

        let group1 = groups[contact.group1Index]
        let group2 = groups[contact.group2Index]
        for (let i in contact.contactPlanes) {
            let contactPlane = contact.contactPlanes[i]
            if (!contactPlane.isContact) continue

            let e1 = group1.elements[contactPlane.element1Index]
            let e2 = group2.elements[contactPlane.element2Index]
            e1.f = minus(contactPlane.f, e1.f)
            e2.f = plus(contactPlane.f, e2.f)

        }
    }

    for (let key in sameGupContacts) {
        let contact = sameGupContacts[key]

        let group = groups[contact.group1Index]
        for (let i in contact.contactPlanes) {
            let contactPlane = contact.contactPlanes[i]
            if (!contactPlane.isContact) continue

            let e1 = group.elements[contactPlane.element1Index]
            let e2 = group.elements[contactPlane.element2Index]

            e1.f = minus(contactPlane.f, e1.f)
            e2.f = plus(contactPlane.f, e2.f)
        }
    }

}

let resetForce = () => {
    for (let key in groups) {
        let group = groups[key]

        for (let i in group.elements) {
            group.elements[i].f.x = 0
            group.elements[i].f.y = 0
        }
    }
}
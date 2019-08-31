

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

            e.a.x += e.f.x * e.invm
            e.a.y += e.f.y * e.invm

            e.v.x += e.a.x * dt
            e.v.y += e.a.y * dt
            e.v.y += gravity * dt

            let disX = e.v.x * dt
            let disY = e.v.y * dt
            e.pos.x += disX
            e.pos.y += disY

            e.lt.x += disX
            e.lt.y += disY

            e.rd.x += disX
            e.rd.y += disY
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

                let contactPlane = contact.contactPlanes[`${e1.id}-${e2.id}`]
                _updateContactPlane(e1, e2, contactPlane)
            }
        }
    }

    for (let key in sameGupContacts) {
        let contact = sameGupContacts[key]
        let group = groups[contact.group1Index]

        for (let i = 0; i < group.elements.length; i++) {
            for (let j = 1; j < group.elements.length; j++) {
                let e1 = group.elements[i]
                let e2 = group.elements[j]

                let contactPlane = contact.contactPlanes[`${e1.id}-${e2.id}`]
                _updateContactPlane(e1, e2, contactPlane)
            }
        }
    }
}

let _updateContactPlane = (e1, e2, contactPlane) => {

    if (e1.lt.x > e2.rd.x || e2.lt.x > e1.rd.x) {
        contactPlane.isContact = false
        continue
    }

    if (e1.lt.y > e2.rd.y || e2.lt.y > e1.rd.y) {
        contactPlane.isContact = false
        continue
    }

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
    contactPlane.f = scale(contact.kn, dot(contactPlane.gc, contactPlane.nc))

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

            e1.f = minus(contact.f, e1.f)
            e2.f = plus(contact.f, e2.f)

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

            e1.f = minus(contact.f, e1.f)
            e2.f = plus(contact.f, e2.f)
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
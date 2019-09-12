// let makeParallelBound = (group, contactPlanes, dis) => {

//     for (let key in contactPlanes) {
//         let contactPlane = contactPlanes[key]
//         let e1 = group.elements[contactPlane.element1Index]
//         let e2 = group.elements[contactPlane.element2Index]

//         if (e1.lt[0] - dis > e2.rd[0] + dis || e2.lt[0] - dis > e1.rd[0]) {
//             continue
//         }

//         if (e1.lt[1] - dis > e1.rd[1] + dis || e2.lt[1] - dis > e1.rd[1] + dis) {
//             continue
//         }

//         contactPlane.isBound = true
//     }

// }


let demStep = () => {

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

            e.v = scale(group.damp, e.v)

            let dmpInfluence = 1 - group.damp

            e.v[0] += (e.f[0] * e.invm) * dmpInfluence * dt
            e.v[1] += (e.f[1] * e.invm + gravity * e.mass) * dmpInfluence * dt

            let dis = scale(dt, e.v)

            if (e.lt[0] + dis[0] > bound.lX && e.rd[0] + dis[0] < bound.uX) {
                e.pos[0] += dis[0]
                e.lt[0] += dis[0]
                e.rd[0] += dis[0]
            }

            if (e.lt[1] + dis[1] > bound.lY && e.rd[1] + dis[1] < bound.uY) {
                e.pos[1] += dis[1]
                e.lt[1] += dis[1]
                e.rd[1] += dis[1]
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

                let key = `${i}-${j}`
                let contactPlane = new ContactPlane(i, j)
                _updateContactPlane(e1, e2, contactPlane, contact)
                contact.contactPlanes[key] = contactPlane

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

                let key = `${i}-${j}`
                let contactPlane = new ContactPlane(i, j)
                _updateContactPlane(e1, e2, contactPlane, contact)
                contact.contactPlanes[key] = contactPlane
            }
        }
    }
}

let _updateContactPlane = (e1, e2, contactPlane, contact) => {

    contactPlane.isContact = true

    if (e1.lt[0] > e2.rd[0] || e2.lt[0] > e1.rd[0]) {
        contactPlane.isContact = false
    }

    if (e1.lt[1] > e2.rd[1] || e2.lt[1] > e1.rd[1]) {
        contactPlane.isContact = false
    }

    if (contactPlane.isContact) {
        contactPlane.isEverContact = true

        let d = distance(e1.pos, e2.pos)
        let nc = scale(1 / d, minus(e1.pos, e2.pos))

        if (nc[0] === 0 && nc[1] === 0) {
            nc = [1, 0]
        }

        let maxX = Math.max(e1.lt[0], e1.rd[0], e2.lt[0], e2.rd[0])
        let minX = Math.min(e1.lt[0], e1.rd[0], e2.lt[0], e2.rd[0])
        let maxY = Math.max(e1.lt[1], e1.rd[1], e2.lt[1], e2.rd[1])
        let minY = Math.min(e1.lt[1], e1.rd[1], e2.lt[1], e2.rd[1])

        let overlapX = (e1.len.w + e2.len.w) - (maxX - minX)
        let overlapY = (e1.len.h + e2.len.h) - (maxY - minY)


        let doing = true
        if(e1.len.w > e2.len.w){            
            if(overlapX * overlapY === e2.len.w * e2.len.h){
                nc = contactPlane.nc
                doing = false
            }
            else if(overlapX === e2.len.w){
                if(nc[1] > 0){
                    nc = [0, 1]
                    doing = false
                }
                else{
                    nc = [0, -1]
                    doing = false
                }
            }
        }
        else{            
            if(overlapX * overlapY === e1.len.w * e1.len.h){
                nc = contactPlane.nc
                doing = false
            }
            else if(overlapX === e1.len.w){
                if(nc[1] > 0){
                    nc = [0, 1]
                    doing = false
                }
                else{
                    nc = [0, -1]
                    doing = false
                }
            }
        }

        if(e1.len.h > e2.len.h && doing){
            if(overlapY === e2.len.h){
                if(nc[0] > 0){
                    nc = [1, 0]
                }else{
                    nc = [-1, 0]
                }
            }
        }
        else if(doing){
            if(overlapY === e1.len.h){
                if(nc[0] > 0){
                    nc = [1, 0]
                }else{
                    nc = [-1, 0]
                }
            }
        }

        contactPlane.gc = overlapX * overlapY
        contactPlane.nc = nc
        contactPlane.f = scale(contact.kn, scale(contactPlane.gc, contactPlane.nc))
    }

    if (contactPlane.isBound) {
        
        contactPlane.rV = minus(e2.v, e1.v)
        contactPlane.inD = plus(contactPlane.inD, scale(dt, contactPlane.rV))

        contactPlane.f = plus(contactPlane.f, scale(contact.pkn, contactPlane.inD))
    }

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
            if (!contactPlane.isContact && !contactPlane.isBound) continue

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
            group.elements[i].f = [0, 0]
        }
    }
}



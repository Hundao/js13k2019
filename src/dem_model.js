
class ContactPlane {
    constructor(e1Index, e2Index) {
        this.nc = [0, 0]
        this.gc = 0

        this.f = [0, 0]

        this.rV = [0, 0]
        this.inD = [0, 0]

        this.isContact = false
        this.isBound = false
        this.element1Index = e1Index
        this.element2Index = e2Index
    }
}


class Rectangle {
    constructor(id, ltx, lty, w, h, vx, vy, density) {
        this.id = id
        this.mass = w * h * density
        this.invm = 1 / this.mass

        this.pos = [
            ltx + w * 0.5,
            lty + h * 0.5
        ]

        this.lt = [ltx, lty]

        this.rd = [
            ltx + w,
            lty + h
        ]

        this.len = { w, h }

        this.f = [0, 0]

        this.v = [vx, vy]
    }
}

class Contact {
    constructor(group1Index, group2Index, kn, pkn) {
        this.kn = kn
        this.pkn = pkn
        this.group1Index = group1Index
        this.group2Index = group2Index
        this.contactPlanes = {

        }
    }
}

class Group {
    constructor(name, density, damp, isRigids) {
        this.isRigid = isRigids
        this.damp = damp
        this.density = density
        this.name = name
        this.elements = []
        this.bc = [0, 0]
        this.snapshots = []
    }
}

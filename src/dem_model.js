
class ContactPlane{
    constructor(e1Index, e2Index){
        this.nc= {
            x:0,
            y:0
        }

        this.gc = 0

        this.f = {x:0,y:0}

        this.rV = {x:0, y:0}
        this.inD = {x:0, y:0}

        this.isContact = false
        this.isBound = false
        this.element1Index = e1Index
        this.element2Index = e2Index
    }
}


class Rectangle{
    constructor(id, ltx, lty, w, h, density){
        this.id = id
        this.mass = w * h * density
        this.invm = 1 / this.mass

        this.pos = {
            x:ltx + w*0.5,
            y:lty + h*0.5
        }

        this.lt = {
            x: ltx,
            y: lty
        }

        this.rd ={
            x: ltx + w,
            y: lty + h
        }

        this.len = {w,h}

        this.f = {
            x:0,
            y:0
        }
        
        this.pf = {
            x:0,
            y:0
        }
        
        this.a = {
            x:0,
            y:0
        }

        this.v = {
            x:0,
            y:0
        }
    }
}

class Circle{
    constructor(){
        this.id=0
        this.mass = 0
        this.invm = 0
        this.radius = 0

        this.pos = {
            x:0,
            y:0
        }

        this.f = {
            x:0,
            y:0
        }
        
        this.a = {
            x:0,
            y:0
        }

        this.v = {
            x:0,
            y:0
        }
    }
}

class Contact{
    constructor(group1Index, group2Index, kn, pkn){
        this.kn = kn
        this.pkn = pkn
        this.group1Index = group1Index
        this.group2Index = group2Index
        this.contactPlanes={

        }
    }
}

class Group{
    constructor(name, density, damp, isRigids){
        this.isRigid = isRigids
        this.damp = damp
        this.density = density
        this.name = name
        this.elements = []
        this.bc = {x:0, y:0}
    }
}

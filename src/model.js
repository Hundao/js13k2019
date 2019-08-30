class ContactPlan{
    constructor(){
        this.nc= {
            x:0,
            y:0
        }

        this.gc = 0
        // not sure for what
        // this.rv = {
        //     x:0,
        //     y:0
        // }

        this.f = {
            x:0,
            y:0
        }

        this.isContact = false

    }
}


class Rectangle{
    constructor(){
        this.id = 0
        this.mass = 0
        this.invm = 0

        this.pos = {
            x:0,
            y:0
        }

        this.lt = {
            x: 0,
            y: 0
        }

        this.rd ={
            x:0,
            y:0
        }

        this.len = {
            w:0,
            h:0
        }

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
    constructor(){
        this.kn = 0
        this.bn = 0
        this.pkn = 0
        this.group1Index = ''
        this.group2Index = ''
        this.contactPlanes={

        }
    }
}

class Group{
    constructor(){
        this.isRigid = true
        this.damp = 0
        this.density = 0
        this.name = ''
    }
}

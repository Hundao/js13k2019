class Hero extends Rectangle {
    constructor(ltx, lty, w, h, vx, vy, density, hp, atk) {
        super(ltx, lty, w, h, vx, vy, density)

        this.face = 1
        this.canJump = false
        this.isSuper = false
        this.hp = hp
        this.maxHp = hp
        this.atk = atk
    }
}

class Enemy extends Rectangle {
    constructor(ltx, lty, w, h, vx, vy, density, skin, hp, atk) {
        super(ltx, lty, w, h, vx, vy, density)
        this.face = 1
        this.canMove = true
        this.skin = skin
        this.hp = hp
        this.maxHp = hp
        this.atk = atk
    }
}

class Boss extends Rectangle {
    constructor(ltx, lty, w, h, vx, vy, density, hp, atk) {
        super(ltx, lty, w, h, vx, vy, density)
        this.hp = hp
        this.maxHp = hp
        this.atk = atk
    }
}

class Ground extends Rectangle {
    constructor(ltx, lty, w, h, vx, vy, density) {
        super(ltx, lty, w, h, vx, vy, density)

        this.stones = []
        let num = stoneConfig.den * w * h
        let space = stoneConfig.space
        for (let i = 0; i < num; i++) {
            let x = Math.random() * (w - 20)
            let y = Math.random() * (h - 40)

            let type = Math.floor(Math.random() * 5)

            switch (type) {
                case 0:
                case 1:
                    this.stones.push(
                        [x, y]
                    )
                    break;
                case 2:
                    this.stones.push(
                        [x, y], [x + space, y], [x, y + space], [x + space, y + space]
                    )
                    break;
                case 3:
                    this.stones.push(
                        [x, y], [x + space, y]
                    )
                    break;
                case 4:
                    this.stones.push(
                        [x, y], [x + space, y], [x + space * 2, y]
                    )
            }
        }
    }
}


class Arrow extends Rectangle {
    constructor(ltx, lty, w, h, vx, vy, density, face) {
        super(ltx, lty, w, h, vx, vy, density)
        this.face = face

    }
}
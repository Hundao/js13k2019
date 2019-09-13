

let drawBackground = () => {
    let grd = ctx.createLinearGradient(0, 0, w, h)
    grd.addColorStop(0, '#53468E');
    grd.addColorStop(0.33, '#5B65A3');
    grd.addColorStop(1, '#418DB0');


    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);


    ctx.fillStyle = '#9BADCE'
    sky.forEach((e) => {
        ctx.fillRect(e[0] - vx, e[1], 5.5, 5.5);
    })
}

let drawGround = () => {
    let group = groups['ground']

    let h1 = 10
    let h2 = 15

    group.elements.forEach((e) => {

        ctx.fillStyle = '#3CA836'
        ctx.fillRect(
            e.lt[0] - vx,
            e.lt[1],
            e.len.w + 1,
            h1
        )

        ctx.fillStyle = '#978426'
        ctx.fillRect(
            e.lt[0] - vx,
            e.lt[1] + h1,
            e.len.w + 1,
            h2
        )

        ctx.fillStyle = '#A94823'

        ctx.fillRect(
            e.lt[0] - vx,
            e.lt[1] + h1 + h2,
            e.len.w + 1,
            e.len.h
        )

        ctx.fillStyle = '#A98F81'
        e.stones.forEach((p) => {
            ctx.fillRect(
                p[0] - vx + e.lt[0],
                p[1] + e.lt[1],
                11,
                11
            )
        })
    })



}

let drawHero = () => {
    ctx.fillStyle = 'blue'

    let skin = heroSkin

    if (shooting && moving) {
        skin = heroMoveAndShoot
    }
    else if (shooting) {
        skin = heroShootSkin
    }
    else if (moving) {
        skin = heroMoveSkin
    }

    renderSkin(hero, skin, 1, 1)

}

let drawEnemy = () => {
    ctx.fillStyle = '#2c362e'
    let group = groups['enemy']

    group.elements.forEach((e) => {
        renderSkin(e, e.skin, 5, 5)
    })

    if(boss){
        drawBoss()
    }
}

let drawBackEffect = (color1, color2) => {

    let grd = ctx.createRadialGradient(w * 0.5, h * 0.5, 250, w * 0.5, h * 0.5, 450)
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2)
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, w, h)
}

let drawArrow = () => {
    let group = groups['arrow']
    group.elements.forEach((e) => {
        renderSkin(e, arrowSkin, 1, 1)
    })
}

let drawBoss = () =>{
    let skin = bossSkin
    boss.face = 1
    
    let hpLen = 130
    let percent = boss.hp / boss.maxHp * hpLen

    ctx.fillStyle= '#121211'
    ctx.fillRect(boss.lt[0] -vx +20, boss.lt[1] -40, hpLen, 10)


    ctx.fillStyle = '#ebc934'
    ctx.fillRect(boss.lt[0] -vx +20, boss.lt[1] -40, percent, 10)


    renderSkin(boss, skin, 10, 10)
}

let drawHead = () => {

    ctx.fillStyle = '#060001'
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.strokeRect(98, 18, 205, 24);

    let hpw = hero.hp / hero.maxHp * 200
    let losew = (hero.maxHp - hero.hp) / hero.maxHp * 200

    ctx.fillStyle = '#E61E18'
    ctx.fillRect(100, 20, hpw, 20)

    ctx.fillStyle = '#474646'
    ctx.fillRect(100 + hpw, 20, losew, 20)

    //draw 
    ctx.fillStyle = '#87372f'
    ctx.beginPath();
    ctx.arc(25, 15, 80, 0, 2 * Math.PI);
    ctx.fill();


    ctx.strokeStyle = "black";
    ctx.stroke();

    let skin = heroSkin
    let priority = ['face', 'hair', 'eye']

    let space = 4;
    let dis = [10, 10]

    for (let i in priority) {
        let part = skin[priority[i]]

        for (let key in part) {
            let draw = part[key]
            ctx.fillStyle = draw.color

            ctx.fillStyle = draw.color

            draw.points.forEach((p) => {
                if (Array.isArray(p[0])) {
                    for (let j = p[0][0]; j <= p[1][0]; j++) {
                        for (let k = p[0][1]; k <= p[1][1]; k++) {
                            ctx.fillRect(
                                j * space + dis[0],
                                k * space + dis[1],
                                space,
                                space
                            )
                        }
                    }
                } else {
                    ctx.fillRect(
                        p[0] * space + dis[0],
                        p[1] * space + dis[1],
                        space,
                        space
                    )
                }
            })

        }
    }
}

let renderSkin = (e, skin, sw, sh) => {

    let priority = skin.priority
    if (e.face === 1) {
        for (let i in priority) {
            let part = skin[priority[i]]

            for (let key in part) {
                let draw = part[key]

                ctx.fillStyle = draw.color
                draw.points.forEach((p) => {
                    if (Array.isArray(p[0])) {
                        for (let j = p[0][0]; j <= p[1][0]; j++) {
                            for (let k = p[0][1]; k <= p[1][1]; k++) {
                                ctx.fillRect(
                                    e.lt[0] + j * sw - vx,
                                    e.lt[1] + k * sh,
                                    sw + 1,
                                    sh + 1
                                )
                            }
                        }
                    } else {
                        ctx.fillRect(
                            e.lt[0] + p[0] * sw - vx,
                            e.lt[1] + p[1] * sh,
                            sw + 1,
                            sh + 1
                        )
                    }
                })
            }
        }
    }
    else {
        for (let i in priority) {
            let part = skin[priority[i]]

            for (let key in part) {
                let draw = part[key]

                ctx.fillStyle = draw.color

                let len = e.len.w / sw
                draw.points.forEach((p) => {
                    if (Array.isArray(p[0])) {
                        for (let j = len - p[1][0]; j <= len - p[0][0]; j++) {
                            for (let k = p[0][1]; k <= p[1][1]; k++) {
                                ctx.fillRect(
                                    e.lt[0] + j * sw - vx,
                                    e.lt[1] + k * sh,
                                    sw,
                                    sh
                                )
                            }
                        }
                    } else {
                        ctx.fillRect(
                            e.lt[0] + (len - p[0]) * sw - vx,
                            e.lt[1] + p[1] * sh,
                            sw,
                            sh
                        )
                    }
                })
            }
        }
    }

}

let drawWin = () =>{
    ctx.fillStyle = `rgb(124, 161, 159, ${winCap})`

    ctx.fillRect(0, 0, w, h)
}

let drawCycle = () =>{

}


// --------- darw title

let drawTitle = () =>{
    let e = {
        face :1,
        lt:[100,50]
    }

    renderSkin(e, titleSkin, 13,13)
}


let drawText = () => {
    if(toolTextIndex < 0) return

    ctx.fillStyle = '#34ebd2'
    ctx.font = "20px Arial";
    let text = toolText[toolTextIndex]
    let disX = text.length * 3
    ctx.fillText(text, hero.lt[0] - disX -vx, hero.lt[1] -  10);

}
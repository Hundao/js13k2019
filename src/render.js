

let drawBackground = () => {
    ctx.fillStyle = '#cdd6c9';
    ctx.fillRect(0, 0, w, h);
}

let drawGround = () => {
    ctx.fillStyle = '#665753'
    let group = groups['ground']

    group.elements.forEach((e) => {
        ctx.fillRect(
            e.lt[0] - vx,
            e.lt[1],
            e.len.w,
            e.len.h
        )
    })

}

let drawHero = () => {
    ctx.fillStyle = 'blue'

    let hero = groups['hero'].elements[0]

    let priority = heroSkin.priority

    for(let i in priority){
        let part = heroSkin[priority[i]]

        for(let key in part){
            let draw = part[key]

            ctx.fillStyle = draw.color

            draw.points.forEach((p)=>{
                if(Array.isArray(p[0])){
                    for(let j = p[0][0]; j <= p[1][0]; j++ ){
                        for(let k = p[0][1]; k <= p[1][1]; k++){
                            ctx.fillRect(
                                j + hero.lt[0] - vx, 
                                k + hero.lt[1],
                                1,
                                1
                            )
                        }
                    }
                }else{
                    ctx.fillRect(
                        p[0] + hero.lt[0] -vx,
                        p[1] + hero.lt[1],
                        1,
                        1
                    )
                }
            })
        }
    }

}

let drawEnemy = () => {
    ctx.fillStyle = '#db3f27'
    let group = groups['enemy']
    group.elements.forEach((e) => {
        ctx.fillRect(
            e.lt[0] - vx,
            e.lt[1],
            e.len.w,
            e.len.h
        )
    })
}

let drawBackEffect = (color1, color2) => {

    let grd = ctx.createRadialGradient(w * 0.5, h * 0.5, 250, w * 0.5, h * 0.5, 450)
    // grd.addColorStop(0, 'rgb(63, 64, 61, 0.1');
    // grd.addColorStop(1, 'rgb(227, 32, 64, 1')
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2)
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, w, h)
}

let drawArrow = ()=>{
    ctx.fillStyle = '#db3f27'
    let group = groups['arrow']
    group.elements.forEach((e) => {
        ctx.fillRect(
            e.lt[0] - vx,
            e.lt[1],
            e.len.w,
            e.len.h
        )
    })
}
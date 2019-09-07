

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

    let group = groups['hero']

    group.elements.forEach((e) => {
        ctx.fillRect(
            e.lt[0] - vx,
            e.lt[1],
            e.len.w,
            e.len.h
        )
    })
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

    let grd = ctx.createRadialGradient(w *0.5, h *0.5, 250, w *0.5, h *0.5, 450)
    // grd.addColorStop(0, 'rgb(63, 64, 61, 0.1');
    // grd.addColorStop(1, 'rgb(227, 32, 64, 1')
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2)
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, w, h)
}
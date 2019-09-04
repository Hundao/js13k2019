

let drawBackground = () =>{
    ctx.fillStyle = '#cdd6c9';
    ctx.fillRect(0, 0, w, h);
}

let drawGround = () => {
    ctx.fillStyle = '#665753'
    let group = groups['ground']

    group.elements.forEach((e)=>{
        ctx.fillRect(
            e.lt.x - vx,
            e.lt.y,
            e.len.w,
            e.len.h
        )
    })

}

let drawHero = () => {
    ctx.fillStyle = 'blue'
    
    let group = groups['hero']

    group.elements.forEach((e)=>{
        ctx.fillRect(
            e.lt.x - vx,
            e.lt.y,
            e.len.w,
            e.len.h
        )
    })
}
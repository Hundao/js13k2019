

let drawBackground = () =>{
    ctx.fillStyle = '#cdd6c9';
    ctx.fillRect(0, 0, w, h);
}

let drawGround = () => {
    ctx.fillStyle = '#665753'
    ctx.fillRect(0, h-groundHeight, w, 2)

}

let drawMain = () => {
    ctx.fillStyle = '#8fab63'
    ctx.fillRect(hero.x, hero.y, hero.w, hero.h)
}
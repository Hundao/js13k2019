// using for control the game's flow 


let running = () => {
    drawBackground()
    drawGround()
    drawMain()

    move(hero)
}

function execute(){
    running();
    requestAnimationFrame(execute)
}
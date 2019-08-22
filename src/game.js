// using for control the game's flow 


let running = () => {
    drawBackground()
}

function execute(){
    running();
    requestAnimationFrame(execute)
}
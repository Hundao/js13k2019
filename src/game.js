// using for control the game's flow 


let running = () => {
    drawBackground()
    drawGround()
    drawHero()

    for(let i = 0 ; i < 100; i ++){
        mainFlow()
    }
}

function execute(){
    running();
    requestAnimationFrame(execute)
}

let helper = (num) => {
    for(let i = 0 ; i < num; i++){
        mainFlow()
    }
}
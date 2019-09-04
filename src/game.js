// using for control the game's flow 


let running = () => {
    drawBackground()
    drawGround()
    drawHero()

    for(let i = 0 ; i < 100; i ++){
        mainFlow()
    }

    handleControl()
}

function execute(){
    running();
    requestAnimationFrame(execute)
}

let handleControl = () =>{
    for(let key in controlKeys){     
        if(controlKeys[key]){
            if(actions[key]){
                actions[key]()
            }
        }
    }
}


let helper = (num) => {
    for(let i = 0 ; i < num; i++){
        mainFlow()
    }
}
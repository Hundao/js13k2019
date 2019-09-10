
const main = () => {
    onresize()
    initSky()
    initHero()
    initGround()
    initEnemy()
    initArrow()

    running = gaming
    execute()
    
    setTimeout(()=>{
        
        playMusic()
    }, 1000)
}

window.onload = main
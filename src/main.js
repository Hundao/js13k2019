
const main = () => {
    onresize()
    initSky()
    initHero()
    initGround()
    initEnemy()
    initArrow()

    running = gaming
    execute()
}

window.onload = main
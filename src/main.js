
const main = () => {
    onresize()
    initHero()
    initGround()
    initEnemy()
    initArrow()

    running = gaming
    execute()
}

window.onload = main
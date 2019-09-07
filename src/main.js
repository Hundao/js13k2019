
const main = () => {
    onresize()
    initHero()
    initGround()
    initEnemy()

    running = gaming
    execute()
}

window.onload = main
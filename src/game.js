// using for control the game's flow 

let gaming = () => {
    handleViewMove()
    drawBackground()
    drawGround()
    drawHero()
    drawEnemy()
    drawArrow()
    drawHead()

    for (let i = 0; i < demStepInPerFrame; i++) {
        demStep()
    }

    handleControl()
    handleArrowContact()
    handleEnemyMove()
    handleHeroAttaced()
    handleShooting()
    handleMakeSnapshot()
    handleHeroCanJump()
    handleEnemyDie()
    handleResetContactPlane()

    events.forEach((e, i) => e(i))
}

let eventing = () => {
    drawBackground()
    drawGround()
    drawHero()
    drawEnemy()
    drawArrow()
    drawHead()
}

function execute() {
    running();
    requestAnimationFrame(execute)
}


let heroTimeBack = () => {
    drawBackground()
    drawGround()
    drawEnemy()
    drawHero()
    drawArrow()

    drawBackEffect('rgb(34, 150, 227, 0.08', 'rgb(0, 183, 255, 1')


    handleHeroTimeBack()

    if (controlKeys['q'] === false) {
        running = gaming
        stopReserverMusic()
        playMusic()
    }

}

let enemyTimeBack = () => {
    drawBackground()
    drawGround()
    drawEnemy()
    drawHero()
    drawArrow()

    drawBackEffect('rgb(63, 64, 61, 0.1', 'rgb(227, 32, 64, 1')


    handleEnemyTimeBack()

    if (controlKeys['w'] === false) {
        running = gaming
    }
}










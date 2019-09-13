// using for control the game's flow 
let winning = () =>{

    drawBackground()
    drawGround()
    drawHero()
    drawEnemy()
    drawArrow()
    drawHead()
    drawWin()
}

let starting = () =>{
    drawBackground()
    drawGround()
    drawHero()
    drawEnemy()
    drawArrow()
    drawTitle()
    drawText()
    

    for (let i = 0; i < demStepInPerFrame; i++) {
        demStep()
    }

    

    startEvents.forEach((e, i) => e(i))

    handleControl()
    handleArrowContact()
    handleShooting()
    handleHeroCanJump()
    handleResetContactPlane()
    handleEnemyDie()
    handleIdel()
    handleEnterGaming()


}

let dieing = () =>{
    drawBackground()
    drawGround()
    drawHero()
    drawEnemy()
    drawArrow()
    drawHead()
    drawDie()
}

let gaming = () => {
    drawBackground()
    drawGround()
    drawHero()
    drawEnemy()
    drawArrow()
    drawHead()
    drawText()

    for (let i = 0; i < demStepInPerFrame; i++) {
        demStep()
    }


    events.forEach((e, i) => e(i))

    handleViewMove()
    handleControl()
    handleArrowContact()
    handleEnemyMove()
    handleHeroAttaced()
    handleShooting()
    handleMakeSnapshot()
    handleHeroCanJump()
    handleEnemyDie()
    handleResetContactPlane()
    handleBossActive()
    handleHeroDie()

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

    if (controlKeys['z'] === false) {
        running = gaming
        stopReserverMusic()
        playMusic()
    }

}

// let enemyTimeBack = () => {
//     drawBackground()
//     drawGround()
//     drawEnemy()
//     drawHero()
//     drawArrow()

//     drawBackEffect('rgb(63, 64, 61, 0.1', 'rgb(227, 32, 64, 1')


//     handleEnemyTimeBack()

//     if (controlKeys['w'] === false) {
//         running = gaming
//     }
// }










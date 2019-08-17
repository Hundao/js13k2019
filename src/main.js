
const main = () => {
    console.log('main execute')
    const game = new Game()

    onresize()
    game.execute()
}

window.onload = main
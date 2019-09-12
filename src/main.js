
const main = () => {
    onresize()
    initStarting()

    running = starting
    execute()
    
    // setTimeout(()=>{
        
    //     playMusic()
    // }, 1000)
}

window.onload = main
// using for control the game's flow 

class Game{
    constructor(){
        this.adc=123;
        this.executing = this.execute.bind(this)

        this.running = this.starting
    }

    execute(){
        this.running()
        requestAnimationFrame(this.executing)
    }

    starting(){
        console.log('i am in the start status')
    }
}
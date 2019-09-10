events = []
happend = [ true, true]

events.push((i, force)=>{
    if(!happend[i]) return

    if(hero.pos[0] > 1078 && hero.pos[1] > 450 || force){
        running = eventing
        groupMove(5, 0, -130)
        groupMove(6, 1, 150)
        happend[i] = false
    }

})


events.push((i, force)=>{
    if(!happend[i]) return

    if(hero.pos[0] > 2200 && hero.pos[1] > 450 || force){
        running = eventing
        groupMove(6, 1, -150)

        happend[i] = false
    }
})

events.push((i, force)=>{
    if(happend[i]) return

    if(hero.pos[0] > 2340 || force){
        fixed = true
        vx = 1955
    }

})

let groupMove = (index, dir, dis) =>{

    let divide = dis * 0.01
    let e =  groups['ground'].elements[index]
    let oriLt = e.lt[dir]

    for(let i = 0; i < 100; i++){
        setTimeout(()=>{
           e.lt[dir] += divide
        }, 20 * i)
    }

    setTimeout(()=>{
        running = gaming
        e.pos[dir] += dis
        e.rd[dir] += dis
        e.lt[dir] = oriLt + dis
    }, 2000)
}
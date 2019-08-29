
let isContact = (a, b) => {

}

let move = (obj) => {

    obj.vy += gravity * dt

    obj.x += obj.vx * dt
    obj.y += obj.vy * dt
}
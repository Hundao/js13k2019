let 
 ctx = document.getElementById("13canvas").getContext("2d"),
 w = 768,
 h = 640,

 keys = {},
 gravity = 9.81,
 dt = 0.001,

 groundHeight = 200,

 groups={},
 
 difGupContacts={},
 sameGupContacts={},

 bound = {
    uX: 1000,
    uY: 1000,
    lX:0,
    lY:0
 }
; 
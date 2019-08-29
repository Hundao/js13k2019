let 
 ctx = document.getElementById("13canvas").getContext("2d"),
 w = 768,
 h = 640,

 keys = {},
 gravity = 1,
 dt = 1,

 groundHeight = 200,

 hero={
     w: 10,
     h: 10,
     x: 10,
     y: 400,
     vy: 0,
     vx: 0
 }
; 
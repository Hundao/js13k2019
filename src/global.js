let
    ctx = document.getElementById("13canvas").getContext("2d"),
    w = 768,
    h = 640,

    vx = 0,
    mapw = 3000,
    running = null,

    keys = {},
    gravity = 9.81,
    dt = 0.001,
    controlKeys = {},
    actions = {},
    antiActions = {},
    groundHeight = 200,
    fixed = false,
    hero = null,

    bowForce = 50,
    shooting = false,
    moving = false,
    sky = [],
    superTime = 1000,

    groups = {},
    user = {
        hp: 80,
        maxHp: 100,
    },

    difGupContacts = {},
    sameGupContacts = {},

    bound = {
        uX: 3000,
        uY: 1000,
        lX: 0,
        lY: 0
    },

    stoneConfig = {
        den:0.0002,
        space:10
    },
    
    demStepInPerFrame = 100
; 
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
    boss = null,
    bossActive = false,
    globalSnapshot = {},
    heroSnapshot = [],
    bowForce = 50,
    shooting = false,
    moving = false,
    sky = [],
    superTime = 1000,
    cd = {
        destory:[9000, 10000],
        summon:[10000, 15000]
    },
    cycler = 1,
    monster1Die = false,

    events = [],
    happend = [true, true, true, true, true],
    startEvents = [],
    startHappend = [true, true, true],
    enemyView = 500,

    groups = {},
    isSave = true,
    difGupContacts = {},
    sameGupContacts = {},
    enemyVeclocity =  3e12,
    timeouts = []
    bound = {
        uX: 3000,
        uY: 1000,
        lX: 0,
        lY: 0
    },

    stoneConfig = {
        den: 0.0002,
        space: 10
    },

    demStepInPerFrame = 100,

    toolText = [
        '↑↓←→ to move',
        `'c' to jump`,
        `'x' to attack`,
        `'z' to backtracking`
    ],
    toolTextIndex = -1,
    winCap = 0,
    dieCap = 0,
    saveCap = 0
    ; 
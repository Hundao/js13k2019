onresize = function(){
    var mw = innerWidth,
        mh = innerHeight,

        ar = mw / mh, // available ratio
        br = 1.2, // base ratio
        w,
        h,
        s = document.querySelector('#in').style;

    if(ar <= br){
        w = mw;
        h = w / br;
    }else{
        h = mh;
        w = h * br;
    }

    s.width = w + 'px';
    s.height = h + 'px';
}

onkeydown = function(e){
    switch(e.keyCode){
        case 38:
            controlKeys['up'] = true
            break;
        case 40:
            controlKeys['down'] = true
            break;
        case 37:
            controlKeys['left'] = true
            break;
        case 39:
            controlKeys['right'] = true
            break;
        case 67:
            controlKeys['c'] = true
            break;
    }
}

onkeyup = function(e){
    switch(e.keyCode){
        case 38:
            controlKeys['up'] = false
            break;
        case 40:
            controlKeys['down'] = false
            break;
        case 37:
            controlKeys['left'] = false
            break;
        case 39:
            controlKeys['right'] = false
            break;
        case 67:
            controlKeys['c'] = false
            break;
    }
}
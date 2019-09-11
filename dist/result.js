actions.c=function(){let e=groups.hero;if(e.canJump){let t=e=>{e.f[1]-=1e12};controlKeys.left&&(t=(e=>{e.f[1]-=5e11})),controlKeys.right&&(t=(e=>{e.f[1]-=5e11})),e.elements.forEach(t),playJumpAudio(),e.canJump=!1}},actions.right=function(){hero.f[0]+=1e11,hero.face=1,moving=!0},actions.left=function(){hero.f[0]-=1e11,hero.face=-1,moving=!0},actions.down=function(){groups.hero.elements.forEach(e=>{e.f[1]+=1e11})},actions.up=function(){groups.hero.elements.forEach(e=>{e.f[1]-=15e9})},actions.q=function(){running=heroTimeBack},actions.w=function(){running=enemyTimeBack},actions.x=function(){bowForce<200&&(bowForce+=1),shooting=!0},antiActions.x=function(){},actions.m=function(){stopMusic()};var ac="undefined"!=typeof AudioContext?new AudioContext:new webkitAudioContext,tempo=240,lead=["- h","A4 h","Bb4 h","D5 h","C5 h","Bb4 q","A4 q","G4 h","C4 h","F4 h","G4 h","A4 h","Bb4 q","A4 q","G4 8","- h","A3 h","Bb3 h","D4 h","C4 w","G4 q","A4 q","Bb4 q","G4 q","A4 h","A3 h","Bb3 h","Bb4 h","G4 h","G4 q","A4 q","Bb4 h","G4 h","A4 w","C5 w","Bb4 6","A4 q","D5 w","C5 w","G4 h","G4 q","A4 q","Bb4 w","G4 w","A4 w","C5 w","Bb4 6","A4 h","D5 q","E4 q","C5 q","C3 q","C5 h","G4 q","A4 q","Bb4 h","B4 h","C5 h","G4 q","A4 q","Bb4 h","B4 h","C5 h","G4 q","A4 q","Bb4 h","B4 h","C5 h","G4 q","A4 q","Bb4 h","B4 h","C5 h","A4 q","Bb4 q","C5 h","Db5 h","D5 h","Bb4 q","C5 q","D5 h","E5 h","F5 h","D5 q","E5 q","F5 h","G5 h","A5 h","A5 h","Bb5 h","D6 h"],horn=["C3 8","C3 8","C3 8","C3 8","F3 w","D3 w","E3 w","C3 w","F3 w","D3 w","E3 6","C3 h","F3 w","C4 w","C4 6","F3 q","B2 w","C4 w","C4 8","F3 w","A3 w","G3 6","F3 h","F3 w","F3 w","G3 6","D4 h","G3 6","D4 h","G3 6","D4 h","G3 h","- 6","- h","A3 q","Bb3 q","C4 h","Cb4 h","D4 h","Bb3 q","C4 q","D4 h","E4 h","F4 h","D4 q","E4 q","F4 h","G4 h","C3 h","C3 h","C3 h","3 h3"],fen=.125,shootF=[`G3 ${fen}`,`A3 ${fen}`,`B3 ${fen}`,`C4 ${fen}`,`D4 ${fen}`,`E4 ${fen}`],jumpF=["B2 s","C2 s"];mainAudio=new TinyMusic.Sequence(ac,tempo,lead),subAudio=new TinyMusic.Sequence(ac,tempo,horn),jumpAudio=new TinyMusic.Sequence(ac,tempo,jumpF),shootAudio=new TinyMusic.Sequence(ac,tempo,shootF),reverseMainAudio=new TinyMusic.Sequence(ac,10*tempo,lead.reverse()),reverseSubAudio=new TinyMusic.Sequence(ac,10*tempo,horn.reverse()),mainAudio.loop=!0,subAudio.loop=!0,reverseMainAudio.loop=!0,reverseSubAudio.loop=!0,jumpAudio.loop=!1,shootAudio.loop=!1,mainAudio.staccato=.55,subAudio.staccato=.55,jumpAudio.staccato=.55,shootAudio.staccato=.55,mainAudio.gain.gain.value=.1,subAudio.gain.gain.value=.05,jumpAudio.gain.gain.value=.03,shootAudio.gain.gain.value=.03,reverseMainAudio.gain.gain.value=.1,reverseSubAudio.gain.gain.value=.05,mainAudio.mid.frequency.value=1e3,mainAudio.mid.gain.value=3,jumpAudio.mid.gain.value=3,reverseMainAudio.mid.frequency.value=1e3,reverseMainAudio.mid.gain.value=3,reverseSubAudio.mid.gain.value=3;let playReserverMusic=()=>{reverseMainAudio.play(),reverseSubAudio.play()},stopReserverMusic=()=>{reverseMainAudio.stop(),reverseSubAudio.stop()},playMusic=()=>{mainAudio.play(),subAudio.play()},stopMusic=()=>{mainAudio.stop(),subAudio.stop()},playJumpAudio=()=>{jumpAudio.stop(),jumpAudio.play()},playShootMusic=()=>{shootAudio.stop(),shootAudio.play()};class ContactPlane{constructor(e,t){this.nc=[0,0],this.gc=0,this.dis=0,this.f=[0,0],this.rV=[0,0],this.inD=[0,0],this.isContact=!1,this.isBound=!1,this.element1Index=e,this.element2Index=t}}class Rectangle{constructor(e,t,o,n,s,r,i,a,l=1){this.id=e,this.mass=n*s*a,this.invm=1/this.mass,this.pos=[t+.5*n,o+.5*s],this.lt=[t,o],this.rd=[t+n,o+s],this.len={w:n,h:s},this.f=[0,0],this.v=[r,i],this.face=l}}class Contact{constructor(e,t,o,n){this.kn=o,this.pkn=n,this.group1Index=e,this.group2Index=t,this.contactPlanes={}}}class Group{constructor(e,t,o,n){this.isRigid=n,this.damp=o,this.density=t,this.name=e,this.elements=[],this.bc=[0,0],this.snapshots=[]}}let demStep=()=>{handleContact(),receiveForce(),verlet(),resetForce()},verlet=()=>{for(let e in groups){let t=groups[e];if(!t.isRigid)for(let e in t.elements){let o=t.elements[e];o.v=scale(t.damp,o.v);let n=1-t.damp;o.v[0]+=o.f[0]*o.invm*n*dt,o.v[1]+=(o.f[1]*o.invm+gravity*o.mass)*n*dt;let s=scale(dt,o.v);o.lt[0]+s[0]>bound.lX&&o.rd[0]+s[0]<bound.uX&&(o.pos[0]+=s[0],o.lt[0]+=s[0],o.rd[0]+=s[0]),o.lt[1]+s[1]>bound.lY&&o.rd[1]+s[1]<bound.uY&&(o.pos[1]+=s[1],o.lt[1]+=s[1],o.rd[1]+=s[1])}}},handleContact=()=>{for(let e in difGupContacts){let t=difGupContacts[e],o=groups[t.group1Index],n=groups[t.group2Index];for(let e=0;e<o.elements.length;e++)for(let s=0;s<n.elements.length;s++){let r=o.elements[e],i=n.elements[s],a=`${e}-${s}`;if(t.contactPlanes.hasOwnProperty(a)){let o=t.contactPlanes[a];o.element1Index=e,o.element2Index=s,_updateContactPlane(r,i,o,t)}else{let o=new ContactPlane(e,s);_updateContactPlane(r,i,o,t),t.contactPlanes[a]=o}}if("hero"===t.group1Index||"hero"===t.group2Index)for(let e in t.contactPlanes)t.contactPlanes[e].isContact&&(groups.hero.canJump=!0)}for(let e in sameGupContacts){let t=sameGupContacts[e],o=groups[t.group1Index];for(let e=0;e<o.elements.length;e++)for(let n=e+1;n<o.elements.length;n++){let s=o.elements[e],r=o.elements[n],i=`${e}-${n}`;if(t.contactPlanes.hasOwnProperty(i)){let o=t.contactPlanes[i];o.element1Index=e,o.element2Index=n,_updateContactPlane(s,r,o,t)}else{let o=new ContactPlane(e,n);_updateContactPlane(s,r,o,t),t.contactPlanes[i]=o}}}},_updateContactPlane=(e,t,o,n)=>{if(o.isContact=!0,(e.lt[0]>t.rd[0]||t.lt[0]>e.rd[0])&&(o.isContact=!1),(e.lt[1]>t.rd[1]||t.lt[1]>e.rd[1])&&(o.isContact=!1),o.isContact){let s=distance(e.pos,t.pos),r=scale(1/s,minus(e.pos,t.pos));0===r[0]&&0===r[1]&&(r=[1,0]);let i=Math.max(e.lt[0],e.rd[0],t.lt[0],t.rd[0]),a=Math.min(e.lt[0],e.rd[0],t.lt[0],t.rd[0]),l=Math.max(e.lt[1],e.rd[1],t.lt[1],t.rd[1]),c=Math.min(e.lt[1],e.rd[1],t.lt[1],t.rd[1]),h=e.len.w+t.len.w-(i-a),u=e.len.h+t.len.h-(l-c),p=!0;e.len.w>t.len.w?h*u==t.len.w*t.len.h?(r=o.nc,p=!1):h===t.len.w&&(r[1]>0?(r=[0,1],p=!1):(r=[0,-1],p=!1)):h*u==e.len.w*e.len.h?(r=o.nc,p=!1):h===e.len.w&&(r[1]>0?(r=[0,1],p=!1):(r=[0,-1],p=!1)),e.len.h>t.len.h&&p?u===t.len.h&&(r=r[0]>0?[1,0]:[-1,0]):p&&u===e.len.h&&(r=r[0]>0?[1,0]:[-1,0]),o.gc=h*u,o.nc=r,o.f=scale(n.kn,scale(o.gc,o.nc))}o.isBound&&(o.rV=minus(t.v,e.v),o.inD=plus(o.inD,scale(dt,o.rV)),o.f=plus(o.f,scale(n.pkn,o.inD)))},receiveForce=()=>{for(let e in difGupContacts){let t=difGupContacts[e],o=groups[t.group1Index],n=groups[t.group2Index];for(let e in t.contactPlanes){let s=t.contactPlanes[e];if(!s.isContact)continue;let r=o.elements[s.element1Index],i=n.elements[s.element2Index];r.f=minus(s.f,r.f),i.f=plus(s.f,i.f)}}for(let e in sameGupContacts){let t=sameGupContacts[e],o=groups[t.group1Index];for(let e in t.contactPlanes){let n=t.contactPlanes[e];if(!n.isContact&&!n.isBound)continue;let s=o.elements[n.element1Index],r=o.elements[n.element2Index];s.f=minus(n.f,s.f),r.f=plus(n.f,r.f)}}},resetForce=()=>{for(let e in groups){let t=groups[e];for(let e in t.elements)t.elements[e].f=[0,0]}};events=[],happend=[!0,!0],events.push((e,t)=>{happend[e]&&(hero.pos[0]>1078&&hero.pos[1]>450||t)&&(running=eventing,groupMove(5,0,-130),groupMove(6,1,150),happend[e]=!1)}),events.push((e,t)=>{happend[e]&&(hero.pos[0]>2200&&hero.pos[1]>450||t)&&(running=eventing,groupMove(6,1,-150),happend[e]=!1)}),events.push((e,t)=>{happend[e]||(hero.pos[0]>2340||t)&&(fixed=!0,vx=1955,happend[e]=!1)});let groupMove=(e,t,o)=>{let n=.01*o,s=groups.ground.elements[e],r=s.lt[t];for(let e=0;e<100;e++)setTimeout(()=>{s.lt[t]+=n},20*e);setTimeout(()=>{running=gaming,s.pos[t]+=o,s.rd[t]+=o,s.lt[t]=r+o},2e3)},skepEvent=()=>{running=eventing,groupMove(5,0,-130),groupMove(6,1,150),running=eventing,happend[0]=!1,happend[1]=!1},showBoss=()=>{};vx=1955,fixed=!0;let gaming=()=>{handleViewMove(),drawBackground(),drawGround(),drawHero(),drawEnemy(),drawArrow(),drawHead();for(let e=0;e<100;e++)demStep();handleControl(),handleArrowContact(),handleEnemyMove(),handleHeroAttaced(),makeSnapshot(),events.forEach((e,t)=>e(t))},eventing=()=>{drawBackground(),drawGround(),drawHero(),drawEnemy(),drawArrow(),drawHead()};function execute(){running(),requestAnimationFrame(execute)}let handleControl=()=>{moving=!1;for(let e in controlKeys)controlKeys[e]&&actions[e]&&actions[e]();if(shooting&&!controlKeys.x){let e=groups.arrow,t=groups.hero.elements[0],o=scale(bowForce,[t.face,-.1]);playShootMusic(),e.elements.push(new Rectangle(e.elements.length,t.pos[0],t.pos[1],10,10,o[0],o[1],200,t.face)),bowForce=100,shooting=!1}controlKeys.q&&(stopMusic(),playReserverMusic())},makeSnapshot=()=>{for(let e in groups){let t=groups[e],o={elements:[]};for(let e in t.elements){let n=t.elements[e];o.elements.push({pos:[n.pos[0],n.pos[1]],v:[n.v[0],n.v[1]],lt:[n.lt[0],n.lt[1]],rd:[n.rd[0],n.rd[1]]})}o.vx=vx,t.snapshots.push(o)}},heroTimeBack=()=>{drawBackground(),drawGround(),drawEnemy(),drawHero(),drawArrow(),drawBackEffect("rgb(34, 150, 227, 0.08","rgb(0, 183, 255, 1");let e=groups.hero;e.snapshots.length>0?(_copyState(e,!0),e.snapshots.pop()):console.log("snapshot is no more"),!1===controlKeys.q&&(running=gaming,stopReserverMusic(),playMusic())},enemyTimeBack=()=>{drawBackground(),drawGround(),drawEnemy(),drawHero(),drawArrow(),drawBackEffect("rgb(63, 64, 61, 0.1","rgb(227, 32, 64, 1");let e=groups.enemy;e.snapshots.length>0?(_copyState(e),e.snapshots.pop()):console.log("snapshot is no more"),!1===controlKeys.w&&(running=gaming)},_copyState=(e,t=!1)=>{let o=e.snapshots[e.snapshots.length-1];for(let t in e.elements){let n=e.elements[t];n.pos[0]=o.elements[t].pos[0],n.pos[1]=o.elements[t].pos[1],n.lt[0]=o.elements[t].lt[0],n.lt[1]=o.elements[t].lt[1],n.rd[0]=o.elements[t].rd[0],n.rd[1]=o.elements[t].rd[1],n.v[0]=o.elements[t].v[0],n.v[1]=o.elements[t].v[1]}t&&(vx=o.vx)},handleArrowContact=()=>{let e={};for(let t in difGupContacts["arrow-ground"].contactPlanes){let o=difGupContacts["arrow-ground"].contactPlanes[t];o.isContact&&(e[o.element1Index]=!0)}for(let t in difGupContacts["arrow-enemy"].contactPlanes){let o=difGupContacts["arrow-enemy"].contactPlanes[t];o.isContact&&(e[o.element1Index]=!0)}groups.arrow.elements.forEach((t,o)=>{(t.lt[0]<=bound.lX+1||t.rd[0]>=bound.uX-1)&&(e[o]=!0)}),groups.arrow.elements=groups.arrow.elements.filter((t,o)=>!e[o]),difGupContacts["arrow-ground"].contactPlanes={},difGupContacts["arrow-enemy"].contactPlanes={}},handleHeroAttaced=()=>{for(let e in difGupContacts["enemy-hero"].contactPlanes){difGupContacts["enemy-hero"].contactPlanes[e].isContact&&!1===groups.hero.isSuper&&(groups.hero.isSuper=!0,user.hp-=10,setTimeout(()=>{groups.hero.isSuper=!1}))}},handleEnemyMove=()=>{let e=groups.enemy.elements,t=groups.hero.elements[0];e.forEach(e=>{if(e.canMove){if(distance(t.pos,e.pos)<500){let o=t.pos[0]>e.pos[0]?1:-1;e.face=o,e.f=plus(e.f,scale(3e12,[o,-10])),e.canMove=!1,setTimeout(()=>e.canMove=!0,100)}}})},handleViewMove=()=>{if(fixed)return;let e=groups.hero.elements[0].pos,t=e[0]-.5*w,o=e[0]+.5*w;t>0?o<mapw&&(vx=t):vx=0},ctx=document.getElementById("13canvas").getContext("2d"),w=768,h=640,vx=0,mapw=3e3,running=null,keys={},gravity=9.81,dt=.001,controlKeys={},actions={},antiActions={},groundHeight=200,fixed=!1,hero=null,bowForce=50,shooting=!1,moving=!1,sky=[],groups={},user={hp:80,maxHp:100},difGupContacts={},sameGupContacts={},bound={uX:3e3,uY:1e3,lX:0,lY:0};envGroups=[],onresize=function(){var e,t,o=innerWidth,n=innerHeight,s=o/n,r=document.querySelector("#in").style;s<=1.2?t=(e=o)/1.2:e=1.2*(t=n),r.width=e+"px",r.height=t+"px"},onkeydown=function(e){switch(e.keyCode){case 38:controlKeys.up=!0;break;case 40:controlKeys.down=!0;break;case 37:controlKeys.left=!0;break;case 39:controlKeys.right=!0;break;case 67:controlKeys.c=!0;break;case 81:controlKeys.q=!0;break;case 87:controlKeys.w=!0;break;case 69:controlKeys.e=!0;break;case 88:controlKeys.x=!0;break;case 77:controlKeys.m=!0}},onkeyup=function(e){switch(e.keyCode){case 38:controlKeys.up=!1;break;case 40:controlKeys.down=!1;break;case 37:controlKeys.left=!1;break;case 39:controlKeys.right=!1;break;case 67:controlKeys.c=!1;break;case 81:controlKeys.q=!1;break;case 87:controlKeys.w=!1;break;case 69:controlKeys.e=!1;break;case 88:controlKeys.x=!1;break;case 77:controlKeys.m=!1}};let initHero=()=>{let e=new Group("hero",100,.999,!1),t=new Contact("hero","hero",1e8,1e3);e.elements.push(new Rectangle(0,100,400,20,40,0,0,15));for(let o=0;o<e.elements.length;o++)for(let n=o+1;n<e.elements.length;n++){let e=`${o}-${n}`;t.contactPlanes[e]=new ContactPlane(o,n)}e.canJump=!1,e.face=[1,0],e.isSuper=!1,groups.hero=e,sameGupContacts["hero-hero"]=t,hero=e.elements[0]};initGround=(()=>{let e=new Group("ground",0,0,!0);e.elements.push(new Rectangle(0,0,550,200,90,0,0,9999),new Rectangle(1,200,140,150,500,0,0,9999),new Rectangle(2,350,400,600,240,0,0,9999),new Rectangle(3,950,60,120,640,0,0,9999),new Rectangle(4,1070,500,800,140,0,0,9999),new Rectangle(5,1200,150,820,140,0,0,9999),new Rectangle(6,1870,0,150,640,0,0,9999),new Rectangle(7,2020,500,980,140,0,0,9999)),contact=new Contact("hero","ground",1e8,100);for(let t=0;t<groups.hero.elements.length;t++)for(let o=0;o<e.elements.length;o++){let e=`${t}-${o}`;contact.contactPlanes[e]=new ContactPlane(t,o)}difGupContacts["ground-hero"]=contact,groups.ground=e;e.elements.forEach(e=>{e.stones=[];let t=2e-4*e.len.w*e.len.h;for(let o=0;o<t;o++){let t=Math.random()*(e.len.w-20),o=Math.random()*(e.len.h-40);switch(Math.floor(5*Math.random())){case 0:case 1:e.stones.push([t,o]);break;case 2:e.stones.push([t,o],[t+10,o],[t,o+10],[t+10,o+10]);break;case 3:e.stones.push([t,o],[t+10,o]);break;case 4:e.stones.push([t,o],[t+10,o],[t+20,o])}}})}),initEnemy=(()=>{let e=new Group("enemy",100,.99,!1);e.elements.push(new Rectangle(0,500,200,100,100,0,0,55),new Rectangle(1,700,200,100,100,0,0,55),new Rectangle(2,1600,200,100,100,0,0,55));let t=new Contact("enemy","ground",9e9,100),o=new Contact("enemy","hero",1e10,100),n=new Contact("enemy","enemy",1e10,100);e.elements.forEach(e=>{e.canMove=!0}),groups.enemy=e,difGupContacts["enemy-ground"]=t,difGupContacts["enemy-hero"]=o,sameGupContacts["enemy-enemy"]=n}),initBoss=(()=>{let e=new Group("boss",100,.99,!0);e.elements.push(new Rectangle(0,2600,200,100,300,0,0,55)),groups.boss=e}),initArrow=(()=>{let e=new Group("arrow",50,.999999,!1);contact=new Contact("arrow","ground",1e12,0),contactEnemy=new Contact("arrow","enemy",1e10,0),contactBoss=new Contact("arrow","boss",1e12,0),difGupContacts["arrow-ground"]=contact,difGupContacts["arrow-enemy"]=contactEnemy,difGupContacts["arrow-boss"]=contactBoss,groups.arrow=e}),initSky=(()=>{let e=w*h*.3333*.001;for(let t=0;t<e;t++){let e=Math.random()*mapw,t=.3333*Math.random()*h,o=5;switch(Math.floor(3*Math.random())){case 0:sky.push([e,t],[e+o,t+o],[e-o,t+o],[e,t+2*o]);break;case 1:sky.push([e,t]);break;case 2:sky.push([e,t],[e-o,t+o],[e,t+o],[e+o,t+o],[e,t+2*o])}}});let dot=(e,t)=>e[0]*t[0]+e[1]*t[1],scale=(e,t)=>[t[0]*e,t[1]*e],normalization=e=>{let t=Math.sqrt(dot(e,e));return scale(t,e)},distance=(e,t)=>{let o=minus(e,t);return Math.sqrt(dot(o,o))},minus=(e,t)=>[t[0]-e[0],t[1]-e[1]],plus=(e,t)=>[e[0]+t[0],e[1]+t[1]];const main=()=>{onresize(),initSky(),initHero(),initGround(),initEnemy(),initArrow(),initBoss(),running=gaming,execute()};window.onload=main;let drawBackground=()=>{let e=ctx.createLinearGradient(0,0,w,h);e.addColorStop(0,"#53468E"),e.addColorStop(.33,"#5B65A3"),e.addColorStop(1,"#418DB0"),ctx.fillStyle=e,ctx.fillRect(0,0,w,h),ctx.fillStyle="#9BADCE",sky.forEach(e=>{ctx.fillRect(e[0]-vx,e[1],5.5,5.5)})},drawGround=()=>{let e=groups.ground;e.elements.forEach(e=>{ctx.fillStyle="#3CA836",ctx.fillRect(e.lt[0]-vx,e.lt[1],e.len.w+1,10),ctx.fillStyle="#978426",ctx.fillRect(e.lt[0]-vx,e.lt[1]+10,e.len.w+1,15),ctx.fillStyle="#A94823",ctx.fillRect(e.lt[0]-vx,e.lt[1]+10+15,e.len.w+1,e.len.h),ctx.fillStyle="#A98F81",e.stones.forEach(t=>{ctx.fillRect(t[0]-vx+e.lt[0],t[1]+e.lt[1],11,11)})})},drawHero=()=>{ctx.fillStyle="blue";let e=groups.hero.elements[0],t=heroSkin;shooting&&moving?t=heroMoveAndShoot:shooting?t=heroShootSkin:moving&&(t=heroMoveSkin),renderSkin(e,t,1,1)};const enemySkins=[monsterSkin2,monsterSkin2,monsterSkin1];let drawEnemy=()=>{ctx.fillStyle="#2c362e";let e=groups.enemy;monsterSkin1;e.elements.forEach((e,t)=>{renderSkin(e,enemySkins[t],5,5)}),drawBoss()},drawBackEffect=(e,t)=>{let o=ctx.createRadialGradient(.5*w,.5*h,250,.5*w,.5*h,450);o.addColorStop(0,e),o.addColorStop(1,t),ctx.fillStyle=o,ctx.fillRect(0,0,w,h)},drawArrow=()=>{groups.arrow.elements.forEach(e=>{renderSkin(e,arrowSkin,1,1)})},drawBoss=()=>{let e=groups.boss.elements[0];ctx.fillStyle="#A98F81",ctx.fillRect(e.lt[0]-vx,e.lt[1],e.len.w,e.len.h)},drawHead=()=>{ctx.fillStyle="#060001",ctx.lineWidth=5,ctx.lineJoin="round",ctx.strokeRect(98,18,205,24);let e=user.hp/user.maxHp*200,t=(user.maxHp-user.hp)/user.maxHp*200;ctx.fillStyle="#E61E18",ctx.fillRect(100,20,e,20),ctx.fillStyle="#474646",ctx.fillRect(100+e,20,t,20),ctx.fillStyle="#87372f",ctx.beginPath(),ctx.arc(25,15,80,0,2*Math.PI),ctx.fill(),ctx.strokeStyle="black",ctx.stroke();let o=heroSkin,n=["face","hair","eye"],s=[10,10];for(let e in n){let t=o[n[e]];for(let e in t){let o=t[e];ctx.fillStyle=o.color,ctx.fillStyle=o.color,o.points.forEach(e=>{if(Array.isArray(e[0]))for(let t=e[0][0];t<=e[1][0];t++)for(let o=e[0][1];o<=e[1][1];o++)ctx.fillRect(4*t+s[0],4*o+s[1],4,4);else ctx.fillRect(4*e[0]+s[0],4*e[1]+s[1],4,4)})}}},renderSkin=(e,t,o,n)=>{let s=t.priority;if(1===e.face)for(let r in s){let i=t[s[r]];for(let t in i){let s=i[t];ctx.fillStyle=s.color,s.points.forEach(t=>{if(Array.isArray(t[0]))for(let s=t[0][0];s<=t[1][0];s++)for(let r=t[0][1];r<=t[1][1];r++)ctx.fillRect(e.lt[0]+s*o-vx,e.lt[1]+r*n,o+1,n+1);else ctx.fillRect(e.lt[0]+t[0]*o-vx,e.lt[1]+t[1]*n,o+1,n+1)})}}else for(let r in s){let i=t[s[r]];for(let t in i){let s=i[t];ctx.fillStyle=s.color;let r=e.len.w/o;s.points.forEach(t=>{if(Array.isArray(t[0]))for(let s=r-t[1][0];s<=r-t[0][0];s++)for(let r=t[0][1];r<=t[1][1];r++)ctx.fillRect(e.lt[0]+s*o-vx,e.lt[1]+r*n,o,n);else ctx.fillRect(e.lt[0]+(r-t[0])*o-vx,e.lt[1]+t[1]*n,o,n)})}}};heroSkin={priority:["face","cloth","hair","eye","bow","hand","left-foot","right-foot"],hair:{main:{color:"#040000",points:[[[2,1],[7,9]],[[8,1],[12,5]],[[13,2],[18,4]],[[6,0],[9,0]],[3,0],[11,0],[12,0],[15,0],[[15,1],[17,1]],[19,1],[[1,2],[1,6]],[0,3],[19,3],[19,3],[19,4],[0,5],[0,6],[8,6],[9,6],[16,6],[17,6],[18,6],[8,7],[[17,7],[19,7]],[1,8],[19,8],[[0,9],[2,9]],[10,9],[0,10],[1,10],[10,10],[11,10],[11,11],[[3,10],[6,12]],[6,13]]}},face:{main:{color:"#F9D4A5",points:[[[6,5],[15,13]],[[16,6],[16,12]],[[17,8],[17,10]],[[6,14],[9,14]]]}},eye:{main:{color:"#FFFFFF",points:[[15,9]]}},cloth:{main:{color:"#404040",points:[[[3,13],[16,30]],[[17,15],[17,29]]]}},hand:{border:{color:"#000000",points:[[[7,18],[7,25]],[[13,17],[13,25]],[[7,26],[13,26]]]},body:{color:"#F9D4A5",points:[[[9,27],[12,28]]]}},bow:{wood:{color:"#77634C",points:[[0,21],[19,21],[0,22],[1,22],[18,22],[19,22],[1,23],[2,23],[18,23],[[2,24],[5,24]],[17,24],[18,24],[[3,25],[5,25]],[16,25],[17,25],[[6,26],[8,26]],[15,26],[16,26],[[6,27],[15,27]],[[8,28],[12,28]]]},line:{color:"#777268",points:[[[1,26],[1,18]]]}},"left-foot":{pants:{color:"#0E0E0E",points:[[[3,31],[8,37]]]},foot:{color:"#F9D4A5",points:[[[3,38],[8,39]]]}},"right-foot":{pants:{color:"#0E0E0E",points:[[[12,31],[17,37]]]},foot:{color:"#F9D4A5",points:[[[12,38],[17,39]]]}}},heroShootSkin=JSON.parse(JSON.stringify(heroSkin)),heroShootSkin.hand={main:{color:"#F9D4A5",points:[[[7,19],[7,22]],[8,19]]}},heroShootSkin.bow={wood:{color:"#77634C",points:[[12,9],[13,9],[[13,10],[15,11]],[[16,11],[17,13]],[15,12],[17,14],[17,15],[[18,14],[18,19]],[[19,17],[19,26]],[[18,24],[18,29]],[[17,28],[17,31]],[16,30],[16,31],[15,31],[15,32],[14,32],[14,33],[13,33]]},line:{color:"#777268",points:[[[12,10],[12,12]],[[11,12],[11,14]],[[10,14],[10,16]],[[9,16],[9,19]],[[8,20],[8,22]],[[9,23],[9,24]],[[10,24],[10,26]],[[11,26],[11,29]],[[12,29],[12,31]],[[13,31],[13,32]]]},arrow:{color:"#55461F",points:[[[9,21],[13,22]],[[13,20],[18,21]]]}},heroMoveSkin=JSON.parse(JSON.stringify(heroSkin)),delete heroMoveSkin["left-foot"],delete heroMoveSkin["right-foot"],heroMoveSkin.priority.push("foot"),heroMoveSkin.foot={pants:{color:"#0E0E0E",points:[[[5,29],[15,30]],[[6,31],[14,31]],[[8,32],[14,32]],[[7,33],[14,33]],[[6,34],[15,34]],[[5,35],[9,35]],[[12,35],[16,35]],[[6,36],[8,36]],[[14,36],[16,36]],[15,37],[16,37]]},foot:{color:"#F9D4A5",points:[[4,37],[5,37],[12,37],[16,37],[[4,38],[7,39]],[3,39],[12,38],[13,38],[16,38],[17,38],[[12,39],[17,39]]]}},heroMoveAndShoot=JSON.parse(JSON.stringify(heroSkin)),delete heroMoveAndShoot["left-foot"],delete heroMoveAndShoot["right-foot"],heroMoveAndShoot.priority.push("foot"),heroMoveAndShoot.foot=heroMoveSkin.foot,heroMoveAndShoot.hand=heroShootSkin.hand,heroMoveAndShoot.bow=heroShootSkin.bow,arrowSkin={priority:["arrow"],arrow:{wood:{color:"#55461F",points:[[[0,4],[6,4]]]},sliver:{color:"#C7D3CF",points:[[[7,2],[7,6]],[[8,3],[8,5]],[9,4]]},"brown-feather":{color:"#999886",points:[[1,2],[2,3],[2,5],[1,6]]},"black-feather":{color:"#182219",points:[[0,2],[1,3],[1,5],[0,6]]}}},monsterSkin1={priority:["body","line"],body:{main:{color:"#656f7d",points:[[[1,9],[5,14]],[[6,7],[13,13]],[[14,9],[18,14]]]}},line:{main:{color:"#632871",points:[[[0,9],[0,15]],[0,18],[[1,8],[1,11]],[1,15],[1,17],[1,18],[[2,3],[2,5]],[[2,8],[2,10]],[[2,15],[3,18]],[[3,5],[3,9]],[[4,7],[4,12]],[4,15],[5,2],[5,3],[[5,6],[5,8]],[5,10],[5,12],[[5,14],[6,17]],[[6,2],[6,12]],[[7,5],[7,7]],[[7,14],[12,14]],[[8,12],[11,12]],[8,13],[11,13],[[8,4],[11,6]],[8,1],[8,2],[11,1],[11,2],[[9,2],[10,3]],[[12,5],[12,7]],[[13,2],[13,12]],[[13,14],[14,17]],[14,2],[14,3],[[14,6],[14,8]],[14,12],[14,10],[1,12],[[15,7],[15,12]],[15,15],[[16,5],[16,10]],[[16,15],[17,18]],[[17,3],[17,5]],[[17,8],[17,11]],[[18,9],[18,12]],[18,15],[18,17],[18,18],[[19,10],[19,15]],[19,18],[[6,4],[7,5]]]}}},monsterSkin2={priority:["body","line"],body:{main:{color:"#656f7d",points:[[17,14],[[16,11],[16,14]],[14,1],[[1,2],[15,17]],[4,1],[3,1],[13,18],[12,18],[[5,18],[7,18]]]}},line:{main:{color:"#632871",points:[[[2,0],[5,0]],[[13,0],[15,0]],[1,1],[2,1],[[5,1],[13,1]],[15,1],[[16,1],[16,10]],[[0,2],[0,18]],[1,2],[[5,3],[7,5]],[[12,4],[13,5]],[[1,11],[1,13]],[[2,13],[2,15]],[3,15],[[3,16],[6,16]],[[4,10],[4,12]],[[6,10],[6,12]],[[5,12],[5,14]],[[6,14],[6,16]],[7,13],[7,14],[8,14],[8,15],[9,15],[10,16],[[10,10],[10,12]],[[11,12],[11,16]],[[12,10],[12,13]],[13,13],[13,14],[14,14],[[14,15],[18,15]],[[17,10],[17,13]],[[18,13],[18,15]],[[0,18],[4,18]],[[4,19],[8,19]],[[8,18],[11,18]],[[11,19],[14,19]],[[14,18],[16,18]],[[16,16],[16,18]]]}}},function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):t("object"==typeof exports&&"string"!=typeof exports.nodeName?exports:e.TinyMusic={})}(this,function(e){function t(e){var o=e.split(r);this.frequency=t.getFrequency(o[0])||0,this.duration=t.getDuration(o[1])||0}function o(e,t,o){this.ac=e||new AudioContext,this.createFxNodes(),this.tempo=t||120,this.loop=!0,this.smoothing=0,this.staccato=0,this.notes=[],this.push.apply(this,o||[])}var n=440*Math.pow(Math.pow(2,1/12),-9),s=/^[0-9.]+$/,r=/\s+/,i=/(\d+)/,a={};"B#-C|C#-Db|D|D#-Eb|E-Fb|E#-F|F#-Gb|G|G#-Ab|A|A#-Bb|B-Cb".split("|").forEach(function(e,t){e.split("-").forEach(function(e){a[e]=t})}),t.getFrequency=function(e){var t=e.split(i),o=a[t[0]],s=(t[1]||4)-4;return n*Math.pow(Math.pow(2,1/12),o)*Math.pow(2,s)},t.getDuration=function(e){return s.test(e)?parseFloat(e):e.toLowerCase().split("").reduce(function(e,t){return e+("w"===t?4:"h"===t?2:"q"===t?1:"e"===t?.5:"s"===t?.25:0)},0)},o.prototype.createFxNodes=function(){var e=this.gain=this.ac.createGain();return[["bass",100],["mid",1e3],["treble",2500]].forEach(function(t,o){(o=this[t[0]]=this.ac.createBiquadFilter()).type="peaking",o.frequency.value=t[1],e.connect(e=o)}.bind(this)),e.connect(this.ac.destination),this},o.prototype.push=function(){return Array.prototype.forEach.call(arguments,function(e){this.notes.push(e instanceof t?e:new t(e))}.bind(this)),this},o.prototype.createCustomWave=function(e,t){t||(t=e),this.waveType="custom",this.customWave=[new Float32Array(e),new Float32Array(t)]},o.prototype.createOscillator=function(){return this.stop(),this.osc=this.ac.createOscillator(),this.customWave?this.osc.setPeriodicWave(this.ac.createPeriodicWave.apply(this.ac,this.customWave)):this.osc.type=this.waveType||"square",this.osc.connect(this.gain),this},o.prototype.scheduleNote=function(e,t){var o=60/this.tempo*this.notes[e].duration,n=o*(1-(this.staccato||0));return this.setFrequency(this.notes[e].frequency,t),this.smoothing&&this.notes[e].frequency&&this.slide(e,t,n),this.setFrequency(0,t+n),t+o},o.prototype.getNextNote=function(e){return this.notes[e<this.notes.length-1?e+1:0]},o.prototype.getSlideStartDelay=function(e){return e-Math.min(e,60/this.tempo*this.smoothing)},o.prototype.slide=function(e,t,o){var n=this.getNextNote(e),s=this.getSlideStartDelay(o);return this.setFrequency(this.notes[e].frequency,t+s),this.rampFrequency(n.frequency,t+o),this},o.prototype.setFrequency=function(e,t){return this.osc.frequency.setValueAtTime(e,t),this},o.prototype.rampFrequency=function(e,t){return this.osc.frequency.linearRampToValueAtTime(e,t),this},o.prototype.play=function(e){return e="number"==typeof e?e:this.ac.currentTime,this.createOscillator(),this.osc.start(e),this.notes.forEach(function(t,o){e=this.scheduleNote(o,e)}.bind(this)),this.osc.stop(e),this.osc.onended=this.loop?this.play.bind(this,e):null,this},o.prototype.stop=function(){return this.osc&&(this.osc.onended=null,this.osc.disconnect(),this.osc=null),this},e.Note=t,e.Sequence=o});
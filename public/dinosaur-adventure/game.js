/* Dinosaur Adventure: readable Canvas game engine.
   The EASY settings are in settings.js. Explore this file later to learn
   how functions, if statements, loops and objects make a game work! */
(() => {
  'use strict';
  const S = window.GAME_SETTINGS;
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, FLOOR = 438;
  const ui = {
    overlay:document.getElementById('overlay'), panel:document.getElementById('panel'),
    hearts:document.getElementById('hearts'),score:document.getElementById('score'),
    power:document.getElementById('powerDisplay'),dino:document.getElementById('dinoLabel')
  };
  const held = new Set();
  let mode='choose', dinosaur='triceratops', player, eggs=[], enemies=[], rocks=[], platforms=[], tunnels=[], boss=null;
  let camera=0, score=0, furthest=0, bossHasAppeared=false, gameTime=0, particles=[], message='', messageUntil=0;
  let lastTime=0;
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const touching=(a,b)=>a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y;
  const config=()=>S.dinosaurs[dinosaur];
  const rand=(n)=>Math.sin(n*127.13)*10000%1;

  function chooseScreen(){
    mode='choose'; ui.overlay.classList.remove('hidden');
    ui.panel.innerHTML=`<h2>🦖 Choose your dinosaur!</h2><p>Collect eggs, bounce on raptors and defeat the T. rex boss!</p>
      <div class="choices">
      <button class="choice" data-dino="triceratops"><span class="emoji">🦏</span><strong>Triceratops</strong><small>🐢 Slower · ❤️ 4 lives<br>⚡ Charge</small></button>
      <button class="choice" data-dino="brachiosaurus"><span class="emoji">🦕</span><strong>Brachiosaurus</strong><small>❤️ 3 lives · Very tall<br>⚡ Stomp</small></button>
      <button class="choice" data-dino="troodon"><span class="emoji">🦖</span><strong>Troodon</strong><small>💨 Fast · ❤️ 2 lives<br>⚡ Super jump</small></button>
      </div><p style="font-size:13px">← → to move · SPACE to jump · X for your special power</p>`;
    ui.panel.querySelectorAll('[data-dino]').forEach(btn=>btn.addEventListener('click',()=>start(btn.dataset.dino)));
  }
  function start(chosen){
    dinosaur=chosen; const c=config(); score=0; camera=0; furthest=0; boss=null; bossHasAppeared=false;
    gameTime=0; particles=[]; message='Find the golden eggs!'; messageUntil=2.8;
    const dims=chosen==='brachiosaurus'?{w:64,h:92}:chosen==='triceratops'?{w:64,h:53}:{w:46,h:53};
    player={x:75,y:FLOOR-dims.h,w:dims.w,h:dims.h,vx:0,vy:0,lives:c.lives,onGround:true, invincible:0,
      powerUntil:0, powerReadyAt:0, powerActive:false, facing:1, prevBottom:FLOOR, spawnX:75};
    eggs=[]; enemies=[]; rocks=[]; platforms=[]; tunnels=[];
    for(let x=260,i=0;x<S.world.levelLength-460;x+=Math.max(90,S.world.eggSpacing),i++){
      eggs.push({x,y:FLOOR-65-(i%3)*22,w:22,h:22,collected:false});
    }
    for(let x=470,i=0;x<S.world.levelLength-490;x+=Math.max(210,S.world.raptorSpacing),i++){
      enemies.push({x,y:FLOOR-42,w:50,h:42,vx:(i%2?1:-1)*S.raptor.speed,home:x,alive:true});
    }
    if(S.world.cactusObstacles) for(const x of [680,1200,1840,2350]) if(x<S.world.levelLength-360) rocks.push({x,y:FLOOR-S.world.cactusHeight,w:42,h:S.world.cactusHeight,alive:true});
    if(S.world.platforms) for(const x of [850,1500,2070]) if(x<S.world.levelLength-330) platforms.push({x,y:FLOOR-115,w:170,h:18});
    // A stepping stone before the boss: all dinosaurs can leap from it.
    if(S.world.bossApproachPlatform) platforms.push({x:S.boss.appearAt-175,y:FLOOR-78,w:125,h:18});
    if(S.world.narrowTunnels) for(const x of [1040,2150]) if(x<S.world.levelLength-410) tunnels.push({x,y:FLOOR-88,w:175,h:21});
    ui.dino.textContent=c.name;ui.overlay.classList.add('hidden');mode='play';updateHud();
  }
  function status(text,duration=2){message=text;messageUntil=gameTime+duration;}
  function puff(x,y,colour,count=9){for(let i=0;i<count;i++) particles.push({x,y,vx:(Math.random()-.5)*200,vy:-Math.random()*170,life:.5+Math.random()*.5,c:colour,r:3+Math.random()*4});}
  function hurt(){
    if(player.invincible>0||mode!=='play') return;
    player.lives--;player.invincible=1.6;player.vy=-310;puff(player.x+20,player.y+20,'#ff6666');
    status('Ouch! Watch out!');
    if(player.lives<=0){finish(false);return;}
    updateHud();
  }
  function finish(win){mode=win?'win':'lose';ui.overlay.classList.remove('hidden');
    ui.panel.innerHTML=`<h2>${win?'🏆 You saved Dino Valley!':'💛 Try again!'}</h2>
       <p>${win?'You defeated the T. rex boss!':'The dinosaurs need another hero!'}</p>
       <p><strong>🥚 Eggs collected: ${score}</strong></p>
       <button class="primary" id="again">${win?'Play again':'Try again'}</button>
       <p style="font-size:12px">Try changing a value in <code>settings.js</code> before playing again!</p>`;
    document.getElementById('again').addEventListener('click',chooseScreen);
  }
  function activatePower(){
    if(mode!=='play'||gameTime<player.powerReadyAt||player.powerActive) return;
    let c=config();player.powerReadyAt=gameTime+c.cooldownSeconds;
    player.powerUntil=gameTime+c.powerSeconds;player.powerActive=true;
    if(dinosaur==='troodon'){player.vy=-c.jump*1.55;player.onGround=false;status('SUPER JUMP!');}
    if(dinosaur==='triceratops'){player.vx=player.facing*640;status('CHARGE!');}
    if(dinosaur==='brachiosaurus'){
      // Stomp damages every nearby enemy, and breaks nearby cacti.
      status('DINO STOMP!');puff(player.x+player.w/2,FLOOR,'#ebbd6a',25);
      for(const e of enemies) if(e.alive&&Math.abs(e.x-player.x)<145){e.alive=false;puff(e.x,e.y,'#f5ab66');}
      for(const r of rocks) if(r.alive&&Math.abs(r.x-player.x)<135){r.alive=false;puff(r.x,r.y,'#b9a08c');}
      if(boss&&boss.health>0&&Math.abs(boss.x-player.x)<185) damageBoss();
    }
    updateHud();
  }
  function damageBoss(){if(!boss||boss.hitCooldown>0)return;boss.health--;boss.hitCooldown=.9;puff(boss.x+boss.w/2,boss.y+20,'#ffb555',22);status('T. rex took a hit!');if(boss.health<=0){boss.health=0;status('You defeated the T. rex!',3);setTimeout(()=>{if(mode==='play'&&boss&&boss.health===0)finish(true);},1000);}}
  function updateHud(){
    if(!player)return;
    ui.hearts.textContent='❤️'.repeat(Math.max(0,player.lives));ui.score.textContent=`🥚 ${score}`;
    let left=Math.max(0,player.powerReadyAt-gameTime);ui.power.textContent=left?`⚡ ${left.toFixed(1)}s`:'⚡ X: READY!';
    ui.power.style.color=left?'#bc792a':'#3f9857';
  }
  function update(dt){
    if(mode!=='play')return;
    gameTime+=dt;player.invincible=Math.max(0,player.invincible-dt);
    const c=config();const active=player.powerActive&&gameTime<player.powerUntil;
    if(!active)player.powerActive=false;
    let direction=Number(held.has('ArrowRight')||held.has('KeyD'))-Number(held.has('ArrowLeft')||held.has('KeyA'));
    if(direction)player.facing=direction;
    if(!(active&&dinosaur==='triceratops'))player.vx=direction*c.speed;
    else player.vx=player.facing*620;
    if((held.has('Space')||held.has('ArrowUp')||held.has('KeyW'))&&player.onGround){player.vy=-c.jump;player.onGround=false;}
    const beforeX=player.x;
    player.x=clamp(player.x+player.vx*dt,0,S.world.levelLength-player.w);
    // Tunnels: short dinos fit; tall Brachiosaurus bumps into the sides.
    for(const t of tunnels){
      const under={x:t.x,y:t.y+t.h,w:t.w,h:FLOOR-(t.y+t.h)};
      if(dinosaur==='brachiosaurus'&&touching(player,under)){
        player.x=beforeX;status('Brachiosaurus is too tall! Go over the tunnel.',1.4);
      }
    }
    player.prevBottom=player.y+player.h;
    player.vy+=S.world.gravity*dt;player.y+=player.vy*dt;player.onGround=false;
    if(player.y+player.h>=FLOOR){player.y=FLOOR-player.h;player.vy=0;player.onGround=true;}
    // Landing on top of a raised platform, or a tunnel roof.
    for(const ledge of [...platforms,...tunnels]){
      if(player.vy>=0&&player.prevBottom<=ledge.y+10&&player.y+player.h>=ledge.y&&player.x+player.w>ledge.x+7&&player.x<ledge.x+ledge.w-7){
        player.y=ledge.y-player.h;player.vy=0;player.onGround=true;
      }
    }
    // Collect eggs (a simple example of a for loop and an if statement).
    for(const egg of eggs){if(!egg.collected&&touching(player,egg)){egg.collected=true;score++;puff(egg.x,egg.y,'#ffd45d',10);}}
    for(const e of enemies){
      if(!e.alive)continue;
      e.x+=e.vx*dt;
      if(e.x<e.home-70||e.x>e.home+70)e.vx*=-1;
      if(touching(player,e)){
        const stomp=player.vy>85&&player.prevBottom<=e.y+14;
        const charge=active&&dinosaur==='triceratops';
        const stompPower=active&&dinosaur==='brachiosaurus';
        if(stomp||charge||stompPower){e.alive=false;player.vy=stomp?-320:player.vy;puff(e.x,e.y,'#efab56',12);}
        else hurt();
      }
    }
    for(const r of rocks){if(!r.alive)continue;if(touching(player,r)){
      if(active&&dinosaur==='triceratops'){r.alive=false;puff(r.x,r.y,'#ae917a',12);}
      else if(active&&dinosaur==='brachiosaurus'){r.alive=false;puff(r.x,r.y,'#ae917a',12);}
      else hurt();
    }}
    furthest=Math.max(furthest,player.x);
    if(!bossHasAppeared&&furthest>=S.boss.appearAt){
      bossHasAppeared=true;boss={x:Math.min(S.world.levelLength-135,player.x+340),y:FLOOR-S.boss.height,w:S.boss.width,h:S.boss.height,health:S.boss.health,vx:-S.boss.speed,hitCooldown:0};
      status('🦖 T. REX BOSS! Jump on its head or use your POWER!',4);
    }
    if(boss&&boss.health>0){
      boss.hitCooldown=Math.max(0,boss.hitCooldown-dt);
      // Chase the player, but stop before walking too far away.
      boss.vx=player.x<boss.x?-S.boss.speed:S.boss.speed;
      boss.x=clamp(boss.x+boss.vx*dt,S.boss.appearAt-110,S.world.levelLength-boss.w);
      if(touching(player,boss)){
        const headJump=player.vy>75&&player.prevBottom<=boss.y+22;
        const charge=active&&dinosaur==='triceratops';
        const stompPower=active&&dinosaur==='brachiosaurus';
        if((headJump||charge||stompPower)&&boss.hitCooldown<=0){damageBoss();player.vy=-420;}
        else if(boss.hitCooldown<=0)hurt();
      }
    }
    if(player.x>=S.world.levelLength-player.w-8&&boss&&boss.health<=0)finish(true);
    camera=clamp(player.x-W*.30,0,Math.max(0,S.world.levelLength-W));
    for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=360*dt;p.life-=dt;}
    particles=particles.filter(p=>p.life>0);
    updateHud();
  }
  function roundRect(x,y,w,h,r,fill){ctx.fillStyle=fill;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
  function ellipse(x,y,rx,ry,fill){ctx.fillStyle=fill;ctx.beginPath();ctx.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,Math.PI*2);ctx.fill();}
  function triangle(a,b,c,fill){ctx.fillStyle=fill;ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.lineTo(...c);ctx.closePath();ctx.fill();}
  function dinoShape(x,y,w,h,type,col,facing=1){
    ctx.save();ctx.translate(x+(facing<0?w:0),y);ctx.scale(facing,1);
    // Artwork is anchored by its FOOT line to the bottom of the hitbox.
    // Brachiosaurus uses a 106-unit-tall drawing (-41 to 65); others use 65.
    // Keeping feet at exactly 'h' prevents the long-necked dinosaur floating.
    const top=type==='brachiosaurus'?-41:0;
    const foot=65;
    ctx.scale(w/72,h/(foot-top));
    ctx.translate(0,-top);
    // Tail, legs, body, neck, head (all made from editable vector shapes).
    triangle([22,30],[-16,19],[16,52],col);
    roundRect(16,42,11,23,4,col);roundRect(43,42,11,23,4,col);
    ellipse(35,32,30,22,col);
    if(type==='brachiosaurus'){
      roundRect(47,-39,15,79,7,col);ellipse(58,-37,18,12,col);
      ellipse(67,-41,3,3,'#233e3b');ellipse(70,-30,2,2,'#2e5e57');
    }else if(type==='triceratops'){
      ellipse(58,23,18,15,col);triangle([48,17],[40,-4],[58,16],'#f7e4b1');
      triangle([64,12],[68,-8],[72,14],'#f7e4b1');triangle([72,25],[86,27],[70,30],'#f7e4b1');
      ellipse(64,21,3,3,'#243b37');
    }else{
      roundRect(48,7,12,22,6,col);ellipse(61,13,17,12,col);
      triangle([54,12],[50,-2],[64,5],'#f4d0fb');ellipse(66,10,3,3,'#253e3e');
      triangle([31,48],[38,58],[47,49],'#e5bbfa');
    }
    ctx.restore();
  }
  function drawBackground(){
    ctx.fillStyle=S.world.sky;ctx.fillRect(0,0,W,H);ellipse(W-115,83,44,44,S.world.sunshine);
    for(let i=0;i<12;i++){let x=(i*190-camera*.13)%(W+240);if(x< -130)x+=W+240;
      ellipse(x,108+(i%3)*34,39,15,'#ffffffcc');ellipse(x+27,100+(i%3)*34,30,17,'#ffffffcc');
    }
    ctx.fillStyle=S.world.hill;
    ctx.beginPath();ctx.moveTo(0,FLOOR);for(let x=0;x<=W+10;x+=10){let wx=x+camera*.17;ctx.lineTo(x,FLOOR-76-Math.sin(wx/115)*37-Math.sin(wx/210)*18);}ctx.lineTo(W,FLOOR);ctx.fill();
  }
  function drawWorld(){
    ctx.save();ctx.translate(-camera,0);
    ctx.fillStyle=S.world.earth;ctx.fillRect(0,FLOOR,S.world.levelLength,H-FLOOR);
    ctx.fillStyle=S.world.grass;ctx.fillRect(0,FLOOR,S.world.levelLength,18);
    for(let x=0;x<S.world.levelLength;x+=75){ellipse(x,FLOOR+37,12,5,'#95643c');ellipse(x+32,FLOOR+77,7,4,'#dba173');}
    for(let x=120;x<S.world.levelLength;x+=360){
      // Trees and bushes that scroll with the world.
      roundRect(x,FLOOR-97,15,97,5,'#966c42');ellipse(x+8,FLOOR-99,36,42,'#58b179');
      ellipse(x-12,FLOOR-114,27,28,'#71c88d');ellipse(x+24,FLOOR-117,30,30,'#63b982');
    }
    for(const p of platforms){roundRect(p.x,p.y,p.w,p.h,6,'#ad7b4e');roundRect(p.x,p.y,p.w,7,4,S.world.grass);}
    for(const t of tunnels){
      roundRect(t.x,t.y,t.w,t.h,5,'#6a665f');roundRect(t.x,t.y,t.w,7,4,'#a4a29c');
      roundRect(t.x+12,t.y+t.h,9,FLOOR-(t.y+t.h),2,'#b2a99e');
      roundRect(t.x+t.w-21,t.y+t.h,9,FLOOR-(t.y+t.h),2,'#b2a99e');
    }
    for(const egg of eggs){if(egg.collected)continue;ellipse(egg.x+11,egg.y+11,10,13,'#ffd76a');
      ellipse(egg.x+8,egg.y+5,3,5,'#fff3bf');}
    for(const r of rocks){if(!r.alive)continue;
      // A friendly-looking but very spiky cactus, with its base on the floor.
      roundRect(r.x+15,r.y+5,13,r.h-5,5,'#298958');
      roundRect(r.x+5,r.y+20,10,9,4,'#298958');
      roundRect(r.x+5,r.y+16,6,17,3,'#298958');
      roundRect(r.x+28,r.y+12,10,9,4,'#298958');
      roundRect(r.x+33,r.y+9,6,15,3,'#298958');
      for(let i=0;i<3;i++){
        let yy=r.y+10+i*11;
        triangle([r.x+15,yy],[r.x+8,yy-5],[r.x+15,yy+4],'#d8eeb0');
        triangle([r.x+28,yy+2],[r.x+35,yy-3],[r.x+28,yy+7],'#d8eeb0');
      }
      triangle([r.x+15,r.y+8],[r.x+21,r.y],[r.x+28,r.y+8],'#d8eeb0');
    }
    for(const e of enemies){if(!e.alive)continue;dinoShape(e.x,e.y,e.w,e.h,'troodon',S.raptor.colour,e.vx<0?-1:1);}
    if(boss&&boss.health>0){
      dinoShape(boss.x,boss.y,boss.w,boss.h,'troodon',S.boss.colour,boss.vx<0?-1:1);
      roundRect(boss.x+7,boss.y-25,boss.w-14,11,5,'#512e2e');
      roundRect(boss.x+9,boss.y-23,(boss.w-18)*boss.health/Math.max(1,S.boss.health),7,3,'#ff6767');
      ctx.font='bold 15px system-ui';ctx.fillStyle='#5b3131';ctx.textAlign='center';ctx.fillText('T. REX',boss.x+boss.w/2,boss.y-33);
    }
    if(player){
      if(player.invincible<=0||Math.floor(gameTime*12)%2===0)
        dinoShape(player.x,player.y,player.w,player.h,dinosaur,config().colour,player.facing);
      if(player.powerActive&&gameTime<player.powerUntil){
        ctx.strokeStyle=dinosaur==='triceratops'?'#ffdd67':'#d3b0ff';ctx.lineWidth=5;
        ctx.beginPath();ctx.ellipse(player.x+player.w/2,player.y+player.h/2,player.w*.72,player.h*.66,0,0,Math.PI*2);ctx.stroke();
      }
    }
    for(const p of particles){ctx.globalAlpha=clamp(p.life,0,1);ellipse(p.x,p.y,p.r,p.r,p.c);ctx.globalAlpha=1;}
    ctx.restore();
    roundRect(14,14,224,14,7,'#ffffffcc');roundRect(16,16,220*clamp(furthest/S.world.levelLength,0,1),10,5,'#43aa70');
    ctx.font='bold 15px system-ui';ctx.fillStyle='#174e3e';ctx.textAlign='left';ctx.fillText('LEVEL 1 · Dino Valley',14,50);
    if(mode==='play'&&messageUntil>gameTime){
      ctx.textAlign='center';ctx.font='bold 22px system-ui';
      roundRect(W/2-250,58,500,42,14,'#fffbe8e0');ctx.fillStyle='#32534b';ctx.fillText(message,W/2,86);
    }
  }
  function draw(){drawBackground();drawWorld();}
  function frame(t){let dt=Math.min((t-lastTime)/1000||0,.035);lastTime=t;update(dt);draw();requestAnimationFrame(frame);}
  function keyDown(e){if(['ArrowLeft','ArrowRight','ArrowUp','Space','KeyX','KeyP','KeyR','KeyA','KeyD','KeyW'].includes(e.code))e.preventDefault();
    if(e.code==='KeyP'){if(mode==='play'){mode='paused';ui.overlay.classList.remove('hidden');ui.panel.innerHTML='<h2>⏸ Paused</h2><p>Press P to continue.</p><button id="continue" class="primary">Keep playing</button>';document.getElementById('continue').onclick=resume;}else if(mode==='paused')resume();return;}
    if(e.code==='KeyR'){if(mode!=='choose')start(dinosaur);return;}
    if(e.code==='KeyX'&&!e.repeat)activatePower();held.add(e.code);
  }
  function resume(){mode='play';ui.overlay.classList.add('hidden');}
  window.addEventListener('keydown',keyDown);
  window.addEventListener('keyup',e=>held.delete(e.code));
  window.addEventListener('blur',()=>held.clear());
  document.querySelectorAll('[data-key]').forEach(btn=>{
    const key=btn.dataset.key;
    btn.addEventListener('pointerdown',e=>{e.preventDefault();held.add(key);if(key==='KeyX')activatePower();btn.setPointerCapture(e.pointerId);});
    for(const event of ['pointerup','pointercancel','lostpointercapture'])btn.addEventListener(event,()=>held.delete(key));
  });
  document.getElementById('editHelp').addEventListener('click',()=>{
    const wasPlaying=mode==='play';if(wasPlaying)mode='paused';
    ui.overlay.classList.remove('hidden');ui.panel.innerHTML=`<h2>✏️ Become a game designer!</h2><p>Open the file <code>settings.js</code> in VS Code or a text editor. Look for the section called <b>YOUR GAME DESIGNER CONTROL ROOM</b>.</p><p>Try changing <code>sky</code>, <code>speed</code>, <code>lives</code>, <code>eggSpacing</code> or <code>boss.health</code>. Save your changes and refresh the browser.</p><p><b>First challenge:</b> Can you make the sky pink and the Troodon faster?</p><button id="closeHelp" class="primary">${wasPlaying?'Continue game':'Got it!'}</button>`;
    document.getElementById('closeHelp').onclick=()=>{if(wasPlaying)resume();else chooseScreen();};
  });
  chooseScreen();requestAnimationFrame(frame);
})();

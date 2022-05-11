import { world } from "mojang-minecraft";
let id = 0;
let raycast = {};
const even = (element) => typeof element !== "number";
let over = world.getDimension("overworld");
world.events.tick.subscribe(({ currentTick }) => {
    if (currentTick % 20 == 0) {
        let p = [...world.getPlayers()];
    let vec = p[0].viewVector;
    let loc = p[0].location;
    new Ray(9,loc.x,loc.y + 1.62,loc.z,vec.x,vec.y,vec.z);
    }
    for (let prop in raycast) {
       try {over.runCommand(`tp @e[type=map:helper] ${raycast[prop].x} ${raycast[prop].y} ${raycast[prop].z} true`);
           over.runCommand(`particle minecraft:basic_flame_particle ${raycast[prop].x} ${raycast[prop].y} ${raycast[prop].z}`);} catch {delete raycast[prop];
               continue;
           }
        raycast[prop].x += raycast[prop].tpx;
        raycast[prop].y += raycast[prop].tpy;
        raycast[prop].z += raycast[prop].tpz;
        raycast[prop].n -= 1;
        if (raycast[prop].n < 1)
        delete raycast[prop];
    }
    try {over.runCommand(`tp @e[type=map:helper] 0 50 0`)} catch {}
})

function Ray(timer, x, y, z, tpx, tpy, tpz, n = 1) {
  let arr = [timer,x,y,z,tpx,tpy,tpz,n];
  if (arr.some(even))
  throw "Ошибка: неверные переменные";
  raycast[id] = {}
  raycast[id].n = timer;
  raycast[id].x = x;
  raycast[id].y = y;
  raycast[id].z = z;
  raycast[id].tpx = tpx * n;
  raycast[id].tpy = tpy * n;
  raycast[id].tpz = tpz * n;
  id++;
  }

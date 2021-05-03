//请事先添加含有plane标签的飞机模型和含有gun标签的防空炮台
const pspeed=2;
const MeshScale = [0.0625,0.0625,0.0625]
world.querySelectorAll(".plane").forEach((e)=>{
    e.velocity.x=pspeed;
    e.mass=199;
    e.enableDamage=true;
    e.onDie(({entity})=>{
        entity.gravity=true;
        entity.fixed=false;
        var c=entity;
        c.particleLimit = 1000;
                    c.particleRate = 500;
                    c.particleColor = [new Box3RGBColor(1, 1, 0), new Box3RGBColor(1, 0, 0)]
                    c.particleSize = [5, 4]
                    c.particleAcceleration.set(0, -5, 0)
                    c.particleVelocitySpread.set(5, 1, 5);
                    c.particleLifetime = 2;
                    c.meshColor.set(0.5,0.5,0.5,0.5)
                
    })
    e.onVoxelContact(async({entity})=>{
        var c=entity;
        c.particleLimit = 1000;
                    c.particleRate = 500;
                    c.particleColor = [new Box3RGBColor(1, 1, 0), new Box3RGBColor(1, 0, 0)]
                    c.particleSize = [5, 4]
                    c.particleAcceleration.set(0, -5, 0)
                    c.particleVelocitySpread.set(5, 5, 5);
                    c.particleLifetime = 2;
                    await sleep(100);
                    c.destroy()
    })
})

function spawnPlane(x,y,z){
    // var ps=world.querySelector(".plane-sample");
    var ps=world.querySelector(".plane-sample");
                    var c = world.createEntity();
                    c.ctrl = false;
                    c.position.set(x,y,z);
                    c.mesh = ps.mesh;
                    c.meshScale = ps.meshScale;
                    c.gravity = false; c.fixed = false;
                    c.collides = true;
                    c.addTag("plane");
                    setTimeout(()=>{c.destroy()},10000)
                    c.velocity.x=pspeed;
                    c.velocity.z=1;
    c.mass=199;
    c.enableDamage=true;
    c.onDie(({entity})=>{
        var c2=entity;
        c2.gravity=true;
        c2.fixed=false;
        c2.particleLimit = 1000;
                    c2.particleRate = 100;
                    c2.particleColor = [new Box3RGBColor(0.5, 0.5, 0.5), new Box3RGBColor(0.2, 0.2, 0.2)]
                    c2.particleSize = [10, 10]
                    c2.particleAcceleration.set(0, -5, 0)
                    c2.particleVelocitySpread.set(5, 1, 5);
                    c2.particleLifetime = 2;
                    c2.meshColor.set(0.2,0.2,0.2,0.5)
                
    })
    c.onVoxelContact(async({entity})=>{
        var c2=entity;
        c2.particleLimit = 1000;
                    c2.particleRate = 500;
                    c2.particleColor = [new Box3RGBColor(1, 1, 0), new Box3RGBColor(1, 0, 0)]
                    c2.particleSize = [10, 10]
                    c2.particleAcceleration.set(0, -5, 0)
                    c2.particleVelocitySpread.set(5, 5, 5);
                    c2.particleLifetime = 2;
                    await sleep(100);
                    c2.destroy()
    })
}
setInterval(()=>{
    console.log("敌方飞机来袭！")
    //Math.random()*30,60+Math.random()*10,150+Math.random()*100
    for(let i=-1;i<=1;i++){
        for(let j=-1;j<=1;j++){
            spawnPlane(i*20,Math.random()*10+100,100+j*20+i*20);
        }
    }
},8000)
console.clear()
// const Quat = new Box3Quaternion(0,1,0,1)// box引擎默认的旋转朝向
const Quat = new Box3Quaternion(0,0,0,1)// box引擎默认的旋转朝向
let allPlayers = []//所有玩家
let allZombies = []//所有僵尸
world.onTick(async ({tick}) => {//每秒16个tick
    if(tick%16===0){//每16个tick运行一次, 而不是每个tick都运行,节省性能
        allPlayers = world.querySelectorAll('.plane')
        allZombies = world.querySelectorAll('.gun')
    }
    allZombies.forEach(async (e) => {
        let zomPos = e.position
        if(tick%5===0){//每11个tick运行一次, 而不是每个tick都运行,节省性能
            let target = allPlayers.sort((a,b)=>{//僵尸寻找距离最近的玩家
                return a.position.distance(zomPos)-b.position.distance(zomPos)
            })[0]
            if(target){//地图如果还有玩家
                e.target = target//让僵尸记住要追杀的玩家
            }
        }
        if(e.target && !e.target.destroyed&&tick%2==0){//如果要追杀的玩家还没有离开地图
            var direction = new Box3Vector3(e.target.position.x+18+Math.random()*10,e.target.position.y,e.target.position.z+9+Math.random()*10).sub(zomPos); //僵尸往玩家的方向矢量
            var speed = 0.2+Math.random()*0.3 //速度0.2~0.5随机
            // 让僵尸面向自己的前进方向
            var orientation = Quat.rotateY(Math.atan2(direction.z, direction.x))
            e.meshOrientation.copy(orientation)

            var cap=world.querySelector(".cannon")
                    var c = world.createEntity();
                    c.ctrl = false;
                    c.position.copy(e.position);
                    c.mesh = cap.mesh;
                    c.meshScale = cap.meshScale;
                    c.gravity = false; c.fixed = false;
                    c.collides = false;
                    c.owner = e.owner;
                    c.addTag("clcr");

                    c.mass = 1;
                    c.meshEmissive=true;

                    c.particleLimit = 1000;
                    c.particleRate = 500;
                    c.particleColor = [new Box3RGBColor(1, 1, 0), new Box3RGBColor(1, 0, 0)]
                    c.particleSize = [5, 4]
                    c.particleAcceleration.set(0, -5, 0)
                    c.particleVelocitySpread.set(5, 1, 5);
                    c.particleLifetime = 2;
                    c.ctrl = true;
                    c.velocity.set(direction.x / 10, direction.y / 10, direction.z / 10);
                    // c.gravity=true;
                    setTimeout(() => { c.collides = true; c.particleLimit = 0 }, 100);
                    setTimeout(() => { c.destroy() }, 5 * 1000)
        }
    })
})
world.onPlayerJoin(({entity})=>{
    entity.enableDamage = true;
    entity.onDie(async()=>{
        world.say(`${entity.player.name} 被袭击身亡, 3秒后复活`)
        await sleep(3000)
        // 空中随机位置复活
        entity.position.x = Math.random()*127
        entity.position.z = Math.random()*127
        entity.position.y = 100
        await sleep(100) // 防止引擎延迟造成复活后受到死前的伤害
        entity.hp = entity.maxHp //恢复满血
    })
})
world.onClick(({entity})=>{
    entity.hurt(50) //被点中的实体会掉血
})
world.onEntityContact(({entity,other})=>{
    if(entity.hasTag("clcr")&&other.hasTag("plane")){
        entity.destroy();
        other.hurt(50);
    }
})
// const Quat = new Box3Quaternion(0,0,0,1)// box引擎默认的旋转朝向
// const Quat = new Box3Quaternion(0,0,0,1)// box引擎默认的旋转朝向
setInterval(()=>{
    world.querySelectorAll(".plane").forEach((e)=>{
        e.meshOrientation=Quat.rotateX(Math.atan2(e.velocity.y,e.velocity.x)).add(Quat.rotateY(e.velocity.z,e.velocity.x))
    })
},100)

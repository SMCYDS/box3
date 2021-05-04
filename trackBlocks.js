//跟踪地图里的所有方块数量
(async function(){
var total=0;
    for(let i=0;i<=126;i++){
        for(let j=0;j<=126;j++){
            for(let k=0;k<=126;k++){
                if(voxels.getVoxel(i,k,j)!=0){
	total++;
                }
                
            }
        }
    }

world.say("============");
var types=0;
if(total!=lastTotal){
	status="有变化，多了"+(total-lastTotal)+"个方块"
}else{status="无变化"}
world.say("方块数据总结\n方块数据"+status+"\n方块总数："+total+"\n人造方块总数："+(total-16129-16129-112903));
var lastTotal=total;

})()

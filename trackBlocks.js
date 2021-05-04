//跟踪地图里的所有方块数量
(async function(){
    var blocks=[];
    
    for(let i=0;i<=126;i++){
        for(let j=0;j<=126;j++){
            for(let k=0;k<=126;k++){
                if(voxels.getVoxel(i,k,j)!=0){
                    if(blocks[voxels.getVoxel(i,k,j)]==undefined){blocks[voxels.getVoxel(i,k,j)]=1;}
                    else{
                    blocks[voxels.getVoxel(i,k,j)]+=1;
                    }
                }
                
            }
        }
    }
    for(let i=1;i<blocks.length;i++){
        if(blocks[i]!=undefined&&blocks[i]!=0){
            world.say(voxels.name(i)+" 总共有"+blocks[i]+"个")
        }
        
    }
})()

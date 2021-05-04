//这一段是自动铺天花板，在天花板的高度（要确保四周被围起来了）放一个board_10方块，然后运行
(async function(){
        var rate=5;
        for(let y=0;y<=60;y++){
        for(let a=0;a<rate;a++){
        for(let i=0;i<127;i++){
            for(let j=0;j<127;j++){
                if(voxels.getVoxel(i,y,j)==voxels.id("board10")){
                    if(voxels.getVoxel(i,y,j+1)==0){
                        voxels.setVoxel(i,y,j+1,"board10");
                    }if(voxels.getVoxel(i,y,j-1)==0){
                        voxels.setVoxel(i,y,j-1,"board10");
                    }if(voxels.getVoxel(i+1,y,j)==0){
                        voxels.setVoxel(i+1,y,j,"board10");
                    }if(voxels.getVoxel(i-1,y,j)==0){
                        voxels.setVoxel(i-1,y,j,"board10");
                    }
                }
            }
        }}
        await sleep(10);
        }

})();



(async function(){
        for(let y=0;y<=120;y++){
            for(let i=0;i<127;i++){
                for(let j=0;j<127;j++){
                    if(voxels.getVoxel(i,y,j)==voxels.id("board10")){voxels.setVoxel(i,y,j,"lab_material_11")}
                }
            }
            await sleep(10);
        }

})();

var time=new Date().toString().split(" ")[4].split(":");
time[0]=(time[0]*1+8)%24;/*加8因为北京是东八区 */
var timetotal=time[0]*60+time[1]*1;
world.sunPhase=(0.75+timetotal/360*0.25)%1;
console.log(world.sunPhase)

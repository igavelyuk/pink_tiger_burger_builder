$(function () {
  $('[data-toggle="popover"]').popover()
})
//
// const resPath = "/json/productdb.json";
// function getData(callback) {
//   $.get(resPath,function(response) {
//     callback(response);
//   });
// }
//
// function createPromoEl(data){
//   console.log(data);
//   var injection = "";
//   for (var i=0; i<=3; i++){
//     if(i<=0){
//       injection = '<div class="col-md-4 col-sm-1">';
//       injection+='<h3 class="redtext">'+data[i].ukname+'&nbsp<span class="badge badge-secondary">Новинка</span></h3>';
//       injection+='<div class="progress">';
//       injection+='<div class="progress-bar red" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">90%</div>';
//     }else{
//       injection +='<div class="col-md-2 col-sm-1">';
//       injection +='<h3 class="redtext">'+data[i].ukname+'</h3>';
//       injection +='<div class="progress">';
//       injection +='<div class="progress-bar" role="progressbar" style="width: 85%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="85">85%</div>';
//     }
//     // injection = '<div class="col-4">';
//     // injection+='<h3 class="redtext">'+data[0].name+'<span class="badge badge-secondary">Новинка</span></h3>';
//     // injection+='<div class="progress">';
//     // injection+='<div class="progress-bar red" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">90%</div>';
//     injection+='</div>';
//     injection+='<hr>';
//     injection+='<div class="text">';
//     injection+= data[i].recipe;
//     injection+='</div>';
//     injection+='</div>';
//
//   }
//   document.getElementById("hotpromo").innerHTML = injection;
// }
//
// getData(function(a){
//   createPromoEl(a);
//   //console.log(a);
// });

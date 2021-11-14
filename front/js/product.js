
var str = window.location.href;
console.log ('>>>>> ' + str);
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(' >>>>> '+ id);
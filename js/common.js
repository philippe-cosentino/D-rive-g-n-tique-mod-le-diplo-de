const PI=Math.PI;
const PI_2=PI/2;
const PI3_2=PI+PI_2;
const TAU=PI*2;

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function txtInClass (className,txt) {
	var d=document.getElementsByClassName(className);
	for (var i=0;i<d.length;i++) {
		var txt2=txt;
		if (hasClass(d[i],"_maj")) {txt2=capitalizeFirstLetter(txt2);}
		d[i].innerHTML=txt2;
	}
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function filtrePointInput (sender) {
	var v=sender.value+"";
	sender.value=v.replace(",",".");
}

function filtreMoinsInput (sender) {
	var v=sender.value+"";
	sender.value=v.replace("-","");
}

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}



function sigFigs(n, sig) {
	if ((Math.abs(n))<0.0001) {
		return 0;
	}
	if (n==0) {return 0;}
	var neg=(n<0);
	var n=Math.abs(n);
  var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
  var t="";
  if (neg) {t="-";}
  t+=Math.round(n * mult) / mult;
  return t;
}


function to2digits (n) {
	var t="";
	if (n<10) {t="0";}
	return t+""+n;
}
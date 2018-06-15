var canv,ct;
var canvAnim,ctAnim;
var canvGraph,ctGraph;
var butOK;
var hCanv,lCanv,lBox,hCanvG,lCanvG;


function initCanv () {
	canv=document.getElementById ("canv");	
	ct = canv.getContext('2d');
	canvAnim=document.getElementById ("canvAnim");	
	ctAnim = canvAnim.getContext('2d');
	canvGraph=document.getElementById ("canvGraph");	
	ctGraph = canvGraph.getContext('2d');
	divParam=document.getElementById ("divParam");	
	divModele=document.getElementById ("divModele");	
	divNoSex=document.getElementById ("divNoSex");	
	butOK=document.getElementById ("divButOK");	
}

function redim () {
	var dpsd=divParam.style.display;
	var dmsd=divModele.style.display;
	divModele.style.display="block"; //on a besoin de divParam pour la taille des polices
	divParam.style.display="block";
	
	hCanv=canv.clientHeight;
	lCanv=canv.clientWidth;
	lBox=hCanv*0.4;

	var r=divModele.getBoundingClientRect();
	var hFont=Math.round(r.height*3)/100;
	divModele.style.fontSize=hFont+"px";

	var r=divParam.getBoundingClientRect();
	var hFont=Math.floor(r.height*2.7)/100;
	divParam.style.fontSize=hFont+"px";	
	
	var r=document.getElementById("divTitre").getBoundingClientRect();
	var hFont=Math.floor(r.height*5)/10;
	document.getElementById("divTitre").style.fontSize=hFont+"px";	
	
	var r=document.getElementById("divAuteur").getBoundingClientRect();
	var hFont=Math.floor(r.height*25)/10;
	document.getElementById("divAuteur").style.fontSize=hFont+"px";		
	
	canv.width  = lCanv;
	canv.height = hCanv;
	
	canvAnim.width  = lCanv;
	canvAnim.height = hCanv;
	
	hCanvG=canvGraph.clientHeight;
	lCanvG=canvGraph.clientWidth;
	
	canvGraph.width  = lCanvG;
	canvGraph.height = hCanvG;
	
	diam=lBox/cote;
	
	if (modeleReady) {drawBoxes();drawGraph ()}
	divModele.style.display=dmsd;
	divParam.style.display=dpsd;
}
var divParam,divModele;
var nbAll=3;
var eff=9;
var tCoul=["#FFF","#96c","#c22","#aa0","#0aa","#a0a"];
var tNoms=["","","","","",""];
var tPar=[];
var tEnf=[];
var tDisp=[];
var cote=1;
var diam=1;
var nCibleEnf=0;
var numGen=0;
var garSex=true;
var probaMut=0;
var cpt10=0;

function go () {
	document.body.style.display="block";
	var p=(probaMut+"").replace(".", ",");
	document.getElementById("inputMut").value=p;
	document.getElementById("inputEff").value=eff*1;
	document.getElementById("inputNbAll").value=nbAll*1;
	document.getElementById("checkSex").checked=garSex;
	recalcTabSaisieAll();
	initCanv();
	redim();
	divModele.style.display="none";
	butOK.style.opacity=1;
	anim();
	//setTimeout (clickOKParam,100);
}

function reconf() {
	modeleReady=false;
	tAnim=[];
	divModele.style.display="none";
	divParam.style.display="block";
	animate=false;
}


function clickOKParam () {
	if ((butOK.style.opacity*1)<1) {return false;}
	eff=document.getElementById("inputEff").value*1;
	nbAll=document.getElementById("inputNbAll").value*1;
	garSex=document.getElementById("checkSex").checked;
	var p=document.getElementById("inputMut").value.replace(",", ".");
	probaMut=p*1;
	
	//récup non allèles
	for (var i=1;i<=nbAll;i++) {
		tNoms[i]=document.getElementById("inputAll"+i).value;
	}
	
	//récup couleurs
	for (var i=1;i<=nbAll;i++) {
		tCoul[i]="#"+document.getElementById("inputCoul"+i).value;
	}
	
	cote=Math.ceil(Math.sqrt(eff));
	
	reinit ();
	
	divParam.style.display="none";
	divModele.style.display="block";
	
	modeleReady=true;
	redim();
	
	fillSpanLeg ();
	
	animate=true;
}

function fillSpanLeg () {
	var t="";
	for (var i=0;i<nbAll;i++) {
		t+="<span style='background-color:"+tCoul[i+1]+"'>";
		t+="&nbsp;"+tNoms[i+1]+"&nbsp;";
		t+="</span>";
		if (i<(nbAll-1)) {t+=", "}
	}
	document.getElementById("spanLegAll").innerHTML=t;
}

function initTabFreq () {
	document.getElementById("labelNumGen").innerHTML=numGen;
	
	for (var i=1;i<=5;i++) {
		document.getElementById("rowAll"+i).style.display="none";
	}
	for (var i=1;i<=nbAll;i++) {
		document.getElementById("labelNomAll"+i).innerHTML=tNoms[i];
		document.getElementById("rowAll"+i).style.display="table-row";
		var occ=compteAll(i);
		var freq=Math.round(occ/eff*500)/10;
		document.getElementById("occAll"+i).innerHTML=occ;
		document.getElementById("freqAll"+i).innerHTML=freq+"%";
		if (tDisp[i]>=0) {
			document.getElementById("dispAll"+i).innerHTML=tDisp[i];
		} else {
			document.getElementById("dispAll"+i).innerHTML="---";
		}
	}
}

function compteAll (a) {
	a=""+a;
	var newArr1 = tPar.filter(function(item){
		return (item[1] === a);
	});
	var newArr2 = tPar.filter(function(item){
		return (item[2] === a);
	});
	return newArr1.length+newArr2.length;
}

function reinit() {
	initPar ();
	addToGraph();
	initTabFreq ();
	effaceCanvAnim();
	drawBoxes();
	drawGraph();
}

function initPar () {
	// on réinitialise les variables
	tEnf=[];
	tPar=[];
	tAnim=[];
	for (var i=0;i<=nbAll;i++) {tGraph[i]=[];}
	progrAnim=0;
	boiteEnfPleine=false;
	numGen=0;
	nCibleEnf=0;
	cpt10=0;
	document.getElementById("divcpt10").innerHTML="10&times;";
	
	divNoSex.style.display="none";
	
	// tableau des disparitions
	for (var i=1;i<=nbAll;i++) {
		tDisp[i]=-1;
	}
	
	// on cree une liste (panier) que l'on remplit d'allèles
	var panierAll=[];
	var numAll=1;
	var ii=0;
	var n2=eff/nbAll*2;
	
	for (var i=0;i<(eff*2);i++) {
		ii++;
		panierAll.push(numAll);
		if (ii>=n2) {
			ii-=n2;
			numAll++;
		}	
	}

	// on pioche au hasard dans le panier en retirant à chaque fois
	for (var i=0;i<eff;i++) {
		var t="F";
		if (Math.random()>0.5) {t="M";}
		
		var n=Math.floor(Math.random()*panierAll.length);
		var a1=panierAll[n];
		panierAll.splice(n,1);
		
		var n=Math.floor(Math.random()*panierAll.length);
		var a2=panierAll[n];
		panierAll.splice(n,1);
		
		t+=a1+""+a2;
		tPar[i]=t;
	}
	
	//  on vérifie qu'il y ait au moins un mâle ou une femelle
	checkParite(tPar);
}

function checkParite (t) {
	if (!garSex) {return false;}
	if (nbMales(t)==0) {
		var n=Math.floor(Math.random()*t.length);
		t[n]="M"+t[n].slice(1);
	} else
	if (nbMales(t)==eff) {
		var n=Math.floor(Math.random()*t.length);
		t[n]="F"+t[n].slice(1);
	}	
}

function nbMales (t) {
	var n=0;
	for (var i=0;i<t.length;i++) {
		if (t[i][0]=="M") {n++;}
	}
	return n;
}

function repro () {
	var pm=probaMut/100;
	var r=diam/2;
	var newAnim={};
	var tM=[];
	var tF=[];
	for (var i=0;i<eff;i++) {
		if (tPar[i][0]=="M") {
			tM.push(i);
		} else {
			tF.push(i);
		}
	}
	var a=tM[Math.floor(Math.random()*tM.length)];
	var b=tF[Math.floor(Math.random()*tF.length)];
	
	newAnim.na=a;
	newAnim.nb=b;
	newAnim.spriteAll1={};
	newAnim.spriteAll2={};
	
	var rep=n2xy (a,false);
	var x=rep.x;
	var y=rep.y;
	var na=Math.floor(Math.random()*2)+1;
	if (na==1) {x-=r/2;} else {x+=r/2;}
	
	newAnim.spriteAll1.x0=x;
	newAnim.spriteAll1.y0=y;
	newAnim.spriteAll1.al=tPar[a][na];
	
	if (Math.random()<pm) {//mutation
		newAnim.spriteAll1.al=Math.ceil(Math.random()*nbAll)+"";
	}
	
	var rep=n2xy (b,false);
	var x=rep.x;
	var y=rep.y;
	var na=Math.floor(Math.random()*2)+1;
	if (na==1) {x-=r/2;} else {x+=r/2;}
	
	newAnim.spriteAll2.x0=x;
	newAnim.spriteAll2.y0=y;	
	newAnim.spriteAll2.al=tPar[b][na];
	
	if (Math.random()<pm) {//mutation
		newAnim.spriteAll2.al=Math.ceil(Math.random()*nbAll)+"";
	}
	
	newAnim.phaseAnim=1;
	newAnim.progrAnim=0;
	newAnim.cibleEnf=nCibleEnf;
	nCibleEnf++;
	tAnim.push (newAnim);	
}

function reproAlea () {
	mustDrawEnf=true;
	if ((nbMales(tPar)==0)||(nbMales(tPar)==tPar.length)) {
		divNoSex.style.display="block";
		return false;
	}
	
	if (!modeleReady) {return false;}
	if (tEnf.length>=eff) {return false;}
	if (nCibleEnf>=eff) {return false;}
	repro();
}

function reproAll () {
	mustDrawEnf=!fastForward;
	if ((nbMales(tPar)==0)||(nbMales(tPar)==tPar.length)) {
		divNoSex.style.display="block";
		return false;
	}

	if (!modeleReady) {return false;}
	if (tEnf.length>=eff) {return false;}
	if (nCibleEnf>=eff) {return false;}
	while ((nCibleEnf<eff)&&(tEnf.length<eff)) {
		repro();
	}
}

function repro10 () {
	mustDrawEnf=!fastForward;
	cpt10=10;
}

function reproFast () {
	fastForward=!fastForward;
	var dbr=document.getElementById("divButReproFast");
	if (fastForward) {
		dbr.style.backgroundColor="#22DD22";
		dbr.style.color="black";
		dbr.style.boxShadow="0px 0px 0.2em 0.1em black inset";
	} else {
		dbr.style.backgroundColor="#666666";
		dbr.style.color="white";
		dbr.style.boxShadow="";
	}
}

function checkDisp () {
	for (var i=1;i<=nbAll;i++) {
		if (tDisp[i]<0) {
			if (compteAll(i)==0) {
				tDisp[i]=numGen;
			}
		}
	}
}
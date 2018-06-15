function clavier (e) {
	var c = (window.event) ? event.keyCode : e.which;
	if (c==32) {reproAlea();}
	if ((c==48)&&(modeleReady)) {reproAll();}
	if ((c==49)&&(modeleReady)) {repro10();}
	if ((c==13)&&(!modeleReady)) {clickOKParam();}
}


function checkRange (t) {
	// on supprime les caractères non autorisés
	var vv=t.value+"";
	var valide=true;
	for (var i=0;i<vv.length;i++) {
		var lettre=vv[i];
		if (! ((lettre.match(/[0-9]/i))||(lettre==".")||(lettre==","))) {
			valide=false;
		}
	}
	if (!valide) {
		butOK.style.opacity=0.5;
		butOK.style.pointerEvents ="none";		
		return false;
	}
	
	var v=t.value*1;
	var p=document.getElementById("inputMut").value;
	p=p.replace(",", ".");
	p=p*1;
	
	butOK.style.opacity=1;
	butOK.style.pointerEvents ="auto";
	
	if ((v>t.max)||(v<t.min)) {
		butOK.style.opacity=0.5;
		butOK.style.pointerEvents ="none";
	}
	
	if ((p<0)||(p>100)) {
		butOK.style.opacity=0.5;
		butOK.style.pointerEvents ="none";		
	}
}

function changeVit (v) {
	incProg=v*1;
}

function recalcTabSaisieAll () {
	var a=document.getElementById("inputNbAll").value*1;
	if ((a>1)&&(a<6)) {
		for (var i=1;i<=5;i++) {
			if (i<=a) {
				document.getElementById("rowiAll"+i).style.display="table-row";
			} else {
				document.getElementById("rowiAll"+i).style.display="none";
			}
		}
	}
}
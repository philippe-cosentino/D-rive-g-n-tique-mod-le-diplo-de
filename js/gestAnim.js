var startTime,lastTime,deltaTime;
var temps=0;
var animate=false;

var tAnim=[];

var boiteEnfPleine=false;
var progrMigrGen=0;

var modeleReady=false;

var incProg=1;

var fastForward=false;

function anim() {
	var nowTime = new Date();
	deltaTime=nowTime-lastTime;
	lastTime=nowTime;
	temps+=deltaTime;
	
	if ((cpt10>0)&&(tEnf.length==0)&&(tAnim.length==0)) {
		reproAll();
		cpt10--;
		if (cpt10>0) {		document.getElementById("divcpt10").innerHTML=cpt10+"&times;"; }
		else {		document.getElementById("divcpt10").innerHTML="10&times;"; }
	}
	
	if (animate) {
		effaceCanvAnim();
		if (boiteEnfPleine) {
			progrMigrGen+=incProg*4;
			if (fastForward) {progrMigrGen=100000;}
			if (progrMigrGen>=100) {
				tPar=tEnf.slice();
				tEnf=[];
				tAnim=[];
				boiteEnfPleine=false;
				progrMigrGen=0;
				nCibleEnf=0;
				numGen++;
				addToGraph();
				checkDisp();
				initTabFreq();
				drawGraph ();
			}
			drawBoxes();
		} else {
			for (var i=0;i<tAnim.length;i++) {
				var ta=tAnim[i];
				if (ta.phaseAnim>0) {
					if (ta.phaseAnim<3) {
						relie(ta.na,ta.nb);
					}
					if (ta.phaseAnim==1) {
						drawSpriteAlleles(ta);
					} else if (ta.phaseAnim==2) {
						drawBaby(ta);
					} else if (ta.phaseAnim==3) {
						migreEnfant(ta);
					}
				}
				if (ta.phaseAnim<0) {
					tAnim.splice(i,1);
					i--;
				}
				
			}
		}
		
	}
	requestAnimationFrame(anim);
}

function pauseAnim () {
	animate=false;
}

function resumeAnim() {
	animate=true;
	panelActif=false;
	divPanel.style.display="none";
}

function pauseResume() {
	if (animate) {
		pauseAnim();
	} else {
		resumeAnim();
	}
}

function drawSpriteAlleles(ta) {
	if (!fastForward) {
		
		var r=diam/2;
		
		var xbox1=x2box+r/2;
		var ybox1=y2box+r;
		var xbox2=xbox1+r;
		var ybox2=ybox1;
			
		r*=0.85;

		//sigmoide
		//var i=1/(1+Math.exp(-(progrAnim-50)/21))*1.2-0.1;
		var i=1/(1+Math.exp(-(ta.progrAnim-25)/10.5))*1.2-0.1;
		
		var x=(ta.spriteAll1.x0*(1-i) + xbox1*(i));
		var y=(ta.spriteAll1.y0*(1-i) + ybox1*(i));
		
		var deltaX = x - xbox1;
		var deltaY = y - ybox1;
		var ang = Math.atan2(deltaY, deltaX); 
		drawGamete (ctAnim,"G",x,y,r,ta.spriteAll1.al,true,ang,i*20+ta.spriteAll1.x0+ta.spriteAll1.y0);
		
		var x=(ta.spriteAll2.x0*(1-i) + xbox2*(i));
		var y=(ta.spriteAll2.y0*(1-i) + ybox2*(i));
		
		drawGamete (ctAnim,"G",x,y,r,ta.spriteAll2.al);	
		ta.progrAnim+=incProg;
	} else {
		ta.progrAnim=100000;
	}
	
	if (ta.progrAnim>50) {
		if ((ta.cibleEnf==(eff-1))&&(garSex==true)) {
			// dernier bébé, il faut éviter que des mâles ou des femelles
			var tta=[];
			for (var i=0;i<(tAnim.length-1);i++) {
				if (tAnim[i].bebe!="") {
					tta.push(tAnim[i].bebe);
				}
			}
			var tt=tEnf.concat(tta);
			
			if (nbMales(tt)==0) {ta.bebe="M";}
			else if (nbMales(tt)==tta.length) {ta.bebe="F";}
			else if (Math.random()>0.5) {ta.bebe="M";} else {ta.bebe="F";}
		} else {
			if (Math.random()>0.5) {ta.bebe="M";} else {ta.bebe="F";}
		}
		ta.bebe+=ta.spriteAll1.al+""+ta.spriteAll2.al;
		ta.progrAnim=0;
		if (fastForward) {
			ta.phaseAnim=3;
		} else {
			ta.phaseAnim=2;
		}
	}
}

function effaceCanvAnim () {
	ctAnim.clearRect(0,0,lCanv,hCanv);
}

function drawBaby(ta) {
	if (fastForward) {
		ta.phaseAnim=3;
		return false;
	} else {
		var r=diam/2;

		
		var x=x2box+r;
		var y=y2box+r;
		
		var s=ta.bebe[0];
		var a1=ta.bebe[1]*1;
		var a2=ta.bebe[2]*1;
		
		r*=0.85;
		
		drawGamete (ctAnim,"G",x-r/2,y,r,a1);
		drawGamete (ctAnim,"G",x+r/2,y,r,a2);
		
		r=r*(ta.progrAnim/10);
		

		drawAll1 (ctAnim,s,x,y,r,a1);
		drawAll2 (ctAnim,s,x,y,r,a2);
		drawContourOrg (ctAnim,s,x,y,r);
		ta.progrAnim+=incProg;
	}

	if (ta.progrAnim>10) {
		ta.progrAnim=0;
		ta.phaseAnim=3;
	}
}

function migreEnfant(ta) {
	if (!fastForward) {
		var s=ta.bebe[0];
		var a1=ta.bebe[1]*1;
		var a2=ta.bebe[2]*1;
		
		
		var r=diam/2;
		
			
		var xbox=x2box+r;
		var ybox=y2box+r;
			
		r*=0.85;

		//sigmoide
		var i=1/(1+Math.exp(-(ta.progrAnim-25)/10.5))*1.2-0.1;
		
		var rep=n2xy (ta.cibleEnf,true);
		var xenf=rep.x;
		var yenf=rep.y;
		
		var x=(xbox*(1-i) + xenf*(i));
		var y=(ybox*(1-i) + yenf*(i));
		
		drawAll1 (ctAnim,s,x,y,r,a1);
		drawAll2 (ctAnim,s,x,y,r,a2);
		drawContourOrg (ctAnim,s,x,y,r);
		
		ta.progrAnim+=incProg;
	} else {
		ta.progrAnim=100000;
	}
	
	if (ta.progrAnim>50) {
		ta.progrAnim=0;
		ta.phaseAnim=-1;
		tEnf.push(ta.bebe);
		drawBoxes();
		
		if (tEnf.length>=eff) {
			checkParite(tEnf);
			boiteEnfPleine=true;
			progrMigrGen=0;
		}
	}
}
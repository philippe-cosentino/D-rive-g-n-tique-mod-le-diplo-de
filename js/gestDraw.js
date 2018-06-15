var mustDrawEnf=true;

function drawBoxes () {
	if (!modeleReady) {return false;}
	var r=diam/2;
	var decalY=hCanv*0.5*progrMigrGen/100;
	var hFont=Math.round(lBox*0.6)/10;
	
	ct.font=hFont+"px Tahoma";
	ct.fillStyle="white";
	ct.fillRect (0,0,lCanv,hCanv);
	x0box=lCanv*0.02;
	y0box=hCanv*0.05;
	y1box=hCanv*0.55-decalY;
	ct.strokeStyle="#777";
	ct.lineWidth=1;
	
	ct.fillStyle="black";
	if (!boiteEnfPleine) {
		ct.strokeRect(x0box,y0box,lBox,lBox);
		ct.textAlign="center";
		ct.fillText ("Génération n°"+numGen,x0box+lBox/2,y0box+lBox+hFont);
	}
	
	ct.strokeRect(x0box,y1box,lBox,lBox);
	ct.fillText ("Génération n°"+(numGen*1+1),x0box+lBox/2,y1box+lBox+hFont);
	
	if (!boiteEnfPleine) {
		//petite boîte
		x2box=x0box+lBox+lCanv*0.15;
		h2box=diam;
		y2box=hCanv/2-h2box/2;
		ct.strokeRect(x2box,y2box,h2box,h2box);
		ct.fillText ("Fécondation",x2box+h2box/2,y2box+h2box+hFont);
	}
	
	if (!boiteEnfPleine) {
		//boîtes parents
		for (var i=0;i<eff;i++) {
			var rep=n2xy (i,false);
			var x=rep.x;
			var y=rep.y;
			drawOrg(tPar[i][0],x,y,tPar[i][1]*1,tPar[i][2]*1);
		}
	}
	
	// boîte enfants
	if (mustDrawEnf) {
		for (var i=0;i<tEnf.length;i++) {
			var rep=n2xy (i,true);
			var x=rep.x;
			var y=rep.y-decalY;
			drawOrg(tEnf[i][0],x,y,tEnf[i][1]*1,tEnf[i][2]*1);
		}
	}
}


function drawGamete (ct,s,x,y,r,a,fla,ang,progr) {
	r=r/2;
	ct.fillStyle=tCoul[a];
	ct.strokeStyle="black";
	ct.lineWidth=1;
	ct.beginPath();
	ct.arc(x,y,r,0,TAU);
	ct.fill();		
	ct.stroke();
	if (fla===true) {
		//dessin du flagelle
		var ang2=Math.sin(progr)/6;
		ct.beginPath;
		x=x+Math.cos(ang)*r;
		y=y+Math.sin(ang)*r;
		ct.moveTo(x,y);
		r*=0.5;
		ang+=ang2;
		x=x+Math.cos(ang)*r;
		y=y+Math.sin(ang)*r;
		ct.lineTo(x,y);
		ang+=ang2;
		x=x+Math.cos(ang)*r;
		y=y+Math.sin(ang)*r;
		ct.lineTo(x,y);
		ang+=ang2;
		x=x+Math.cos(ang)*r;
		y=y+Math.sin(ang)*r;
		ct.lineTo(x,y);
		ct.stroke();
	}
}

function drawAll1 (ct,s,x,y,r,a) {
	ct.fillStyle=tCoul[a];
	if (s=="F") {
		ct.beginPath();
		ct.arc(x,y,r,PI_2,PI3_2);
		ct.fill();
	} else if (s=="M") {
		ct.fillRect(x-r,y-r,r,r*2);
	} else {
		ct.strokeStyle="black";
		ct.lineWidth=1;
		ct.beginPath();
		ct.arc(x-r/2,y,r/2,0,TAU);
		ct.fill();		
		ct.stroke();
	}
}

function drawAll2 (ct,s,x,y,r,a) {
	ct.fillStyle=tCoul[a];
	if (s=="F") {
		ct.beginPath();
		ct.arc(x,y,r,PI3_2,PI_2);
		ct.fill();
	} else if (s=="M") {
		ct.fillRect(x,y-r,r,r*2);
	} else {
		ct.strokeStyle="black";
		ct.lineWidth=1;
		ct.beginPath();
		ct.arc(x+r/2,y,r/2,0,TAU);
		ct.fill();	
		ct.stroke();
	}
}

function drawContourOrg (ct,s,x,y,r) {
	ct.strokeStyle="black";
	ct.lineWidth=1;
	if (s=="F") {
		ct.beginPath();
		ct.arc(x,y,r,0,TAU);
		ct.stroke();	
	} else if (s=="M") {
		ct.strokeRect(x-r,y-r,r*2,r*2);
	} 
}

function drawOrg (s,x,y,a1,a2) {
	var r=diam/2;
	
		
	r*=0.85;
	
	drawAll1 (ct,s,x,y,r,a1);
	drawAll2 (ct,s,x,y,r,a2);
	
	drawContourOrg (ct,s,x,y,r);
}

function n2xy (n,enf) {
	var rep={};
	var r=diam/2;
	
	var yy=Math.floor (n/cote);
	var xx=n-yy*cote;
	yy=cote-yy-1;
		
	rep.x=xx*diam+x0box+r;
	rep.y=yy*diam+y0box+r;
	
	if (enf) {
		rep.y+=hCanv*0.5;
	}
	
	return rep;
}


function relie(a,b) {
	ctAnim.save();
	var r=diam/2;
	
	var rep=n2xy (a,false);
	var x=rep.x;
	var y=rep.y;

	var rep=n2xy (b,false);
	var x2=rep.x;
	var y2=rep.y;
	
	ctAnim.strokeStyle="#A77";
	ctAnim.lineWidth=4;
	ctAnim.beginPath();
	ctAnim.moveTo(x,y);
	
	ctAnim.lineTo(x2,y2);
	ctAnim.stroke();
	ctAnim.restore();
	
	ctAnim.strokeStyle="#FFF";
	ctAnim.lineWidth=2;
	ctAnim.beginPath();
	ctAnim.moveTo(x,y);
	
	ctAnim.lineTo(x2,y2);
	ctAnim.stroke();
	ctAnim.restore();	
}

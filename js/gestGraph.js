var tGraph=[];

function addToGraph () {
	for (var i=1;i<=nbAll;i++) {
		tGraph[i].push(compteAll(i)*100/eff/2);
	}
}

function drawGraph () {
	var ct=ctGraph;
	ct.fillStyle="white";
	ct.fillRect(0,0,lCanvG,hCanvG);
	var lg=lCanvG*0.75;
	var hg=hCanvG*0.7;
	var x0=lCanvG*0.1;
	var y0=hCanvG*0.85;
	var x1=x0+lg;
	var y1=y0-hg;
	var rf=hCanv*0.01;
	var lx=lg-lg*0.07;
	var ly=hg-lg*0.07;
	var uy=ly/100;
	
	//axes
	ct.beginPath();
	ct.strokeStyle="black";
	ct.moveTo(x0,y0);
	ct.lineTo(x0,y1);
	ct.moveTo(x0,y0);
	ct.lineTo(x1,y0);
	//pointes
	ct.moveTo(x0,y1);
	ct.lineTo(x0+rf,y1+rf);
	ct.moveTo(x0,y1);
	ct.lineTo(x0-rf,y1+rf);
	ct.moveTo(x1,y0);
	ct.lineTo(x1-rf,y0+rf);
	ct.moveTo(x1,y0);
	ct.lineTo(x1-rf,y0-rf);
	ct.stroke();
	
	//titres axes
	var hFont=Math.round(hg*0.6)/10;
	ct.font=hFont+"px Tahoma";
	ct.textAlign="center";
	ct.fillStyle="black";
	ct.fillText ("Fréquence (%)",x0,y1-hFont);
	ct.textAlign="left";
	ct.fillText ("Génération",x1+hFont*0.5,y0+hFont*0.4);
	
	
	
	//graduations des %
	ct.textAlign="right";
	var r=lx*0.005;
	for (var i=1;i<=10;i++) {
		var y=y0-(i*uy*10);
		ct.fillRect(x0-r,y,r*2,1);
		if ((i==5)||(i==10)) {
			ct.fillText (i*10+"%",x0-hFont*0.5,y+hFont*0.4);	
		}
	}
	
	
	
	if (numGen>0) {
		//graduations des générations
		for (var i=1;i<=numGen;i++) {
			var x=x0+(i*lx/numGen);
			ct.fillRect(x,y0-r,1,r*2);
		}
		
		// tracé du graph
		for (var i=1;i<=nbAll;i++) {
			ct.beginPath();
			ct.strokeStyle=tCoul[i];
			for (var j=0;j<=numGen;j++) {
				var x=x0+j*lx/numGen;
				var y=y0-tGraph[i][j]*uy;
				if (j==0) {
					ct.moveTo(x,y);
				} else {
					ct.lineTo(x,y);
				}
			}
			ct.stroke();
		}
	}
	
	//titre général
	ct.textAlign="center";
	ct.font="italic "+hFont+"px Tahoma";
	ct.fillText ("Evolution de la fréquence des allèles au cours du temps",(x0+x1)/2,hCanvG-hFont);
	

	
}
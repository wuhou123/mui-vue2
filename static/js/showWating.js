//loading,弹窗等组件
export var Vwaiting = function(){
		if(document.getElementById('loaderWrap')){
			document.getElementById('loaderWrap').style.opacity = '1';
//			document.getElementById('loaderWrap').style.display = 'block';			
			return;
		}
		var screen = document.createElement("div");
		screen.innerHTML = '<div id="loaderWrap" class="loader-wrap"><div class="ball"></div><div class="ballshadow"></div></div>';
		document.body.appendChild(screen);
		return screen
	}
export var Cwaiting = function(){
		if(document.getElementById('loaderWrap')){
			document.getElementById('loaderWrap').style.opacity = '0';
//			document.getElementById('loaderWrap').style.display = 'none'
		}
	}
export var Vwaiting = function(msg){
		var relMsg = msg?msg:''
		if(document.getElementById('loaderWrap')){
		document.getElementById('loaderWrap').style.display = 'block';
		document.querySelector('.msg-font').innerText = relMsg
		return;
		}
		var screen = document.createElement("div");
		screen.id = 'loaderWrap';
		screen.className = 'loader-wrap';
		screen.innerHTML = '<div class="loader-container"><div class="loader"></div><span class="msg-font">'+relMsg+'</span></div>';
		document.body.appendChild(screen);
	}
export var Cwaiting = function(){
		console.log('进行了:'+document.getElementById('loaderWrap'))
		if(document.getElementById('loaderWrap')){
			document.getElementById('loaderWrap').style.display = 'none'
		}
	}
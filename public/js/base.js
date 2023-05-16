function SPMenuBtn(){
	var SPmenu = document.getElementById('menu-block');
	var bg_dark = document.getElementById('bg-dark');
	var SPmenuBtn = document.getElementById('SPmenuBtn');

	// https://ithelp.ithome.com.tw/articles/10273163?sc=iThomeR ： 做menu轉叉叉動畫
	// 中間.btn的那條要改成透明，而非讓他成為其中一條交叉的線(因為它轉的話，定位在它上面的偽元素也跟著一起轉，變成大家一起轉啊轉)

	// active ： btn 變叉叉、從右向左滑出menu(到畫面一半)、背景變暗
	// inactive ： btn 變回來、menu從右向左滑出螢幕、背景變回來

	if (SPmenu.classList.contains("menu-close")){ // menu未打開(初始狀態)
		// 打開
		bg_dark.classList.add('bg-turn-dark');

		SPmenuBtn.classList.remove('MenuBtn-close');
		SPmenuBtn.classList.add('MenuBtn-active');
	 	SPmenu.classList.remove('menu-close');
	  	SPmenu.classList.add('menu-active');
	}else{
		// 關閉
		bg_dark.classList.remove('bg-turn-dark');

		// offsetWidth/offsetHeight 是「元素本身」的寬度/高度，並完整了包含了邊界、捲軸及padding
		// void：接收任意的運算式或值，然後回傳 undefined
		// void SPmenuBtn.offsetWidth;
		
		SPmenuBtn.classList.remove('MenuBtn-active');
		SPmenuBtn.classList.add('MenuBtn-close');
		SPmenu.classList.remove('menu-active');
		SPmenu.classList.add('menu-close');
	}
}

// 找 cookie
function getCookie() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;
    
    for (var i=0, l=cookieAry.length; i<l; ++i) {
        cookie = jQuery.trim(cookieAry[i]);
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }
    
    return cookieObj;
}

window.onload = (event) => {
	// 控制各種卷軸位置的 header

	// 原始卷軸位置(最上面為0)
	var prevScrollY = window.scrollY;
	var header = document.getElementsByTagName('header')[0];
	var header_height = window.getComputedStyle(header).height.replace('px', '')
	var to_top = document.getElementsByClassName('to-top')[0];

	// 回到最頂按鈕監聽事件
	to_top.addEventListener('click', (e) => {
		$("html, body").animate(
	    {
	     	scrollTop: 0
	    }
	    ,256); // 回頂部時間為 500 毫秒
	});

	window.addEventListener('scroll', (e) => {
		if (window.scrollY > header_height && prevScrollY < window.scrollY) {
			// header 看不到時 or 往下卷時，header 消失
			header.style.setProperty('transform', `translateY(-${header_height}px)`, 'important');
			// 回到最頂按鈕出現
			to_top.style.setProperty('display','flex');
			to_top.classList.add('active')
			to_top.classList.remove('inactive')
		}
		else if (window.scrollY < header_height) {
			// header 會出現的區域，且卷軸往上時
			header.style.setProperty('background-color', `rgba(240, 235, 235, 0.3)`, 'important');
			to_top.classList.add('inactive')
			to_top.classList.remove('active')

			// to_top.style.setProperty('display','none');
		}
		else{
			// header 不會出現的區域，且卷軸往上時
			header.style.setProperty('transform', ``);
			header.style.setProperty('background-color', `rgba(240, 235, 235, 1)`, 'important');
			// to_top.style.setProperty('display','flex');
			to_top.classList.add('active')
			to_top.classList.remove('inactive')
		}
		
		// 重新定義捲動後的卷軸位置
		prevScrollY = window.scrollY;
	});

	var sns_mask = $('.sns-mask')
	sns_mask.each(function(index) {
		$(this).css('mask-image',`url(img/icon/${$(this).data('sns')}.png)`)
		$(this).css('-webkit-mask-image',`url(img/icon/${$(this).data('sns')}.png)`)
	});

	var text_to_html = $(".text-to-html")
	text_to_html.each(function(index) {
		console.log($(this));
		console.log($(this).innerText)
		$(this).innerHTML = $(this).innerText;
		console.log($(this).innerHTML)
	});
}
// silder 圖片效果

let slider = document.getElementsByClassName('Slider');
let navs = document.getElementsByClassName("navs");
let sliderBtn = document.getElementsByClassName("sliderBtn");

for (i = 0; i < sliderBtn.length; i++) {
	sliderBtn[i].addEventListener('click',function(e){
		if (e.currentTarget.dataset.action == "next"){
			// 利用幻燈片 function 最後數字會+1，強行讓他換下一個
			// 問題：1會直接跳到3
			clearTimeout(timeout_silder);
			showSlides();
		}else if(e.currentTarget.dataset.action == "back"){
			clearTimeout(timeout_silder);
			slideIndex -= 2
			showSlides();
		}
	});
}	

for (i = 0; i < navs.length; i++) {
	navs[i].addEventListener('click',function(e){
		// 中止冒泡事件，只執行所點擊的元素就好
		e.stopPropagation;
		// 清除預設執行的幻燈片
		clearTimeout(timeout_silder);
		// e.target 為取得觸發的元素，dataset 則是從 data-is 裡取出值
		// 要直接賦予才可以改成全域變數
		// console.log(e.target); // 代表的會是「觸發事件的」元素
		// console.log(e.currentTarget); // 代表的會是「觸發事件的目標」元素
		slideIndex = e.currentTarget.dataset.id; // 如果聽到的是 nav-btn 會出錯
		// 使用新的 sliderIndex 開啟幻燈片
		showSlides();
	});
}


function showSlides() {
	// 功能：
	// 1. 每兩秒自動往下一格
	// 2. 可以用點操作silder
	// 3. 可以用左右按鈕操作silder

	// 條件式整理：
	// ・ 每觸發一個條件就 + 1 -> 不通用不行

	// 問題點：
	// 當時間還沒到卻點了下一個圖片的按鈕時，下一次往前的時間會怎麼算
	// -> 希望能重新計時，使用者體驗比較好
	// 作法：在左右按鍵及點按鍵使用 onclick，會重新計時

	// 若事件被觸發
	if (slideIndex > slider.length){ // 避免超過
  		slideIndex = slideIndex % slider.length;
  	}else if(slideIndex <= 0){ // 從第一頁往前滑時
  		slideIndex = slider.length;
  	}
  	// slider[slideIndex-2].style.animation = "fade-out 3s forwards"

  	// 把所有 silder&dot 隱藏
  	let i;
  	for (i = 0; i < slider.length; i++) {
  		slider[i].classList.remove("opacity-1");
    	slider[i].classList.add("opacity-0");
    	// slider[i].style.animation = "fade-out 1.5s ease-in-out forwards"
  	}
  	for (i = 0; i < navs.length; i++) {
  	  	navs[i].classList.remove("slider-nav-active");
  	}
  	// 當前顯示的 silder
  	slider[slideIndex-1].classList.remove("opacity-0");
  	slider[slideIndex-1].classList.add("opacity-1");
  	navs[slideIndex-1].classList.add("slider-nav-active");

  	// 每兩秒執行，執行後再回到 function 裡反覆
  	slideIndex++;

  	// 直接賦予極為全域變數
  	timeout_silder = setTimeout(showSlides, 5000);
}

let slideIndex = 1;
showSlides();
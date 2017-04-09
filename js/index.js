
$(function() {
	$('#fullpage').fullpage({
		anchors: ['page1', 'page2', 'page3'],
		scrollOverflow: true,
		afterLoad: function(anchorLink, index){
			if(index == 1){
				$('.inner').find('h2').removeClass('fadeOut');
				$('.onner').removeClass('fadeOut');
				$('.inner').find('h2').addClass('fadeInUp');
				$('.onner').addClass('fadeInUp');
			}
			if(index == 2){
			}
			if(index == 3){
				$('.verticalnav').css("display","block");
				$('.verticalnav').removeClass('animated zoomOutLeft');
				$('.verticalnav').addClass('animated zoomInLeft');
				$.fn.fullpage.setAllowScrolling(false);
				$.fn.fullpage.setKeyboardScrolling(false);

			}
		},
		onLeave: function(index, direction){
			if(index == '1'){
				$("#content").click();
				$('.inner').find('h2').removeClass('fadeInUp');
				$('.onner').removeClass('fadeInUp');
				$('.inner').find('h2').addClass('fadeOut');
				$('.onner').addClass('fadeOut');
			}
			if(index == '3'){
				$('.verticalnav').removeClass('animated zoomInLeft');
				$('.verticalnav').addClass('animated zoomOutLeft');
				$.fn.fullpage.setAllowScrolling(true);
				$.fn.fullpage.setKeyboardScrolling(true);
			}
		}
	});
	NProgress.start();
	location.href = "#page1";
	$.fn.fullpage.setAllowScrolling(false);
	$.fn.fullpage.setKeyboardScrolling(false);
	setTimeout(function(){
	NProgress.done();
	$('.nprogress').fadeOut(500,function(){
		$('.inner').css("display","block");
		$('.onner').css("display","block");
		$.fn.fullpage.setAllowScrolling(true);
		$.fn.fullpage.setKeyboardScrolling(true);
		});
	},2000);
	$('#verification0').on('click', function() {
		document.getElementById('verification0').innerHTML = '<img src="user/pic?act=0">';
	})
	$('#login-modal').on('show.bs.modal', function () {
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
	});
	$('#login-modal').on('hide.bs.modal', function () {
		$.fn.fullpage.setAllowScrolling(true);
		$.fn.fullpage.setKeyboardScrolling(true);
	})
	$('.iconDown').mouseover(function(){
		$('.iconDown').find('i').addClass('animated fadeInDown infinite slow');
	});
	$('.iconDown').mouseout(function(){
		$('.iconDown').find('i').removeClass('animated fadeInDown infinite slow');
	});
	$('#login-modal').modal({
		show     : false,
		backdrop : true,
		remote   : 'login-form.html'
	});
	$('#registerbtn').click(function(){
		$(".plane").css("display","none");
		$('.icon-feiji').removeClass('bounceOutUp');
		$('#registerpage').removeClass('animated fadeOutRightBig rotateScaleOut');
		$('.icon-feiji').addClass('bounceInDown');
		$('#registerpage').addClass('animated fadeInRightBig');
		$(".register-background").fadeIn();
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
	});
	$('#registerpage').on("click",function(event){
		event.stopPropagation();
	});
	$("#content").click(function(){
		if($("nav").hasClass('animated bounce'))
			return;
		$("nav").fadeIn();
		$("nav").addClass('animated bounce');
	});
	var isanimated = false;
	$('#registerloginbtn').click(function(){
		var Data2 = {account : "", password : "", repassword : "",verification : "",phone : "",truename : ""};
		Data2["account"] = $('#registerpage').find("input[placeholder = '用户名']").val();
		Data2["password"] = $('#registerpage').find("input[placeholder = '密码']").val();
		Data2["repassword"] = $('#registerpage').find("input[placeholder = '确认密码']").val();
		Data2["verification"] = $('#registerpage').find("input[placeholder = '验证码']").val();
		Data2["phone"] = $('#registerpage').find("input[placeholder = '手机号']").val();
		Data2["truename"] = $('#registerpage').find("input[placeholder = '真实姓名']").val();
		console.log($('#registerpage').find("input[placeholder = '用户名']"));
		isanimated = true;
		$('.icon-feiji').css("display","none");
		$('#registerpage').removeClass("fadeInRightBig adeOutRightBig");
		$('#registerpage').addClass("rotateScaleOut");
		setTimeout(function(){
			$(".plane").css("display","block");
			$(".plane").addClass('fly');
			setTimeout(function(){$(".register-background").fadeOut("1500",function(){
				$("#user").text("您好，小禾登");
				$("#user").css("color","white");
				isanimated = false;
				$('.icon-feiji').css("display","block");
				$.fn.fullpage.setAllowScrolling(true);
				$.fn.fullpage.setKeyboardScrolling(true);
			});},400);
		},500);
	});
	$('.register-background').on("click",function(){
		if(isanimated == true)
			return;
		$(".plane").css("display","none");
		$('.icon-feiji').removeClass('bounceInDown');
		$('#registerpage').removeClass('animated fadeInRightBig rotateScaleOut');
		$('.icon-feiji').addClass('bounceOutUp');
		$('#registerpage').addClass('animated fadeOutRightBig');
		setTimeout(function(){$(".register-background").fadeOut();},100);
		$.fn.fullpage.setAllowScrolling(true);
		$.fn.fullpage.setKeyboardScrolling(true);
	});
	$("[data-toggle='popover']").popover();
	$('.icon-YLTC_nopic').click(function(){
		$('.menu-left').toggle();
	});

});

	
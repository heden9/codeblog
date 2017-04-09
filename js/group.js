function BuildGroupList(groupdata){
	var Build = $(".verticalnav").find("#collapseOne");
	var ManaGe = $(".verticalnav").find("#collapseTwo");
	var Normal = $(".verticalnav").find("#collapseThree");
	Build.find('li').remove();
	ManaGe.find('li').remove();
	Normal.find('li').remove();
	const icon = ["glyphicon-glass","glyphicon-music","glyphicon-pencil","glyphicon-heart-empty"];
	for(var i = 0;i < getJsonLength(groupdata) ; i++){
		switch(groupdata[i]["identity"]){
			case "主" : Build.append("<li><span class='glyphicon " + icon[Math.round(Math.random() * 3)] + "' value = " +groupdata[i]["groupID"]+ "></span> "+ groupdata[i]["groupName"] +"</li>");break;
			case "管" : ManaGe.append("<li><span class='glyphicon " + icon[Math.round(Math.random() * 3)] + "' value = " +groupdata[i]["groupID"]+ "></span> "+ groupdata[i]["groupName"] +"</li>");break;
			case "众" : Normal.append("<li><span class='glyphicon " + icon[Math.round(Math.random() * 3)] + "' value = " +groupdata[i]["groupID"]+ "></span> "+ groupdata[i]["groupName"] +"</li>");break;
			// default : console.log('error');
		}
		
	}
	
	if(Build.find('li').length == 0){
		Build.append("<li>暂无群信息</li>");
		Build.removeClass('in');
	}
	if(ManaGe.find('li').length == 0){
		ManaGe.append("<li>暂无群信息</li>");
		ManaGe.removeClass('in');
	}
		
	if(Normal.find('li').length == 0){
		Normal.append("<li>暂无群信息</li>");
		Normal.removeClass('in');
	}
		
	
	$("ul[id^='collapse']>li").click(function(){
		openGroup($(this).find('span').attr("value"));
	});

}

function openGroup(groupID) {
	var data = {groupID : groupID};
	$.getJSON('group/openGroup', data, function(groupinfo) {
		console.log(groupinfo);
		$('#accordion>div').remove();
		$("#grounpMemberList").find('li').remove();
		displayGroupInfo(groupinfo);
	});
}

function getJsonLength(jsonData){
	var jsonLength = 0;
	for(var item in jsonData){
	jsonLength++;
	}
	return jsonLength;
}

function displayGroupInfo(groupinfo){

	$("#groupName").text(groupinfo['groupName']);
	$("#groupName").next("small").text(groupinfo['groupName']);
	for(var i = 0;i < getJsonLength(groupinfo["task"]);i++){
		var sum = getJsonLength(groupinfo["task"][i]["finishMember"]) + getJsonLength(groupinfo["task"][i]["finishTeam"]);
		$('#accordion').append("<div class='panel panel-default'><div class='panel-heading loading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#task" + i + "'>" + groupinfo["task"][i]["taskTitle"] + "</a><span class='badge finishedPeople'>" + sum + "</span><a href = 'group/taskDetail?taskID=" + groupinfo["task"][i]["taskID"] + "' target='_blank'><svg class='icon pull-right' style='opacity:.7;cursor:pointer;' width='20px' height='20.00px' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'><path fill='#333333' d='M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z'  /></svg></a></h4></div><div id='task" + i + "' class='panel-collapse collapse'><div class='panel-body'>" + groupinfo["task"][i]["taskDescription"] + "</div><div class='deadline pull-right'>" + groupinfo["task"][i]["taskDeadline"] + "</div></div></div>");
	}
	$(".menu-left").find(".member").text("成员 " + getJsonLength(groupinfo["member"]));
	for(var i = 0;i < getJsonLength(groupinfo["member"]);i++){
		$("#grounpMemberList").append("<li value = " + groupinfo["member"][i]["userID"] + ">" + groupinfo["member"][i]["trueName"] + "</li>");
		switch(groupinfo["member"][i]["identity"]){
			case "主" : $("#grounpMemberList>li").eq(i).append("<svg class='icon' aria-hidden='true' title='CREATE' data-container='body' data-toggle='popover' data-trigger='click' data-placement='right' data-content='创建群'><use xlink:href='#icon-chaojiguanliyuan'></use></svg>");break;
			case "管" : $("#grounpMemberList>li").eq(i).append("<svg class='icon' aria-hidden='true'> <use xlink:href='#icon-guanliyuan'></use></svg>");break;
			case "众" :$("#grounpMemberList>li").eq(i).append("<svg class='icon' style='color:#0093cb;' aria-hidden='true'><use xlink:href='#icon-YLTC_nopic'></use></svg>");break;
			// default : console.log("error");
		}
	}
}

$("svg.icon").popover({
			html : true
		});
$('#search').next(':submit').click(function(){
	var searchInfo = $('#search').val();
	var data = {groupAccount : searchInfo};
	$.ajax({
		url : 'group/joinGroup',
		method : 'post',
		data : data,
		success : function(result) {
			if(result != "未传值")
				alert(result);
		}
	})
});
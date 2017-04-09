$("[data-toggle='modal']").click(function(){
var _target = $(this).attr('data-target')
t=setTimeout(function () {
var _modal = $(_target).find(".modal-dialog")
_modal.animate({'margin-top': parseInt(($(window).height() - _modal.height())/2)}, 300 )
},200)

});


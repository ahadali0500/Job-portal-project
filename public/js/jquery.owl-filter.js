/**
 * jquery.owl-filter.js
 * Create: 07-09-2016
 * Author: Bearsthemes
 * Version: 1.0.0
 */
 "use strict";$.fn.owlRemoveItem=function(e){var o=$(this).data("owl.carousel");o._items=$.map(o._items,function(o,l){if(l!=e)return o}),$(this).find(".owl-item").eq(e).remove()},$.fn.owlFilter=function(e,o){var l=this,t=($(l).data("owl.carousel"),$("<div>").css("display","none"));switch(void 0===$(l).data("owl-clone")?($(l).find(".owl-item:not(.cloned)").clone().appendTo(t),$(l).data("owl-clone",t)):t=$(l).data("owl-clone"),l.trigger("replace.owl.carousel",["<div/>"]),e){case"*":t.children().each(function(){l.trigger("add.owl.carousel",[$(this).clone()])});break;default:t.find(e).each(function(){l.trigger("add.owl.carousel",[$(this).parent().clone()])})}l.owlRemoveItem(0),l.trigger("refresh.owl.carousel").trigger("to.owl.carousel",[0]),o&&o.call(this,l)};
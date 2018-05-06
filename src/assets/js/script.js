$(document).ready(function(){
    // MENU
    // Menu Icon
    $(".menuIcon").click(function(){
        $(this).toggleClass("is-active");
        $(this).closest(".navbar").find(".mainMenu").slideToggle(200);
        $(this).closest(".navbar").find(".has-submenu").parent().removeClass("is-active");
        $(this).closest(".navbar").find(".submenu").slideUp(200);
    });
	
	// Menu Mobile
    $(".has-submenu").click(function(e){
        var windowWidth = $(window).innerWidth();
        if( windowWidth <= 1024 ) {
            e.preventDefault(); 
            $(this).parent().toggleClass("is-active");
            $(this).next().find(".has-submenu").parent().removeClass("is-active");
            $(this).parent().siblings().find(".has-submenu").parent().removeClass("is-active");
            $(this).parent().siblings().find(".submenu").slideUp(200);
            $(this).next().find(".submenu").slideUp(200);
            $(this).next().slideToggle(200);
        }
    });

	// Click on Window
    $(window).on("click",function(e){
        var wWidth = $(window).innerWidth(),
            check = e.target.closest(".navbar");
        if( wWidth <= 1024 && check === null){
            $(".mainMenu").slideUp(200);
            $(".menuIcon").removeClass("is-active");
            $(".has-submenu").parent().removeClass("is-active");
            $(".submenu").slideUp(200);
        }
    });

    // INPUT NUMBER
    $('[data-type="number"]').keydown(function(e){
        if(
        // Allow: space, backspace, delete, tab, escape, enter and .
        $.inArray(e.keyCode, [32, 8, 46, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+V
        (e.keyCode == 86 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
        ){
            return;
        }
        // Ensure that it is a number and stop the keypress
        if(
        (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)
        ){
            e.preventDefault();
        }
    });

    // TOGGLE
    $("[data-target]").click(function(e){
        e.preventDefault();
        var targetArray = $(this).data("target").split('|');
        for(var i=0,len=targetArray.length; i<len; i++){
            var target = targetArray[i].split(',')[0],
                    targetClass = targetArray[i].split(',')[1];
            $(target).toggleClass(targetClass); 
        }   
        
    });
    // WINDOW CLICK
    $("[data-toggle],[data-prevent]").each(function(){
        $(this).click(function(e){
            e.stopPropagation();	
        });
    });
    $(window).click(function(e){
        $("[data-toggle]").each(function(){
            var targetArray = $(this).data("target").split("|");
            for(var i=0,len=targetArray.length; i<len; i++){
                var target = targetArray[i].split(",")[0],
                targetClass = targetArray[i].split(",")[1];
                $(target).removeClass(targetClass);
            }
        });
    });
       
});
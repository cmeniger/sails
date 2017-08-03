$(window).scroll(function ()
{
    var y = $(this).scrollTop();
    if(y > 0)
    {
        $('body').addClass('scroll');
        $('#anchor-top').show();
    }
    else
    {
        $('body').removeClass('scroll');
        $('#anchor-top').hide();
    }
});
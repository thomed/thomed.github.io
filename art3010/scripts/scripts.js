/**
 * All text content found below here!
 */
var introText = '&emsp;Computers play an integral role in the lives of 21st century human beings, especially in first-world countries where it seems as though most people interact with some form of a computer on a daily basis. Because we spend so much time utilizing them, we acclimate quite quickly to the changes they go through. However, if we were to compare the methods of computer usage from the past with those of today, the changes become extremely apparent. The designs of modern human-computer interfaces are the results of decades of progression through trial, error, experimentation, and technological advancements.';

var univacText1 = '&emsp;One of the earliest commercial computers to provide realtime visual feedback based on user input and output was the Universal Automatic Computer 1 (UNIVAC 1), which was delivered to the first customer in 1951. This 29,000 pound, 5,200 vacuum tube behemoth had enough memory to hold about twenty 10-character words. Although famous for being used to accurately predict Dwight D. Eisenhower’s victory over Adlai Stevenson in the 1952 presidential election, using the UNIVAC 1 would be an extremely convoluted and unfamiliar process compared to what we use today.';
var univacText2 = '&emsp;The UNIVAC 1 used a keyboard and console typewriter along with dozens of switches switches on a panel to enter data and send instructions to the computer. As data was processed, the colored lights scattered across the black switch-panel flickered and information printed from the console typewriter. Used solely for calculating and producing information, these simple, high-contrast responses did everything that an early computer interface needed to do. These types of interfaces were used until the late 1960s.';

var commandLineText1 = '&emsp;In 1969, the first computer terminal reminiscent of modern devices entered production. The Datapoint 3300 was intended to emulate console typewriters, displaying text on a screen rather than paper as the user typed on the attached keyboard. The screen displayed the now classic, or even forgotten, monochromatic green text on a black background. This remained the most common color scheme many years, though some terminals used amber or orange in place of green. Still high-contrast, these simple color schemes represent the utilitarian functions of a command line interface.';
var commandLineText2 = '&emsp;Although no longer the norm when interacting with a computer, command line interfaces very much still exist in modern computers, generally in the form of an emulator. However, no longer limited by technology or hardware, the colors and layout of these terminal command line emulators offer many customization options. Modern computer displays are capable of displaying over 16.6 million different colors. Though using high-contrasting colors is generally still favorable in terminal emulators, many users opt to customize them as more of display of personality or character than for optimal utility.';

var guiIntroText = '&emsp;The emulation of a terminal command line might still be the supporting backbone of modern computer operating systems and interfaces, but the average computer user in modern times is unlikely to ever utilize one, or even see one. This is due to the rise of the Graphical User Interface, or GUI. GUIs provide rich, colorful, customizable, intuitive, highly-interactive ways for users to make use of a computer.';
var guiText1 = '&emsp;The first system reminiscent of a Graphical User Interface was the On-Line System, commonly referred to as the NLS, developed by researchers at the Stanford Research Institute in the late 1960s. This system introduced many modern ideas such as hypertext, mouse navigation, screen windowing, and presentation programs. GUIs gained traction and were popularized in the 1980s as windowing systems were developed for command line interfaces and the first Apple Macintosh was released. These early GUIs displayed information in grayscale, manifesting a similar utilitarianism to that of command line interfaces.';
var guiText2 = '&emsp;1985 brought with it the Amiga Workbench. This cutting edge computing machine featured a GUI with color graphics. The Amiga could display four colors: black, white, blue, and orange.';
var guiText3 = '&emsp;Unfortunately for Amiga, 1985 held something else in store. The first version of Microsoft’s Windows operating system, Windows 1.0, was released roughly five months later. The first version of Windows supported a palette of 64 colors, though it was only capable of displaying 16 different colors at once due to memory limitations.  With access to such a wide variety of colors, using a computer no longer seemed to be a monotonous task from the layman’s point of view. These vibrant colors were attractive and vivid; oftentimes uncommon in the real world.';
var guiText4 = '&emsp;By 1990, graphical user interfaces were supporting 256 colors at a time. Also considering the integration rate of the personal computer into the daily lives of the populace at this time, the stimulating visuals of colorful computer screens were sweeping across the world. Operating systems utilized this power to demand focus, instruct direction, and wordlessly educate.';
var guiText5 = '&emsp;From roughly 2001 to the present day, GUIs have become extremely polished. Millions of colors are displayed and absorbed by us without a second thought. High pixel-density displays create seamless and realistic gradients true to real life visuals. We are granted the ability to customize almost every aspect of our interface, allowing us to project our personalities onto our virtual workspaces.';
var guiTextEpi = 'Human-computer interaction has changed drastically over time, to put it lightly. No longer a single-purpose utilitarian machine, computers are used by almost everybody for almost any reason imaginable.';

var allText = [introText, univacText1, univacText2, commandLineText1, commandLineText2,
    guiIntroText, guiText1, guiText2, guiText3, guiText4, guiText5, guiTextEpi];
/**
 * All text content found above here!
 */

var wWidth, wHeight;
// window resize
$(window).resize(function () {
    wWidth = $(window).width();
    wHeight = $(window).height();
});

// when page is loaded
$(document).ready(function () {
    wWidth = $(window).width();
    wHeight = $(window).height();

    $('#p1').html(introText);

    $('.page-header').css({
        'width': $('.page-header').width()
    });

    $('#page-header-wrapper').animate({
        opacity: 1
    }, 800);

//    allText.forEach(function(section) {
//        $('.primary-text').append("<p>" + section + "</p>")
//    });
});


/**
 * Rearrange page to paper format and apply narrative styling
 */
function start() {
    //console.log("clicked start");
    $('#start-btn').remove();
    $('#page-header-wrapper').addClass('navbar-fixed-top');
    $('.main-content').css({'visibility': 'visible'});
    $('#page-header-wrapper').animate({
        'margin-top': '0vh'
    }, 600, function () {
        $('.page-header').animate({
            'margin-right': wWidth + 'px',
            'margin-left': '3%'
        }, 700);
    });

    // do this after things rearrange
    setTimeout(function () {
        $('body').css({
            'font-family': 'serif'
        });
        $('.main-content').animate({opacity: 1}, 200);
    }, 980);
}


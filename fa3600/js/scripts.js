/**
* Interactive Historical Fiction project - FA 3600
* @author Thomas Walker April 2016
*/

var helpMsg, username, terminalUser, delay, terminalEntered, terminalOpened = false,
  introText = [], currentText = 0, question = 1, typingSpeed = 35, messageFrom = "UNKNOWN says: ";

$(document).ready(function() {
  helpMsg = "Enter your name in the box and press ok to begin.";
  delay = 2000; // initial fade in delay

  setTimeout(function () {
    helpButtonGlow();
  }, 1500);

  // overrides helpButtonGlow() overwrite of CSS
  $(".help-btn").mouseover(function() {
    $(".help-btn").css("background-color", "#616161");
  }).mouseout(function(){
    $(".help-btn").css("background-color", "#4d4d4d");
  });

  // name input listener
  $(".name-input").keypress(function(e) {
    if(e.keyCode == 13) {
      getNameInput();
    }
  });
});

/** Display alert with helpMsg on help-btn click */
function helpButton() {
  alert(helpMsg);
  $(".terminal-input").focus();
}

function restart() {
  location.reload();
}

function clearInput() {
  $(".name-input").val("");
}

/**
* Everything starts once the user has entered a name.
*/
function getNameInput() {
  helpMsg = "Um... try clicking continue?";
  username = $(".name-input").val().toLowerCase().replace(/\s/g, '');
  if(username == "enteryourname" || username.length <= 1) {
    username = "user";
  }
  terminalUser = "<li>" + username + "@root ~ $ " + "</li>";

  $(".input-section").animate({opacity: "0"});

  setTimeout(function() { // display intro text
    $(".newsarticle").remove();
    $(".input-section").css({display: "none"});
    $(".intro-text").css({display: "inline"});
    $(".intro-text").animate({opacity: "1"});

    createIntroText();  // addIntroText();
    setTimeout(function () { // display first intro text then button
      fadeIntroText(introText[0]);
      $(".spacer").animate({opacity: "1"});
      setTimeout(function () {  // display button
        $(".continue-btn").css({display: "inline"});
        $(".continue-btn").animate({opacity: "1"});
      }, 2000);
    }, 1000);
  }, 1000);
}

/**
* On click of continue button. Changes to the next intro text and fades it in.
*/
function nextIntroText(){
  currentText++;
  fadeIntroText(introText[currentText]);

  // make decision after intro text
  if(currentText == introText.length - 1) {
    helpMsg = "Choose wisely, this could be a life-altering decision!";
    setTimeout(function () {
      helpButtonGlow();
    }, 2500);
    $(".continue-btn").text("Investigate the terminal");
    $(".shutdown-btn").css({display: "inline"});
  }
  if(currentText > introText.length - 1) { // expand terminal and remove everything else
    helpMsg = "Nothing to help with right meow.";
    $(".intro").animate({opacity: "0"});
    $(".spacer").animate({opacity: "0"});
    $(".continue-btn").animate({opacity: "0"});
    $(".shutdown-btn").animate({opacity: "0"});
    setTimeout(function () {
      $(".intro").css({display: "none"});
      $(".continue-btn").css({display: "none"});
      $(".shutdown-btn").css({display: "none"});
      expandTerminal();
    }, 500);
  }
}

/**
* Method for fading old text out and fading new text in.
*/
function fadeIntroText(text) {
  $(".intro-text-content").animate({opacity: "0"});
  setTimeout(function () {
    $(".intro-text-content").text(text);
    $(".intro-text-content").animate({opacity: "1"});
  }, 500);
}

/**
* If the user chooses to shutdown and go home, do this.
*/
function shutDownAndGoHome() {

  if(terminalOpened) {
    $(".terminal-window").animate({opacity: "0", height: "0px"});
    $(".intro-text-content").css({opacity: "0"});
    $(".intro-text-intro").css({display: "none"});
    $(".intro").css({display: "inline", opacity: "1"});
    setTimeout(function () {
      $(".terminal-window").css({display: "none"});
    }, 1500);
  }

  fadeIntroText("You shut down the terminal and went home.");
  $(".btn").animate({opacity: "0"});
  $(".intro-text-intro").animate({opacity: "0"});
  $(".spacer").animate({opacity: "0"});

  setTimeout(function () { // remove buttons after fading
    $(".btn").css({display: "none"});
  }, 500);

  setTimeout(function () { // fade remaining text
    $(".intro-text-content").animate({opacity: "0"});
    $(".replay-btn").css({display: "inline"});
    $(".replay-btn").animate({opacity: "1"});
  }, 3000);

}

/**
* Expand the terminal window if the user decides to approach the terminal
* rather than shut it down. Hides everything else.
*/
function expandTerminal() {
  terminalOpened = true;
  helpMsg = "Type your responses in the terminal. If the cursor is ever not present, click on the area next to the bottom line. " +
  	"\n\nFor this part, enter 'y' to allow the mysterious stranger to connect to your terminal, or "+
    "enter 'n' to deny the connection and go home.";

  $(".terminal-window").css({opacity: "1"});
  $(".terminal-window").animate({height: "550px"});
  $(".terminal-text").append(terminalUser);
  $("body").animate({backgroundColor: "#090909"});

  //adjust input margin based on name length
  var dummyName = "<span class=\"dummy\">" + username + "@root ~ $&nbsp" + "</span>";
  $(".terminal-text").append(dummyName);
    var margin = ($(".dummy").width() + 16) + 1 + "px";
    var height = ($(".dummy").height() * -1) - 4;
    $(".dummy").remove();
    //console.log(margin);
    $(".terminal-input").css("margin-left", margin);
    $(".terminal-input").css("transform", "translateY(" + height + "px)");

    var message1 = "User with IP address **.**.***.* is attempting to connect to this workstation.";
    typeInTerminal(message1);
    setTimeout(function () {
      typeInTerminal("Allow connection? y/n");
      setTimeout(function () {
        helpButtonGlow();
      }, 3000);
    }, typingSpeed * message1.length + 5); // need additional delay to keep input hidden

    // create input box key listener
    $(".terminal-input").keypress(function(e) {
      if(e.keyCode == 13) {
        terminalReturn();
      }
    });

    // create terminal scroll listener to hide input box when not at the bottom
    $(".terminal-text").scroll(function() {
      if($(".terminal-text").scrollTop() <= $(".terminal-text").prop("scrollHeight") - $(".terminal-text").height() - 3) {
        $(".terminal-input").css({display: "none"});
      } else {
        $(".terminal-input").css({display: "inline"});
        $(".terminal-input").focus();
      }
    });
}

/**
* Appends the given string to the terminal window in a way that gives the
* appearance of typing.
*/
function typeInTerminal(string) {
  var characters = string.split("");
  var i = 0;

  $(".terminal-input").blur();

  var typeText = setInterval(function() {
    if(i > characters.length - 1) {
      clearInterval(typeText);
    } else {
      if(characters[i] == '%' && characters[i+1] == 'n') {
        $(".terminal-text").append(terminalUser);
        i += 2;
      }
      $(".terminal-text").find("li:last").append(characters[i++]);
    }
  }, typingSpeed);

  // move to next line and focus input for caret
  setTimeout(function () {
    $(".terminal-text").append(terminalUser);
    $(".terminal-input").focus();
  }, (typingSpeed * characters.length) + 1);

}

/**
* Similar to typeInTerminal(). Appends the given string to the terminal in a
* way that gives the appearance of typing, but instantly appends sender
* information.
*/
function receiveMessage(string) {
  var characters = string.split("");
  var i = 0;

  $(".terminal-input").blur();
  $(".terminal-text").find("li:last").append(messageFrom);

  var typeText = setInterval(function() {
    if(i > characters.length - 1) {
      clearInterval(typeText);
    } else {
      if(characters[i] == '%' && characters[i+1] == 'n') {
        $(".terminal-text").append(terminalUser);
        i += 2;
        updateScroll();
      }
      $(".terminal-text").find("li:last").append(characters[i++]);
    }
  }, typingSpeed);

  // move to next line and focus input for caret
  setTimeout(function () {
    $(".terminal-text").find("li:last").append(terminalUser);
    $(".terminal-input").focus();
    updateScroll();
  }, (typingSpeed * characters.length) + 1);
}

/**
* Each time enter is pressed while typing in the terminal, do this.
*/
function terminalReturn() {
  // save value from input
  terminalEntered = $(".terminal-input").val();

  // append entered text to terminal list and move to next line
  $(".terminal-text").find("li:last").append(terminalEntered);
  $(".terminal-text").append(terminalUser);
  $(".terminal-input").val("");
  terminalEntered = terminalEntered.toLowerCase();
  updateScroll();

  // after answering connection acceptance question
  if(terminalEntered !== "") {
    switch (question) {
      case 1: response1();
        break;
      case 2:
        setTimeout(function () {
          response2();
        }, 1500);
        break;
      case 3:
      	setTimeout(function() {
      		response3();
      	}, 1500);
      	break;
      case 4:
      	setTimeout(function() {
      		response4();
      	}, 1500);
      	break;
      case 5:
        setTimeout(function () {
          response5();
        }, 1500);
        break;
      default:
    }
  }

}

/**
* Function to run after answering the connection acceptance question. (Q1)
*/
function response1() {
  if(terminalEntered == 'y') {
    question++; // now at question = 2
    helpMsg = "Nothing to help with right now.";

    // timed typing display
    typeInTerminal("Establishing connection to user UNKNOWN . . . .");
    setTimeout(function () {
      typeInTerminal("Connection successfully established!");
      setTimeout(function () {

        setTimeout(function () {
          $(".terminal-text").append(terminalUser);
          $(".terminal-text").find("li:last").append("-------------------------------------------");
          setTimeout(function () {
            $(".terminal-text").append(terminalUser);
            $(".terminal-text").find("li:last").append("Messaging Service started with user UNKNOWN");
            setTimeout(function () {
              $(".terminal-text").append(terminalUser);
              $(".terminal-text").find("li:last").append("-------------------------------------------");
              $(".terminal-text").append(terminalUser);
            }, 40);
          }, 40);
        }, 40);

        setTimeout(function () {
          receiveMessage("Hello?");
          helpMsg = "Try saying hello back?";
          setTimeout(function () {
            helpButtonGlow();
          }, 1500);
        }, 3500);

      }, 2500);
    }, 3500);

  } else if(terminalEntered == 'n') {
    typeInTerminal("Connection refused");
    setTimeout(function () {
      typingSpeed = 100;
      typeInTerminal("shutdown");
      setTimeout(function () {
        typingSpeed = 35;
        typeInTerminal("Goodbye");
        setTimeout(function () {
          shutDownAndGoHome();
        }, 1000);
      }, 1500);
    }, 1000);
  } else {
    typeInTerminal("Invalid input. Enter 'y' or 'n'");
  }
}

/**
* Function to run after answering mysterious greeting. (Q2)
*/
function response2() {
  question++;
  if(terminalEntered.indexOf("hey") > -1 || terminalEntered.indexOf("hi") > -1 ||
        terminalEntered.indexOf("hello") > -1){
    console.log("response2 passed");
    receiveMessage("I know who you are");
    setTimeout(function () {
      receiveMessage("You're Phiber Optik");
    }, 1500);
  } else {
    receiveMessage("I'm not quite sure what you're saying, but whatever");
    setTimeout(function () {
      setTimeout(function () {
        receiveMessage("You're Phiber Optik");
      }, 2500);
      receiveMessage("I know who you are");
    }, 2500);
  }
  setTimeout(function () {
    helpMsg = "What?! Are you really Phiber Optik? The ex-Legion of Doom hacker? Let " +
    	"him know if you are or not.";
    helpButtonGlow();
  }, 4000);
}

/**
* Function to run after responding to identity accusation. (Q3)
*/
function response3() {

	var answered = false;
  var finalTimeout = 6000;

	if(terminalEntered.indexOf("no") > -1 || terminalEntered.indexOf("wrong") > -1) {
		console.log("this guy is wrong");
		answered = true;
		setTimeout(function() {
			receiveMessage("I know it's you. I've tracked the activity on this terminal " +
				"for weeks");
		}, 1500);
	} else if(terminalEntered.indexOf("yes") > -1 || terminalEntered.indexOf("true") > -1 ||
			terminalEntered.indexOf("right") > -1 || terminalEntered.indexOf("yea") > -1) {
		answered = true;
    finalTimeout = 2000;
		console.log("this guy is right");
		receiveMessage("I knew it");
	} else {
		receiveMessage("Are you or are you not Phiber Optik?");
	}

	if(answered) {
		setTimeout(function() {
			receiveMessage("We need to talk");
			helpMsg = "Don't you want to know who this is? You should ask.";
			question++;
			setTimeout(function() {
				helpButtonGlow();
			}, 1500);
		}, finalTimeout);
	}
}


/**
*	Function to run after responding to "we need to talk" (Q4)
*/
function response4() {

	if(terminalEntered.indexOf("who") > -1) {
    // who is this?
		setTimeout(function() {
			receiveMessage("Erik Bloodaxe");
			setTimeout(function() {
				receiveMessage("Your old \"friend\" from The Legion of Doom.");
        helpMsg = "Maybe you should try asking what he wants?";
        setTimeout(function () {
          helpButtonGlow();
        }, 1000);
			}, 1500);
		},2000);
	} else {
    // what does he want?
    setTimeout(function () {
      receiveMessage("Things just haven't been the same since we tossed you out of the group.");
      setTimeout(function () {
        receiveMessage("We want you to come back.");
        setTimeout(function () {
          receiveMessage("We had our disagreements, but we did good work.");
          setTimeout(function () {
            receiveMessage("Will you join us once again?");
            helpMsg = "Are you willing to once again team up with the group of hackers that kicked you out?";
            question++;
            setTimeout(function () {
              helpButtonGlow();
            }, 2500);
          }, 2000);
        }, 1500);
      }, 2500);
    }, 1500);
  }

}

/**
* Function to run after responding to the "rejoin the group" offer
*/
function response5() {
  if(terminalEntered.indexOf("yes") > -1 || terminalEntered.indexOf("ok") > -1 || terminalEntered.indexOf("yea") > -1 ||
      terminalEntered.indexOf("sure") > -1) {
    receiveMessage("I'm glad to hear it. I'll let the others know.");
    setTimeout(function () {
      receiveMessage("We'll contact you soon.");
      // shutdown?
      setTimeout(function () {
        closeTerminaAfterRejoin();
      }, 4000);
    }, 2500);

  } else if(terminalEntered.indexOf("no") > -1) {
    receiveMessage("That's unfortunate.");
    setTimeout(function () {
      receiveMessage("Surely you know that we can't let you continue to use this terminal.");
      setTimeout(function () {
        receiveMessage("Goodbye");
        setTimeout(function () {
          // hacker spam!
          $(".terminal-text").append("<li></li>");
          appendGibberish();
        }, 3500);
      }, 3500);
    }, 2500);
  } else {
    receiveMessage("I'm not sure what you mean by that answer. We could really use you.");
    setTimeout(function () {
      receiveMessage("Will you join?");
    }, 2500);
  }
}

/**
* Oh no! He's hacking you!!!
*/
function appendGibberish() {
  var limit = 1500;
  var curr = 0;
  $(".terminal-input").remove();
  var gibTyper = setInterval(function () {
    if(curr >= limit) {
      clearInterval(gibTyper);
      //empty the terminal content
      while($(".terminal-text").children().length > 0) {
        $(".terminal-text").find("li:last").remove();
      }
      // create corrupted message
      $(".terminal-text").append("<li></li>");
      $(".terminal-text").css({"text-align": "center"});
      $(".terminal-text").find("li:last").css({height: "8em", "margin-top": "210px"});
      // zalgo
      $(".terminal-text").find("li:last").append("  F̡̂ͬ̌ͭ͊́ͩ̉ͣ̑͝͠҉̛̦̩̯͎̩̥̩̘͎I̊͛̎̉ͭ̋̿ͣ̆ͧͪ̍͊̃̿̇̚͜͏̤̳̘̞̱̤̙͖̗̹͚̙̮͟͝ͅĻ͖̳̰͙̥̟̙̰̥̳̱̮͇̟͂͛ͦ̿͂̆̄̔̓̀ͣ͠͝Ê̶͛̏̊ͪͨ͛̇͏̶̨̹̻͙̭͔̬͓͓̣̥͔̼̟̖̣͔̞͎͇͝S̃̄̓̔ͬ͌҉̭͉̥̦̠͚̘͙̝̟͓͓̀͟͟Y̶̴̠̩̼̼̤̓͌̐̎̃̈̄́ͣ̈͊̀̐̽̈́̄͋̆̀S̯̳̦̱͖͎̠̞̪̟̻̿ͩ̉͂̽̅ͪ́͟͜͞T̨̹̩͎̯̜̬͓̱̞̗͇͕̦̠̗̪̀ͣ̍ͪ͂̑̆̀̚̕͢E̱͎͖̭̯̩̮͕̯̺̖̦͆̉͂́̾͗̓͒̆̓̏̊̕͢͝M̵̧͔͔̤̭̣̝͌̇ͦ̒̈͒̆͞͠ ̵̧̬̜̗̭̱͍̺̤̗̟͖̘̗̙̤̺̭̯͑͒ͬ̌̾ͭ͊̅̅ͯ̌̈́ͫͦͩ̃ͯ͋̒́H̵̨̘̺͖͖̟̲͙̼̙̳̀̽̐̌̈́ͣͤͥ͆͘ͅͅA̛͈̭̣̥̝͉̠͓̺̬̗͕̣̙̙̭̟̅͐ͦ̉͟ͅS̻̣̜̠̭̟̗͚̰̝̯̙̠̻̪̹͎ͪ͆ͨ͑̅͜͡ ̾ͣ̏ͦ͂ͫͩͦ̈͊̓̒͐̾͌̈́̒ͧ̚͏͙̙̩͙̮̹̱̭̫̗͙̗̜̥͜ͅBͪ̉͛̔̿̀̓̓̀̾̔̅ͩ̋̏̓̀҉̴̢̙͇͈͉͇̖͡Ḛ̡̪̙̦̞͎͎͉͕͉̣̯͙̦͉̖͓̐ͩ̊̏́͠͠ͅͅE̢̩̦̯̙̜̰̭͇̼̥͕̺̯̘͉ͤ̾͋́ͯ̑̎̂͆̒̂͂N̽ͤͩ̑̆̂͋ͪ̿̿ͯͦ̍҉̨̥̭̜̮̟͚͉̖̫̺̠̲̖̙͕̫͘͘ ̨͖̣͉̫̩̣̣̗͍ͯ̄̀ͩͮͤͫ̃̋ͨͥ͂̆ͮͭͩ̏ͯ͜͡͠C̴̢̳̮̯̲̖͍̦͇̟̭̣̳̲̭̩̝̖̓̽̓ͭ͂͌͗ͧ͒ͥ͋ͭ̽̔͛̀̊̚͡͞O͉̝̝̩͙̦̯̠̟̰̹̮̙̗̬̣̳̹ͩ̑̐̓ͧ̐ͨͦͤ̈̚͢͡R̛̦͓͙̝͉̤̐ͤͯ̿̌͊̉͠Ṟ̶̷̬̤̮̝̮̹̠̜͓̖̪̘͐̈ͨ͆̋̏̄̂ͧͦ̓̿̓ͬͣ̐̇̈͠Ư̡̈͋̿̍ͭͯ́́̋ͤ̊̌͛́ͩ͟҉̦̯̖͚͈̯͇̪̘͎͇̼̹P̶̵̸̥̼̺͈̬͕͖̦̠͕̲͖͈̘̲̹̈̒ͤ̄͒ͩͤͫ̾̅̐̂ͬ͛̃̋̚̕͟T̴͉̫̰̲͕̳͐ͮ̈̒ͣ͒̓̌͊ͭ͂ͫͩ̋̎ͭ̀̚͜͡Ȩ̲̼̝͎̮͚̪̥͔͈͓ͭ̿͗ͮͮ̃̾̕͞Ḑ̛̥͔̮͓͇̬͖̺̭͛̆͊̾̿̈́̋̊ͣ̀̏̔̔͗̓͒̄͗ͪ͜͡ͅ  ");

      setTimeout(function () {
        closeTerminaAfterHack();
        //shutDownAndGoHome();
      }, 5500);
    }
    if(curr % 62 === 0 && curr > 0) {
      $(".terminal-text").find("li:last").append("<br />");
    }
    $(".terminal-text").find("li:last").append(String.fromCharCode(Math.floor((Math.random() * 126))));
    $(".terminal-text").find("li:last").append(String.fromCharCode(Math.floor((Math.random() * 126))));
    updateScroll();
    curr++;
  }, 2);
}

/**
* Exit the terminal and display a message after you got hacked to pieces.
*/
function closeTerminaAfterHack() {
  if(terminalOpened) {
    $(".terminal-window").animate({opacity: "0", height: "0px"});
    $(".intro-text-content").css({opacity: "0"});
    $(".intro-text-intro").css({display: "none"});
    $(".replay-btn").css({display: "inline", opacity: "0"});
    setTimeout(function () {
      $(".intro").css({display: "inline"});
      $(".intro").animate({opacity: "1"});
      $(".intro-text-content").text("The terminal was hacked and the filesystem destroyed, leaving the workstation " +
        "useless for the foreseeable future. You shut it down and slowly leave the dark building. Did you make the right choice?");
      $(".terminal-window").css({display: "none"});
      $(".intro-text-content").animate({opacity: "1"});
      $(".replay-btn").animate({opacity: "1"});
    }, 1500);
  }
}

/**
* Exit the terminal and display a message after rejoining.
*/
function closeTerminaAfterRejoin() {
  if(terminalOpened) {
    $(".terminal-window").animate({opacity: "0", height: "0px"});
    $(".intro-text-content").css({opacity: "0"});
    $(".intro-text-intro").css({display: "none"});
    $(".replay-btn").css({display: "inline", opacity: "0"});
    setTimeout(function () {
      $(".intro").css({display: "inline"});
      $(".intro").animate({opacity: "1"});
      $(".intro-text-content").text("You agreed to rejoin your old group of hackers. After shutting down the terminal you " +
        " leave the dark building. As you begin walking home, you can't help but wonder if you made the right choice.");
      $(".intro-text-content").animate({opacity: "1"});
      $(".replay-btn").animate({opacity: "1"});
    }, 1500);
  }
}

/**
* Initializes the intro texts.
*/
function createIntroText() {
  introText[0] = "You are a student at the University of Utah, one of relatively few students that has unrestricted access " +
    "to a terminal with an ARPANET connection.";
  introText[1] = "With the use of this technology, you have been collaborating on a project with students all " +
    "the way in California at UCLA. (The possibilities of modern tech!)";
  introText[2] = "Working on this project has required you to spend many hours secluded in the terminal room. ";
  introText[3] = "Over time, you have come to revel in this solitude.";
  introText[4] = "However, the long hours often leave you exhausted.";
  introText[5] = "You are hardly surprised when you find yourself lifting your head off of the desk, waking from " +
    "an unplanned nap.";
  introText[6] = "It's late. The building is dark and empty.";
  introText[7] = "The room is lit solely by the pale glow of the terminal.";
  introText[8] = "You gather your things and approach the terminal to shut it down as you prepare to leave.";
  introText[9] = "As you reach for the power switch, a mysterious message pops up on the screen...";
}

/**
* Animates the help button slightly to draw attention when help information
* is updated.
*/
function helpButtonGlow() {
  $(".help-btn").animate({width: "5em", backgroundColor: "#00ad5f"});
  $(".help-btn").animate({width: "4em", backgroundColor: "#4d4d4d"});
}

/**
* Moves the terminal scroll to the bottom whenever a line is added
* Needs to be called after each time a function appends to the terminal
*/
function updateScroll() {
  $(".terminal-text").scrollTop($(".terminal-text")[0].scrollHeight);
}

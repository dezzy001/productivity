// html div elements



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    //when logged in ########################################
    if(user != null){
      //login setup ##################################################
      loadingBarOff();
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("create_div").style.display = "none";
      document.getElementById("settings_div").style.display = "none";
      document.getElementById("logout_ele").style.display ="block";
      var user = firebase.auth().currentUser;


      //login data management #####################################
      var displayName = user.displayName;
      var email_id = user.email;
      var uid = user.uid;
      newUserData(uid, email_id,displayName);
      // document.getElementById("user_para").innerHTML = "Welcome " + email_id;
      document.getElementById("welcome_ele").style.display ="block";
      document.getElementById("welcome_ele").innerHTML= email_id;

      //logged in variables
      var userDifficultydb = db.child("users/"+uid+"/difficulty");

      var currentMaxMin; // in mins

      //timer logic ##############################################
      //initial conditions
      userDifficultydb.on('value',function(snapshot){
        if(snapshot.exists()){
          var difficulty = snapshot.val();
          if(difficulty == EASY){
            currentMaxMin = difficultySettings.easy.min;
          }else if(difficulty == MED){
            currentMaxMin = difficultySettings.medium.min;
          }else if(difficulty == HARD){
            currentMaxMin = difficultySettings.hard.min;
          }

          // grabed difficulty data from firebase!
          loading = false;
          display.innerHTML= string_ready;

          //change colour of timer box border based on difficulty
          changeTimerboxBorder(difficulty);
        }
      });

      //Clicking button events for timer---------------------------------
      timerButton.addEventListener("click", function(){
        if(clicked == false && loading == false){
          startTimer(timerButton,currentMaxMin);
        }

      });
      timerStopButton.addEventListener("click", function(){
        if(clicked == true && loading == false){
            stopTimer();
        }

      });

      timerResetButton.addEventListener("click",function(){
        if(clicked == true && loading == false){
          resetTimer(currentMaxMin);
        }

      });

      timerSettingButton.addEventListener("click",function(){
        settingsOn();
      });



      //settings logic #############################################
      //keep the button highlighted on the selected difficulty
      userDifficultydb.on('value',function(snapshot){
        if(snapshot.exists()){
          var difficulty = snapshot.val();
          difficultyFormat(difficulty);
          displayInfo(difficulty);
        }
      });

      //set up events-------------------------------------------------
      easyButton.addEventListener("click",function(){
        info_div.style.borderColor = "rgba(33, 201, 0, 0.5)";
        // difficultyFormat(EASY);
        setDifficultyData(uid,EASY);

      });
      mediumButton.addEventListener("click",function(){
        info_div.style.borderColor = "rgba(255, 144, 0, 0.5)";
        // difficultyFormat(MED);
        setDifficultyData(uid,MED);


      });
      hardButton.addEventListener("click",function(){
        info_div.style.borderColor = "rgba(230, 0, 0, 0.7)";
        // difficultyFormat(HARD);
        setDifficultyData(uid,HARD);

      });
    }

    //when not logged on #########################################
  } else {
    // No user is signed in.
    loadingBarOff();
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("create_div").style.display = "none";
    document.getElementById("settings_div").style.display = "none";
    document.getElementById("logout_ele").style.display ="none";

    document.getElementById("welcome_ele").style.display ="none";
  }
});


//two functions below for account creations
function create_div(){
  document.getElementById("create_div").style.display = "block";
  document.getElementById("login_div").style.display = "none";
}
function back(){
  document.getElementById("create_div").style.display = "none";
  document.getElementById("login_div").style.display = "block";
}


function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
    loadingBarOn();
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    loadingBarOff();
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function create(){
  var userEmail = document.getElementById("email_field_create").value;
  var userPass = document.getElementById("password_field_create").value;
  loadingBarOn();
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    loadingBarOff();
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

//for testing only###############################################
function skip(){
  //test email
  var userEmail = "dezzy001@gmail.com";
  var userPass = "qwerty123";
  loadingBarOn();
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    loadingBarOff();
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
}

function logout(){
  stopTimer();

  firebase.auth().signOut();

}

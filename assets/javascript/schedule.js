var config = {
    apiKey: "AIzaSyBtaGiFrqV9nBWgDIEclI1HSpphT9iGCOg",
    authDomain: "trainscheduler-b2a7e.firebaseapp.com",
    databaseURL: "https://trainscheduler-b2a7e.firebaseio.com",
    projectId: "trainscheduler-b2a7e",
    storageBucket: "",
    messagingSenderId: "968256562058"
  };
  
  firebase.initializeApp(config);

var database.firebase.database();

$("#submit").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#train-name").val().trim();
  var trainDest = $("#destination").val().trim();
  var fristTrainTime = $("#first-train").val().trim();
  var trainFreq = $("#frequency").val().trim();

  database.ref().push({
    traiName: trainName,
    trainDestination: trainDest,
    firstTrainTime: firstTrainTime,
    trainFrequesncy: trainFreq
  });

});

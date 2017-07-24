var config = {
    apiKey: "AIzaSyBtaGiFrqV9nBWgDIEclI1HSpphT9iGCOg",
    authDomain: "trainscheduler-b2a7e.firebaseapp.com",
    databaseURL: "https://trainscheduler-b2a7e.firebaseio.com",
    projectId: "trainscheduler-b2a7e",
    storageBucket: "",
    messagingSenderId: "968256562058"
  };
  
  firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#train-name").val().trim();
  var trainDest = $("#destination").val().trim();
  var firstTrainTime = $("#first-train").val().trim();
  var trainFreq = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: firstTrainTime,
    frequency: trainFreq
  };

  database.ref().push(newTrain);


  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;

  var tFrequency = parseInt(trainFreq);
  

  var firstTrain = moment(firstTrainTime, "HH:mm").subtract(1, "years");

  var currentTime = moment();

  var diffTime = moment().diff(moment(firstTrain), "minutes");

  var tRemainder = diffTime % tFrequency;

  var tMinutesTillTrain = tFrequency - tRemainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + tMinutesTillTrain + "</td>");


});



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
  var fristTrainTime = $("#first-train").val().trim();
  var trainFreq = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: firstTrainTime,
    frequesncy: trainFreq
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var trainName = childSnapshot.val().newTrian.name;
  var trainDest = childSnapshot.val().newTrain.destination;
  var firstTrainTime = childSnapshot.val().newTrain.time;
  var trainFreq = childSnapshot.val().newTrain.frequency;

  var tFrequency = parseInt("tranFreq");

  var firstTrain = moment(firstTrainTime, "HH:mm").subtract(1, "years");

  var currentTime = moment();

  var diffTime = moment().diff(moment(firstTrain), "minutes");

  var tRemainder = diffTime % tFrequency;

  var tMinutesTillTrain = tFrequency - tRemainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td>");


});



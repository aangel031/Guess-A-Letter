/*global $*/
/*global i*/
$(document).ready(function() {
    var puzzle = [''];
    var display = [];
    var players = [];
    var guess;
    var name;

    $("#display").text(display);

    function guess_a_letter(guess, originalDisplay) {
        for (i = 0; i < puzzle.length; i++) {

            if (puzzle[i] === guess) {
                display[i] = guess;
            }
            $("#display").text(display);
        }
    }

    function guessIsWrong(arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
        }
        return true;
    }

    function getCurrentPlayerIndex() {
        for (var i = 0; i < players.length; i++) {
            if (players[i].currentTurn === true) {
                return i;
            }
        }
    }

    function changePlayerTurn() {
        var currentPlayerIndex = getCurrentPlayerIndex();
        var nextPlayerIndex = currentPlayerIndex + 1;

        if (nextPlayerIndex === players.length) {
            nextPlayerIndex = 0;
        }

        players[currentPlayerIndex].currentTurn = false;
        players[nextPlayerIndex].currentTurn = true;

        resetPlayerBoard();
    }

    function resetPlayerBoard() {
        var playersList = $("#playersList");
        playersList.html('<div id="playersList"></div>');

        for (var i = 0; i < players.length; i++) {
            if (players.currentTurn === true) {
                playersList.append("<p style='color: green;'>" + players[i].name + '<span class="score">' + players[i].currentScore + '</span>' + "</p>");
            }
            else {
                playersList.append("<p>" + players[i].name + '<span class="score">' + players[i].currentScore + '</span>' + "</p>");
            }
        }
    }
    
    function checkForWinner() {
        var highScore = 0;
        var winner;
        
        for (var i = 0; i < players.length; i++) {
            if (players[i].currentScore >= highScore) {
                highScore = players[i].currentScore;
                winner = players[i].name;
            }
        }
        $("#display").text("Winner: " + winner);
    }

    $("#guess").click(function() {

        $("#error").css("display", "none");

        if (players.length > 0) {
            var original = display.slice(0);
            var currentPlayerIndex = getCurrentPlayerIndex();
            var currentPlayer = players[currentPlayerIndex];
            var currentPlayerScore = currentPlayer.currentScore;

            guess = prompt(currentPlayer.name + ": " + "Guess a letter!");

            guess_a_letter(guess, display);

            if (guessIsWrong(original, display)) {
                $("#error").fadeIn(200);
                $("#error").text("Try Again!");
                $("#error").css("color", "red");
                $("#error").fadeOut(2000);
            }

            else {
                currentPlayer.currentScore = parseInt(currentPlayerScore) + 5;
                resetPlayerBoard();
            }

        }

        else if (players.length < 1) {
            alert("At least 1 player is required!");
        }
        if(guessIsWrong(puzzle, display)) {
            checkForWinner();
        }
        
        changePlayerTurn();
        resetPlayerBoard();
    });

    $("#btnAddPlayer").click(function() {
        if (players.length < 4) {
            name = prompt("Enter Player Name: ");

            var newPlayer = {
                name: name,
                currentScore: 0,
                currentTurn: false
            };

            players.push(newPlayer);

            $("#playersList").append("<p>" + name + '<span class="score">' + newPlayer.currentScore + '</span>' + "</p>");

            if (players.length > 3) {
                $("#txtMax").text("(MAX)");
            }
        }
        else if (players.length === 4) {
            alert("Max Number of Players!");
            $("#txtMax").text("(MAX)");
        }
    });
    $("#btnStartGame").click(function() {
        puzzle = [];
        display = [];

        if (players.length > 0) {

            $("#txtEntPuzzle").fadeOut(200);
            $("#newPuzzleHolder").fadeIn(200);

            $("#btnSetPuzzle").click(function() {
                var newPuzzle = $("#newPuzzle").val();

                for (var i = 0; i < newPuzzle.length; i++) {
                    puzzle[i] = newPuzzle[i];
                    display[i] = "_";
                }
                $("#newPuzzleHolder").fadeOut(200);

                players[0].currentTurn = true;

                $("#display").fadeIn(200);
                $("#display").text(display);
            });
        }
        else if (players.length < 1) {
            alert("At least 1 player is required to start the game!");
        }
        $("#display").fadeIn(200);
        $("#display").text(display);
        resetPlayerBoard();
    });
});
var app = angular.module('tictactoe', ['firebase']);
app.controller('TicTacToeCtrl', function Chat($scope, $firebase) {
  // Get a reference to the Firebase
  var boardFirebaseRef = new Firebase('https://angularFireTests.firebaseio-demo.com/tictactoe');

  // Get the board as an AngularFire sync object
  var boardSync = $firebase(boardFirebaseRef);

  // Get the board as an AngularFire object
  $scope.boardObject = boardSync.$asObject();

  // Create a 3-way binding to Firebase
  $scope.boardObject.$bindTo($scope, 'board');

  // Verify that $inst() works
  verify($scope.boardObject.$inst() === boardSync, 'Something is wrong with $FirebaseObject.$inst().');

  // Initialize $scope variables
  $scope.whoseTurn = 'X';


  /* Resets the tictactoe Firebase reference */
  $scope.resetRef = function () {
    ["x0", "x1", "x2"].forEach(function (xCoord) {
      $scope.board[xCoord] = {
        y0: "",
        y1: "",
        y2: ""
      };
    });
  };

  /* Makes a move at the current cell */
  $scope.makeMove = function(rowId, columnId) {
    // Only make a move if the current cell is not already taken
    if ($scope.board[rowId][columnId] === "") {
      // Update the board
      $scope.board[rowId][columnId] = $scope.whoseTurn;

      // Change whose turn it is
      $scope.whoseTurn = ($scope.whoseTurn === 'X') ? 'O' : 'X';
    }
  };

  /* Destroys all AngularFire bindings */
  $scope.destroy = function() {
    $scope.boardObject.$destroy();
  };

  /* Logs a message and throws an error if the inputted expression is false */
  function verify(expression, message) {
    if (!expression) {
      console.log(message);
      throw new Error(message);
    }
  }
});
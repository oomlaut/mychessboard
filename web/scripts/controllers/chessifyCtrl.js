'use strict';

function clone(obj){
	var copy = {};
	for(var i in obj){
		copy[i] = obj[i];
	}
	return copy;
}

function ChessifyCtrl($scope, $sce){

	$scope.delimiter = '_';

	function init(){
		$scope.backup = false;
		$scope.moving = false;
		$scope.confirm = false;
		$scope.origin = false;
		$scope.turn = {
			'moves': [],
			'pieces': []
		};
		return true;
	};

	init();

	$scope.board = {
		labels:{
			ranks:['1','2','3','4','5','6','7','8'],
			files:['a','b','c','d','e','f','g','h']
		},
		base:{
			a: {
				1:'&#9814;',
				2:'&#9817;',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'&#9823;',
				8:'&#9820;'
			},
			b: {
				1:'&#9816;',
				2:'&#9817;',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'&#9823;',
				8:'&#9822;'
			},
			c: {
				1:'&#9815;',
				2:'&#9817;',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'&#9823;',
				8:'&#9821;'
			},
			d: {
				1:'&#9813;',
				2:'&#9817;',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'&#9823;',
				8:'&#9819;'
			},
			e: {
				1:'&#9812;',
				2:'&#9817;',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'&#9823;',
				8:'&#9818;'
			},
			f: {
				1:'&#9815;',
				2:'&#9817;',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'&#9823;',
				8:'&#9821;'
			},
			g: {
				1:'&#9816;',
				2:'&#9817;',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'&#9823;',
				8:'&#9822;'
			},
			h: {
				1:'&#9814;',
				2:'&#9817;',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'&#9823;',
				8:'&#9820;'
			},
			player: "white"
		},
		current: {},
	};

	$scope.board.labels.ranks = $scope.board.labels.ranks.reverse();

	// this should be populated by the 'current' node of the object eventually
	angular.copy($scope.board.base, $scope.board.current);


	$scope.players = {
		"white": 'playerID001',
		"black": 'playerID002'
	};

	$scope.pieces = [];

	$scope.moves = [];

	$scope.char = function(unicode){
		return $sce.trustAsHtml(unicode);
	}

	$scope.track = function(file, rank){
		if($scope.board.current[file][rank] || $scope.moving){
			// back up the current state of the board once.
			if(!$scope.backup){
				$scope.backup = {};
				angular.copy($scope.board.current, $scope.backup);
			}

			var ords = file + $scope.delimiter + rank;
			var value = $scope.board.current[file][rank]

			if (!$scope.origin) {
				$scope.moving = true;
				$scope.origin = {
					'ords': ords,
					'value': value
				};
			} else if (ords == $scope.origin.ords){
				return $scope.cancel();
			} else {
				var fromOrdParts = $scope.origin.ords.split($scope.delimiter);

				if(value != false){
					$scope.turn.pieces.push(value);
				}

				$scope.turn.moves.push($scope.origin.ords + '/' + ords);

				$scope.board.current[file][rank] = $scope.origin.value;

				$scope.board.current[fromOrdParts[0]][fromOrdParts[1]] = false;


				$scope.origin = false;

				$scope.confirm = true;
			}
		}
	};

	$scope.submit = function(){
		//validate data, send to service, restore board appearance

		// append taken pieces onto into the corral
		$scope.pieces = $scope.pieces.concat($scope.turn.pieces);
		console.log('pieces',$scope.pieces);

		// append move(s) onto the history object
		$scope.moves = $scope.moves.concat($scope.turn.moves);
		console.log('moves',$scope.moves);

		// change player turn
		$scope.board.current.player = ($scope.board.current.player === 'white') ? 'black' : 'white' ;

		return init();
	};

	$scope.cancel = function(){
		angular.copy($scope.backup, $scope.board.current);
		return init();
	};

	$scope.reset = function(){
		var response = confirm("Are you sure?");
		if(response){
			angular.copy($scope.board.base, $scope.board.current);
			// send the revised
			return init();
		}
	}
};

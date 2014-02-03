'use strict';
function ChessifyCtrl($scope, $sce){

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
			}
		},
		current: {}
	};

	$scope.board.labels.ranks = $scope.board.labels.ranks.reverse();

	$scope.player = "white";

	$scope.pieces = {
		white:[],
		black:[]
	};

	$scope.moves = [];

	$scope.char = function(unicode){
		return $sce.trustAsHtml(unicode);
	}

	$scope.track = function(file, rank){
		console.log('arguments',arguments);
	};

};

'use strict';
function ChessifyCtrl($scope){

	$scope.board = {
		labels:{
			ranks:[1,2,3,4,5,6,7,8],
			files:['a','b','c','d','e','f','g','h']
		},
		base:{
			a: {
				1:'white rookA',
				2:'white pawnA',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'black pawnA',
				8:'black rookA'
			},
			b: {
				1:'white knightB',
				2:'white pawnB',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'black pawnB',
				8:'black knightB'
			},
			c: {
				1:'white bishopC',
				2:'white pawnC',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'black pawnC',
				8:'black bishopC'
			},
			d: {
				1:'white queenD',
				2:'white pawnD',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'black pawnD',
				8:'black queenD'
			},
			e: {
				1:'white kingE',
				2:'white pawnE',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'black pawnE',
				8:'black kingE'
			},
			f: {
				1:'white bishopF',
				2:'white pawnF',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'black pawnF',
				8:'black bishopF'
			},
			g: {
				1:'white knightG',
				2:'white pawnG',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'black pawnG',
				8:'black knightG'
			},
			h: {
				1:'white rookH',
				2:'white pawnH',
				3:false,
				4:false,
				5:false,
				6:false,
				7:'black pawnH',
				8:'black rookH'
			}
		},
		current: {}
	};


	$scope.pieces = {
		white:[],
		black:[]
	};

	$scope.moves = [];

};

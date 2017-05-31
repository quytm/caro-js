/**
 * Created by tmq on 20/05/2017.
 */
'use strict';

var socket = io('/');

var size = 20;
SIZE_CELL = SIZE_BOARD / size;

var board = new Board();
var player = new Player(TYPE_X);
var playerFriend = new Player(TYPE_O);

var matrix = new Array(size);

var turn = 0;

var lineWin = {};

var playingGame = false;
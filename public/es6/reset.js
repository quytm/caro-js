/**
 * Created by tmq on 20/05/2017.
 */

'use strict';

var reset = () => {
    SIZE_CELL = SIZE_BOARD / size;

    board = new Board();
    player.tickMgr = [];
    playerFriend.tickMgr = [];

    matrix = new Array(size);
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(size);
    }

    lineWin = {};

    playingGame = true;
};
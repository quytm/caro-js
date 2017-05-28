/**
 * Created by tmq on 20/05/2017.
 */

'use strict';

var reset = () => {
    SIZE_CELL = SIZE_BOARD / size;

    board = new Board();
    player = new Player(TYPE_X);
    playerFriend = new Player(TYPE_O);

    matrix = new Array(size);
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(size);
        // for (let j = 0; j<matrix[i].length; j++) {
        //     // console.log(matrix[i][j]);
        //     matrix[i][j] = '';
        // }
    }

    lineWin = {};
};
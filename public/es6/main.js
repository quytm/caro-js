/**
 * Created by tmq on 01/05/2017.
 *
 *
 */

'use strict';

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = SIZE_BOARD;
canvas.height = SIZE_BOARD;
// document.body.appendChild(canvas);
const id_client = "this_is_id";


/**
 * Document is ready
 */
$(document).ready(function () {
    $('#btn-stop-game').click(() => {
        socket.emit('stop_game');
    });

    $('#btn-restart-game').click(() => {
        socket.emit('restart_game');
        reset();
        // render();
        turn = 1;
    });



    $('#btn-start-game').click(() => {
        document.body.appendChild(canvas);
        reset();
        render();

        socket.emit('start_game');

        $('#btn-start-game').prop('disabled', true);
    });

    socket.emit('new_player', {id: id_client});
});
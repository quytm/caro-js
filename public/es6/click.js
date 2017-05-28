/**
 * Created by tmq on 20/05/2017.
 */

'use strict';

canvas.addEventListener('click', (event) => {
    let mousePos = getMousePos(canvas, event);

    // if (turn === 1) {
    //     socket.emit('click', mousePos);
    //     turn *= -1;
    //     matrix[mousePos.x][mousePos.y] = player.type;
    //     console.log('turn = ' + turn);
    // } else {
    //     return;
    // }

    if (!allowClick(mousePos.x, mousePos.y)) return;

    socket.emit('click', mousePos);
    turn *= -1;
    matrix[mousePos.x][mousePos.y] = player.type;
    console.log('turn = ' + turn);

    player.tickMgr.push(new Tick(mousePos.x, mousePos.y));
    player.render();

    function getMousePos(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        return {
            x: Math.floor(x / SIZE_CELL),
            y: Math.floor(y / SIZE_CELL)
        };
    }

    if (checkWin(mousePos.x, mousePos.y, player.type)) {
        board.drawLineWin();
        socket.emit('player_win', lineWin);
    }

}, false);


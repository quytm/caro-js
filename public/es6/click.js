/**
 * Created by tmq on 20/05/2017.
 */

'use strict';

canvas.addEventListener('click', (event) => {
    let mousePos = getMousePos(canvas, event);

    if (!allowClick(mousePos.x, mousePos.y)) return;

    socket.emit('click', mousePos);
    turn *= -1;
    matrix[mousePos.x][mousePos.y] = player.type;

    player.tickMgr.push(new Tick(mousePos.x, mousePos.y));

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
        socket.emit('player_win', lineWin);
    }

}, false);


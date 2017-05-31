/**
 * Created by tmq on 20/05/2017.
 */

'use strict';

var render = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    board.render();

    player.render();
    playerFriend.render();

    board.drawScore();
    board.drawWin();

    requestAnimationFrame(render);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
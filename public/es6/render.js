/**
 * Created by tmq on 20/05/2017.
 */

'use strict';

var render = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    board.render();

    player.render();
    playerFriend.render();
};
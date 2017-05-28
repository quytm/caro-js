/**
 * Created by tmq on 20/05/2017.
 */

'use strict';


var Tick = function (x, y) {

    this.x = x;
    this.y = y;

    let SPACE = 2;

    this.render = (type) => {
        let xPos = x * SIZE_CELL;
        let yPos = y * SIZE_CELL;
        if (type === TYPE_O) {
            ctx.drawImage(oImg, xPos + SPACE, yPos + SPACE, SIZE_CELL - 2 * SPACE, SIZE_CELL - 2 * SPACE);
        } else if (type === TYPE_X) {
            ctx.drawImage(xImg, xPos + SPACE, yPos + SPACE, SIZE_CELL - 2 * SPACE, SIZE_CELL - 2 * SPACE);
        }
    }

};
/**
 * Created by tmq on 20/05/2017.
 */

var Board = function () {
    this.message = '';

    this.render = () => {
        ctx.strokeStyle = COLOR_LINE;
        for (let i = 1; i < size; i++) {
            ctx.beginPath();
            ctx.moveTo(i * SIZE_CELL, 0);
            ctx.lineTo(i * SIZE_CELL, SIZE_BOARD);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * SIZE_CELL);
            ctx.lineTo(SIZE_BOARD, i * SIZE_CELL);
            ctx.stroke();
        }
    };

    this.drawWin = () => {
        if (lineWin.start === undefined) return;
        ctx.fillStyle = COLOR_LINE_WIN;
        ctx.beginPath();
        ctx.moveTo(lineWin.start.x * SIZE_CELL + SIZE_CELL / 2, lineWin.start.y * SIZE_CELL + SIZE_CELL / 2);
        ctx.lineTo(lineWin.end.x * SIZE_CELL + SIZE_CELL / 2, lineWin.end.y * SIZE_CELL + SIZE_CELL / 2);
        ctx.stroke();

        ctx.fillStyle = COLOR_PLAYER;
        ctx.fillText(this.message, SIZE_BOARD/3, SIZE_BOARD/2);
    };

    this.drawScore = () => {
        ctx.fillStyle = COLOR_PLAYER;
        ctx.fillText(player.score, 10, 15);

        ctx.fillStyle = COLOR_PLAYER_FRIEND;
        ctx.fillText(playerFriend.score, 35, 15);
    }
};
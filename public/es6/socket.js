/**
 * Created by tmq on 20/05/2017.
 */

socket.on('click', (data) => {
    turn *= -1;
    console.log('socket on: turn = ' + turn);
    playerFriend.tickMgr.push(new Tick(data.x, data.y));
    playerFriend.render();
    matrix[data.x][data.y] = playerFriend.type;
});

socket.on('new_player', (data) => {
    console.log('new player in room ' + data.room);
});

socket.on('ready_play', (data) => {
    console.log('ready_play: turn = ' + data.turn);
    if (data.turn === 1) turn = 1;
    else if (data.turn === 2) turn = -1;
});

socket.on('player_win', (data) => {
    lineWin = data;
    board.drawLineWin();
});

socket.on('restart_game', () => {
    reset();
    render();
    turn = -1;
    console.log('restart_game');
});


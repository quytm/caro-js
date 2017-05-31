/**
 * Created by tmq on 20/05/2017.
 */

socket.on('click', (data) => {
    turn *= -1;
    playerFriend.tickMgr.push(new Tick(data.x, data.y));
    matrix[data.x][data.y] = playerFriend.type;
});

socket.on('new_player', (data) => {
    console.log('new player in room ' + data.room);
});

socket.on('ready_play', (data) => {
    console.log('ready_play: turn = ' + data.turn);
    if (data.turn === 1) turn = 1;
    else if (data.turn === 2) turn = -1;
    playingGame = true;
});

socket.on('player_win', (data) => {
    lineWin = data;
});

socket.on('restart_game', () => {
    reset();
    turn = -1;
    console.log('restart_game');
});

socket.on('new_score', (data) => {
    let s1 = data.player;
    let s2 = data.friend;
    if (s1 !== player.score && s2 === playerFriend.score) {
        player.score = s1;
        playerFriend.score = s2;
        board.message = 'Bạn chiến thắng!';
    } else if (s1 === player.score && s2 !== playerFriend.score) {
        player.score = s2;
        playerFriend.score = s1;
        board.message = 'Bạn đã thua!';
    }
    playingGame = false;
});


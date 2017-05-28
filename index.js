/**
 * Created by tmq on 02/05/2017.
 */
'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));


const port = process.env.PORT || 5000;
server.listen(port, function () {
    console.log('listening on *:' + port);
});

// ------------ Entity -------------------------------------------------------------------------------------------------
var Player = function () {
    this.id = '';
    this.ticks = [];
};
var size = 30;
var matrix = new Array(size);
for (let i = 0; i < size; i++) {
    matrix[i] = new Array(size);
}

// --------------------- Socket ----------------------------------------------------------------------------------------
let amountPlayer = 0;
let turn = 1;
let player1 = new Player(),
    player2 = new Player();

io.on('connection', function (socket) {
    // let room = null;

    socket.on('new_player', (data) => {
        // room = findRoom(data.id);
        // if (room !== null && amountPlayer < 2) {
        //     socket.join(room);
        //     amountPlayer++;
        //
        //     if (amountPlayer === 2) {
        //         io.in('room').emit('ready_play');
        //     }
        //     // else socket.broadcast.to('room').emit('new_player', {room: room});
        // }

        amountPlayer++;
        if (amountPlayer === 1) {
            player1.id = socket.id;
        } else if (amountPlayer === 2) {
            player2.id = socket.id;

            // socket.emit('ready_play');
            io.in(player1.id).emit('ready_play', {turn: 1});
            io.in(player2.id).emit('ready_play', {turn: 2});
        }
    });

    socket.on('start_game', () => {
        console.log('start_game');
    });

    socket.on('stop_game', () => {
        console.log('stop_game');
        stopGame();
    });

    socket.on('restart_game', () => {
        console.log('restart_game');
        restartGame();
        socket.broadcast.emit('restart_game');
    });

    socket.on('click', (data) => {
        if (socket.id === player1.id && turn === 1) {
            socket.broadcast.emit('click', data);
            player1.ticks.push(data);
            matrix[data.x][data.y] = 1;
            turn = 2;
        } else if (socket.id === player2.id && turn === 2) {
            socket.broadcast.emit('click', data);
            player2.ticks.push(data);
            matrix[data.x][data.y] = 2;
            turn = 1;
        }
    });

    socket.on('player_win', (data) => {
        let value = false;
        switch (data.orient) {
            case 'x':
                value = checkWinOrientX(data);
                break;
            case 'y':
                value = checkWinOrientY(data);
                break;
            case 'xy':
                value = checkWinOrientXAndY(data);
                break;
            case 'x-y':
                value = checkWinOrientXAndNegativeY(data);
                break;
        }
        if (value) {
            socket.broadcast.emit('player_win', data);
        }
    })

});

var findRoom = (id) => {
    // todo: pair ...
    return 'room';
};

function stopGame() {
    amountPlayer = 0;
    restartGame();
}
function restartGame() {
    turn = 1;
    player1.ticks = [];
    player2.ticks = [];

    matrix = new Array(size);
    for (let i = 0; i < size; i++) {
        matrix[i] = new Array(size);
    }
}


function checkWinOrientX(lineWin) {
    let y = lineWin.start.y;

    let type = 0;
    for (let i = lineWin.start.x; i <= lineWin.end.x; i++) {
        if (i < 0 || i >= size) return false;

        if (matrix[i][y] === undefined) return false;

        if (type === 0) type = matrix[i][y];
        else if (type !== matrix[i][y]) return false;
    }
    return true;
}

function checkWinOrientY(lineWin) {
    let x = lineWin.start.x;

    let type = 0;
    for (let j = lineWin.start.y; j <= lineWin.end.y; j++) {
        if (j < 0 || j >= size) return false;

        if (matrix[x][j] === undefined) return false;

        if (type === 0) type = matrix[x][j];
        else if (type !== matrix[x][j]) return false;
    }
    return true;
}

function checkWinOrientXAndY(lineWin) {
    let type = 0;
    for (let i = 0; i <= 4; i++) {
        let x = lineWin.start.x + i;
        let y = lineWin.start.y + i;
        if (x < 0 || x >= size || y < 0 || y >= size) return false;

        if (matrix[x][y] === undefined) return false;

        if (type === 0) type = matrix[x][y];
        else if (type !== matrix[x][y]) return false;
    }
    return true;
}

function checkWinOrientXAndNegativeY(lineWin) {
    let type = 0;
    for (let i = 0; i <= 4; i++) {
        let x = lineWin.start.x + i;
        let y = lineWin.start.y - i;
        if (x < 0 || x >= size || y < 0 || y >= size) return false;

        if (matrix[x][y] === undefined) return false;

        if (type === 0) type = matrix[x][y];
        else if (type !== matrix[x][y]) return false;
    }
    return true;
}



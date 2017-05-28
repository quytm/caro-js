/**
 * Created by tmq on 20/05/2017.
 */

'use strict';

function allowClick(x, y) {
    console.log('turn = ' + turn);
    return turn === 1 && checkConflict(x, y);
}

function checkConflict(x, y) {
    return matrix[x][y] === undefined;
}

function checkWin(x, y, type) {
    // console.log(checkOrientX(x, y, type) + checkOrientY(x, y, type) + checkOrientXAndY(x, y, type) + checkOrientXAndNegativeY(x, y, type));
    return checkOrientX(x, y, type) || checkOrientY(x, y, type) || checkOrientXAndY(x, y, type) || checkOrientXAndNegativeY(x, y, type);
}

function checkOrientX(x, y, type) {
    let count = 0;
    for (let i = x - 4; i <= x + 4; i++) {
        if (i < 0 || i >= size) continue;

        if (matrix[i][y] !== undefined && matrix[i][y] === type) {
            count++;
            if (count === 5) {
                lineWin = {
                    start: {x: i - 4, y: y},
                    end: {x: i, y: y},
                    orient: 'x'
                };
                return true;
            }
        }
        else count = 0;
    }
    return false;
}

function checkOrientY(x, y, type) {
    let count = 0;
    for (let i = y - 4; i <= y + 4; i++) {
        if (i < 0 || i >= size) continue;

        if (matrix[x][i] !== undefined && matrix[x][i] === type) {
            count++;
            if (count === 5) {
                lineWin = {
                    start: {x: x, y: i - 4},
                    end: {x: x, y: i},
                    orient: 'y'
                };
                return true;
            }
        }
        else count = 0;
    }
    return false;
}

// f = x = y
function checkOrientXAndY(x, y, type) {
    let count = 0;
    for (let i = -4; i <= 4; i++) {
        let xx = x + i;
        let yy = y + i;
        if (xx < 0 || yy < 0 || xx >= size || yy >= size) continue;

        if (matrix[xx][yy] !== undefined && matrix[xx][yy] === type) {
            count++;
            if (count === 5) {
                lineWin = {
                    start: {x: xx - 4, y: yy - 4},
                    end: {x: xx, y: yy},
                    orient: 'xy'
                };
                return true;
            }
        }
        else count = 0;
    }
    return false;
}

// f = x = -y
function checkOrientXAndNegativeY(x, y, type) {
    let count = 0;
    for (let i = -4; i <= 4; i++) {
        let xx = x + i;
        let yy = y - i;
        if (xx < 0 || yy < 0 || xx >= size || yy >= size) continue;

        if (matrix[xx][yy] !== undefined && matrix[xx][yy] === type) {
            count++;
            if (count === 5) {
                lineWin = {
                    start: {x: xx - 4, y: yy + 4},
                    end: {x: xx, y: yy},
                    orient: 'x-y'
                };
                return true;
            }
        }
        else count = 0;
    }
    return false;
}
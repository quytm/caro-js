/**
 * Created by tmq on 20/05/2017.
 */
'use strict';

var Player = function (type) {

    this.id = '';

    this.type = type;

    this.tickMgr = [];

    this.score = 0;

    this.render = () => {
        for (let i = 0; i < this.tickMgr.length; i++) {
            this.tickMgr[i].render(type);
        }
    }
};

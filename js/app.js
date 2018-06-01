// // Enemies our player must avoid
// const Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started
//
//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };
//
// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };
//
// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

class Enemy {
    constructor () {
        this.x = 400;
        this.y = 150;
        this.sprite = 'images/enemy-bug.png';
    }

    update (dt) {

    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// const Player = function () {
//     this.sprite = 'images/char-boy.png';
// };
//
// Player.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
//
// Player.prototype.update = function () {
//     this.handleInput();
// };
//
// Player.prototype.handleInput = function (key) {
//     if (key !== undefined) {
//
//     }
// };

class Player {
    constructor () {
        this.sprite = sessionStorage.getItem('char');
        this.x = 203;
        this.y = 403;
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update () {

    }

    handleInput (key) {
        if (typeof key === "undefined") {

        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy(), new Enemy()];
const player = new Player();

// character select screen
const gameInit = () => {
    const charTable = document.getElementById('js-char-select'),
        startButton = document.getElementById('js-new-game'),
        imgMap = {
            "js-char-1": "images/char-boy.png",
            "js-char-2": "images/char-cat-girl.png",
            "js-char-3": "images/char-horn-girl.png",
            "js-char-4": "images/char-pink-girl.png",
            "js-char-5": "images/char-princess-girl.png"
        };
    let selectedId = undefined;

    // set default if no character is selected.
    sessionStorage.setItem('char', 'images/char-boy.png');

    charTable.addEventListener('click', charSelectClick);

    function charSelectClick (e) {
        selectedId = undefined;
        const prevSelected = document.querySelector('td.selected');
        // remove highlight from previous selection
        if (prevSelected !== null) {
            prevSelected.classList.remove('selected');
        }

        if (e.target.nodeName === 'IMG') {
            selectedId = e.target.getAttribute('id');
        }

        if (typeof selectedId !== "undefined") {
            e.target.parentElement.classList.add('selected');
            sessionStorage.setItem('char', imgMap[selectedId]);
        }
    }

    document.addEventListener('keydown', charSelectKey);

    function charSelectKey (e) {
        selectedId = undefined;
        const prevSelected = document.querySelector('td.selected');
        let next = undefined;
        if (e.key === 'ArrowRight') {
            console.log(prevSelected);
            next = prevSelected.nextElementSibling;
            console.log(next);
            if (next === null) {
                next = prevSelected.parentElement.firstElementChild;
                console.log(next);
            }
        } else if (e.key === 'ArrowLeft') {
            next = prevSelected.previousElementSibling;
            if (next === null) {
                next = prevSelected.parentElement.lastElementChild;
            }
        }

        if (typeof next !== "undefined") {
            // remove highlight from previous selection
            if (prevSelected !== null) {
                prevSelected.classList.remove('selected');
            }
            selectedId = next.firstElementChild.getAttribute('id');
            next.classList.add('selected');
            sessionStorage.setItem('char', imgMap[selectedId]);
        }
    }

    startButton.addEventListener('click', () => {
        const menu = document.querySelector('main');
        menu.classList.toggle('hidden');
        // initialize board
        Engine();
        // This listens for key presses and sends the keys to your
        // Player.handleInput() method. You don't need to modify this.
        document.addEventListener('keyup', e => {
            const allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };

            player.handleInput(allowedKeys[e.keyCode]);
        });
    });
};
document.addEventListener('DOMContentLoaded', gameInit);
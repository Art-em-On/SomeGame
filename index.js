const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const refreshButton = document.getElementById('game_refresh');
function refreshGame(){
    location.reload()
}
refreshButton.addEventListener('click', refreshGame)

// Игрок
let x = 0;
let y = canvas.height-50;
let speed = 5;
let dx = 0;
let dy = 0;

// Враг
let enemyX = canvas.width / 4;
let enemyY = 50;
const enemyWidth = 80;
const enemyHeight = 50;
let enemySpeed = 2;
let enemyDx = -enemySpeed;

// Враг 1
let enemy1X = canvas.width-100;
let enemy1Y = canvas.height-130;
const enemy1Width = 50;
const enemy1Height = 80;
let enemy1Speed = 3;
let enemy1Dy = enemy1Speed;

// Враг 2
let enemy2X = canvas.width-250;
let enemy2Y = canvas.height-180;
const enemy2Width = 50;
const enemy2Height = 80;
let enemy2Speed = 4;
let enemy2Dx = -enemy2Speed;

// Враг 3
let enemy3X = canvas.width/2;
let enemy3Y = canvas.height/2;
const enemy3Width = 80;
const enemy3Height = 50;
let enemy3Speed = 4;
let enemy3Dy = enemy3Speed;

// финиш
let finishX = canvas.width-50;
let finishY = 0;
const finishWidth = 50;
const finishHeight = 50;

// Функция для рисования игрока
function drawSquare() {
    ctx.fillStyle = 'purple';
    ctx.fillRect(x, y, 50, 50);
};

// Функция для рисования финиша
function drawFinish() {
    ctx.fillStyle = 'green';
    ctx.fillRect(finishX, finishY, finishWidth, finishHeight);
};

// Функция для рисования врага
function drawEnemy() {
    ctx.fillStyle = 'red';
    ctx.fillRect(enemyX, enemyY, enemyWidth, enemyHeight);
};

// Функция для рисования врага 1
function drawEnemy1(){
    ctx.fillStyle = 'red';
    ctx.fillRect(enemy1X, enemy1Y, enemy1Width, enemy1Height);
};

// Функция для рисования врага 2
function drawEnemy2(){
    ctx.fillStyle = 'red';
    ctx.fillRect(enemy2X, enemy2Y, enemy2Width, enemy2Height);
};

// Функция для рисования врага 3
function drawEnemy3(){
    ctx.fillStyle = 'red';
    ctx.fillRect(enemy3X, enemy3Y, enemy3Width, enemy3Height);
};

// Обработка нажатия клавиш
function keyDownHandler(event) {
    if (event.key === 'ArrowRight') {
        dx = speed;
    } else if (event.key === 'ArrowLeft') {
        dx = -speed;
    } else if (event.key === 'ArrowUp') {
        dy = -speed;
    } else if (event.key === 'ArrowDown') {
        dy = speed;
    };
};

// Обработка отпускания клавиш
function keyUpHandler(event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        dx = 0;
    };
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        dy = 0;
    };
};

// Подписка на события клавиатуры
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Проверка столкновений
function checkCollision() {
    if (x < enemyX + enemyWidth && x + 50 > enemyX && y < enemyY + enemyHeight && y + 50 > enemyY) {
        stopGame();
    };
};

function checkCollision1() {
    if (x < enemy1X + enemy1Width && x + 50 > enemy1X && y < enemy1Y + enemy1Height && y + 50 > enemy1Y) {
        stopGame();
    };
};

function checkCollision2() {
    if (x < enemy2X + enemy2Width && x + 50 > enemy2X && y < enemy2Y + enemy2Height && y + 50 > enemy2Y) {
        stopGame();
    };
};

function checkCollision3() {
    if (x < enemy3X + enemy3Width && x + 50 > enemy3X && y < enemy3Y + enemy3Height && y + 50 > enemy3Y) {
        stopGame();
    };
};

function checkFinishCollision() {
    if (x < finishX + finishWidth && x + 50 > finishX && y < finishY + finishHeight && y + 50 > finishY) {
        winGame();
    };
};

// Остановка игры при столкновении
function stopGame() {
    dx=0;
    dy=0;
    enemyDx=0;
    enemy1Dy=0;
    enemy2Dx=0;
    enemy3Dy=0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.font = '120px Arial, Helvetica, sans-serif';
    ctx.fillText('You Lose', 150, 320);
};

function winGame() {
    dx=0;
    dy=0;
    enemyDx=0;
    enemy1Dy=0;
    enemy2Dx=0;
    enemy3Dy=0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.font = '120px Arial, Helvetica, sans-serif';
    ctx.fillText('You Win', 150, 320);
};

// Запуск анимации
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare();
    drawFinish();
    drawEnemy();
    drawEnemy1();
    drawEnemy2();
    drawEnemy3();
    checkCollision();
    checkCollision1();
    checkCollision2();
    checkCollision3();
    checkFinishCollision();

    x += dx;
    y += dy;

    if(x<0){
        x=0
    }else if(y<0){
        y=0
    }else if(x>800-50){
        x=800-50
    }else if(y>600-50){
        y=600-50
    };


    // Обновление позиции врага
    enemyX += enemyDx;
    if (enemyX + enemyWidth > 600 || enemyX < 0) {
        enemyDx = -enemyDx;
    };

    enemy1Y += enemy1Dy;
    if (enemy1Y + enemy1Height < 200 || enemy1Y + enemy1Height > 600){
        enemy1Dy = -enemy1Dy
    };

    enemy2X += enemy2Dx;
    if (enemy2X + enemy2Width > 600 || enemy2X + enemy2Width < 200){
        enemy2Dx = -enemy2Dx
    };

    enemy3Y += enemy3Dy;
    if (enemy3Y < 150 || enemy3Y + enemy3Height > 380){
        enemy3Dy = -enemy3Dy
    };
};

animate();
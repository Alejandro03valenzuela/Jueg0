let player = document.getElementById('player');
let obstacle = document.getElementById('obstacle');
let scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;
let gravity = 0.9;

function jump() {
    if (isJumping) return;
    isJumping = true;
    let position = 0;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            // Descender
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                position = position * gravity;
                player.style.bottom = position + 'px';
            }, 20);
        }

        // Ascender
        position += 20;
        player.style.bottom = position + 'px';
    }, 20);
}

function checkCollision() {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft > 50 && obstacleLeft < 90 && playerTop <= 30) {
        alert("Game Over! Final Score: " + score);
        score = 0;
        scoreDisplay.textContent = score;
        obstacle.style.animation = "none";
        obstacle.style.left = "800px";
    }
}

function moveObstacle() {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    if (obstacleLeft <= 0) {
        obstacle.style.left = "800px";
        score++;
        scoreDisplay.textContent = score;
    } else {
        obstacle.style.left = obstacleLeft - 10 + 'px';
    }
}

// Función para manejar el evento de teclado
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }
});

// Mover el obstáculo y verificar colisiones cada 30ms
setInterval(() => {
    moveObstacle();
    checkCollision();
}, 30);

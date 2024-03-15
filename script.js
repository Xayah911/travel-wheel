const canvas = document.getElementById('canvas');
const spin = document.getElementById('spin');
const ctx = canvas.getContext('2d');
const destinations = ['', '', '', '', '', '', '', ''];
const colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#FF6347', '#4682B4', '#D2B48C', '#40E0D0', '#6495ED'];
let angle = 0;

function drawWheel() {
    const anglePerSeg = 2 * Math.PI / destinations.length;
    for (let i = 0; i < destinations.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, angle, angle + anglePerSeg);
        ctx.lineTo(250, 250);
        ctx.fill();
        ctx.save();

        ctx.translate(250, 250);
        ctx.rotate(angle + anglePerSeg / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000';
        ctx.font = '20px Arial';
        ctx.fillText(destinations[i], 230, 10);
        ctx.restore();

        angle += anglePerSeg;
    }
}

function spinWheel() {
    const spins = Math.random() * 7200 + 3600; // Minimum 10 rotations
    const duration = 5000; // 5 seconds
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        const currentAngle = spins * progress;

        ctx.clearRect(0, 0, 500, 500);
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(currentAngle * Math.PI / 180);
        ctx.translate(-250, -250);
        drawWheel();
        ctx.restore();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            const finalAngle = (spins % 360) * Math.PI / 180;
            const selected = Math.floor(destinations.length - (finalAngle / (2 * Math.PI)) * destinations.length) % destinations.length;
            alert(`恭喜，你抽中了：${destinations[selected]}`);
        }
    }

    requestAnimationFrame(animate);
}

drawWheel();
spin.addEventListener('click', spinWheel);

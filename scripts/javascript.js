// Init
homeCanvas();

// Menu Overlay Functions
function menuOverlay_open() {
    document.getElementsByClassName("menuOverlay")[0].style.width = "100%";
    document.getElementsByClassName("menuOverlay_closebtn")[0].classList.remove("fade");
    document.getElementsByClassName("menuOverlay_optionDiv")[0].classList.remove("fade");
}
function menuOverlay_close() {
    document.getElementsByClassName("menuOverlay")[0].style.width = "0%";
    document.getElementsByClassName("menuOverlay_closebtn")[0].classList.add("fade");
    document.getElementsByClassName("menuOverlay_optionDiv")[0].classList.add("fade");
}
document.addEventListener('click', function (e) {
    if (e.target.className == "menuOverlay" || e.target.className == "menuOverlay_optionDiv") {
        menuOverlay_close();
    }
});

// Home Landing Canvas
function homeCanvas() {
    // Canvas variables
    const canvas = document.getElementById("homeLandingCanvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext('2d');
    var width = canvas.clientWidth; // Width of the canvas
    var height = canvas.clientHeight; // Height of the canvas

    // Background Color
    var grd = ctx.createLinearGradient(0, 0, width, height);
    grd.addColorStop(0, "#517481");
    grd.addColorStop(0.5, "#1f3e4e");
    grd.addColorStop(0, "#517481");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    function Star(options) {
        this.size = Math.random() * 3;
        this.speed = Math.random() * .1;
        this.x = options.x;
        this.y = options.y;
        this.c = options.c;
        this.co = this.c;
    }
    Star.prototype.reset = function () {
        this.size = Math.random() * 3;
        this.speed = Math.random() * .1;
        this.x = width;
        this.y = Math.random() * height;
        this.c = this.co;
    }
    Star.prototype.update = function () {
        this.x -= this.speed;
        if (this.x < 0) {
            this.reset();
        } else {
            ctx.fillStyle = this.c;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    // Shooting Stars
    function ShootingStar() {
        this.reset();
    }
    ShootingStar.prototype.reset = function () {
        this.x = Math.random() * width;
        this.y = 0;
        this.len = (Math.random() * 80) + 10;
        this.speed = (Math.random() * 10) + 6;
        this.size = (Math.random() * 1) + 0.1;
        // Non-constant shooting stars
        this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
        this.active = false;
    }
    ShootingStar.prototype.update = function () {
        if (this.active) {
            this.x -= this.speed;
            this.y += this.speed;
            if (this.x < 0 || this.y >= height) {
                this.reset();
            } else {
                ctx.lineWidth = this.size;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.len, this.y - this.len);
                ctx.stroke();
            }
        } else {
            if (this.waitTime < new Date().getTime()) {
                this.active = true;
            }
        }
    }

    // Init
    var entities = [];
    function init() {
        entities.length = 0;
        for (var i = 0; i < height; i++) { // Stars init
            entities.push(new Star({ x: Math.random() * width, y: Math.random() * height, c: "#ffffff" }));
        }
        for (var i = 0; i < 3; i++) { // Shooting stars init.
            entities.push(new ShootingStar());
        }
    }

    // Animate background
    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#ffffff';

        var entLen = entities.length;
        while (entLen--) {
            entities[entLen].update();
        }
        window.requestAnimationFrame(animate);
    }

    // Screen Resize
    function resize() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        init();
    }
    window.addEventListener('resize', resize);

    init();
    window.requestAnimationFrame(animate);
}
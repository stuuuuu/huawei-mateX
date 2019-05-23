jQuery(function($) {
    var images = [],
        spriteImg = 10,
        spriteImgReverse = 47,
        phoneImg,
        phoneImgReverse;


    for (var i = 1; i <= 47; i++) {
        images.push('img/mate/' + i + '.png');
    }

    preLoad();

    function preLoad(){
    	var toLoad = [],
    		loadingCounter = 1;
    		for(var j=1;j < images.length;j++){
    			toLoad[j] = new Image();
    			toLoad[j].src = images[j];
    			toLoad[j].onload = function(){
    				loadingCounter++;
    				if (loadingCounter === images.length) {
        				closePhone();
    				}
    			}
    		}
    }

    function closePhone() {

        phoneImg = setInterval(function() {
            $(".phone > img").attr('src', images[spriteImg]);
            if (spriteImg == 48) {
                clearInterval(phoneImg);
                spriteImg = 10;
                setTimeout(function() {
                    phoneImgReverse = setInterval(function() {
                        $(".phone > img").attr("src", images[spriteImgReverse]);
                        if (spriteImgReverse == 10) {
                            clearInterval(phoneImgReverse);
                            setTimeout(function() {
                                closePhone();
                            }, 5000);
                            spriteImgReverse = 47;
                        }
                        spriteImgReverse--;
                    }, 50)
                }, 5000)

            }
            spriteImg++;
        }, 50);
    }

   

    var initialAnim = ['.title', '.row-date', '.row-obj', '.row-act', '.table', '.rules', '.rules-terms>div:nth-child(2)', '.footer'],
        animTimer = 100;
    for (var i = 0; i <= 7; i++) {
        $(initialAnim[i]).delay(animTimer).queue(function(next) {
            $(this).fadeIn().addClass('slide-in-left');
            next();
        });
        animTimer += 100;
    }


    $('.phone,.phone-connection').addClass('scale-in-center');


});

$('#smoke-effect-canvas').SmokeEffect({
    color: 'black',
    opacity: 0.1,
    maximumVelocity: 94,
    particleRadius: 150,
    density: 4
});









// fairy dust animation


var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    canvasWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
    canvasHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight),
    requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
var persons = [],
    numberOfFirefly = 20,
    birthToGive = 20;

var colors = [];
/* Galactic Tea - http://www.colourlovers.com/palette/1586746/Galactic_Tea*/
colors[2] = [];
colors[2]['background'] = '#2F294F';
colors[2][1] = 'rgba(41,146,188,'; //58,201,248
colors[2][2] = 'rgba(52,128,160,'; //72,176,199
colors[2][3] = 'rgba(0,118,185,'; //93,128,134
colors[2][4] = 'rgba(15,199,232,'; //158,244,244


var colorTheme = 2, //getRandomInt(0,colors.length-1);
    mainSpeed = 1;

function getRandomInt(min, max, exept) {
    var i = Math.floor(Math.random() * (max - min + 1)) + min;
    if (typeof exept == "undefined") return i;
    else if (typeof exept == 'number' && i == exept) return getRandomInt(min, max, exept);
    else if (typeof exept == "object" && (i >= exept[0] && i <= exept[1])) return getRandomInt(min, max, exept);
    else return i;
}

function isEven(n) {
    return n == parseFloat(n) ? !(n % 2) : void 0;
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function Firefly(id) {
    this.id = id;
    this.width = getRandomInt(1, 3);
    this.height = this.width;
    this.x = getRandomInt(0, (canvas.width - this.width));
    this.y = getRandomInt(0, (canvas.height - this.height));
    this.speed = (this.width <= 10) ? 2 : 1;
    this.alpha = 1;
    this.alphaReduction = getRandomInt(1, 3) / 1000;
    this.color = colors[colorTheme][getRandomInt(1, colors[colorTheme].length - 1)];
    this.direction = getRandomInt(0, 360);
    this.turner = getRandomInt(0, 1) == 0 ? -1 : 1;
    this.turnerAmp = getRandomInt(1, 2);
    this.isHit = false;
    this.stepCounter = 0;
    this.changeDirectionFrequency = getRandomInt(1, 200);
    this.shape = 1 //getRandomInt(2,3);
    this.shadowBlur = getRandomInt(5, 25);
}

Firefly.prototype.stop = function() {
    this.update();
}

Firefly.prototype.walk = function() {
    var next_x = this.x + Math.cos(degToRad(this.direction)) * this.speed,
        next_y = this.y + Math.sin(degToRad(this.direction)) * this.speed;

    // Canvas limits
    if (next_x >= (canvas.width - this.width) && (this.direction < 90 || this.direction > 270)) {
        next_x = canvas.width - this.width;
        this.direction = getRandomInt(90, 270, this.direction);
    }
    if (next_x <= 0 && (this.direction > 90 && this.direction < 270)) {
        next_x = 0;
        var exept = [90, 270];
        this.direction = getRandomInt(0, 360, exept);
    }
    if (next_y >= (canvas.height - this.height) && (this.direction > 0 && this.direction < 180)) {
        next_y = canvas.height - this.height;
        this.direction = getRandomInt(180, 360, this.direction);
    }
    if (next_y <= 0 && (this.direction > 180 && this.direction < 360)) {
        next_y = 0;
        this.direction = getRandomInt(0, 180, this.direction);
    }

    this.x = next_x;
    this.y = next_y;

    this.stepCounter++;

    if (this.changeDirectionFrequency && this.stepCounter == this.changeDirectionFrequency) {
        this.turner = this.turner == -1 ? 1 : -1;
        this.turnerAmp = getRandomInt(1, 2);
        this.stepCounter = 0;
        this.changeDirectionFrequency = getRandomInt(1, 200);
    }

    this.direction += this.turner * this.turnerAmp;

    this.update();
}

Firefly.prototype.takeOppositeDirection = function() {
    // Right -> Left
    if ((this.direction >= 0 && this.direction < 90) || (this.direction > 270 && this.direction <= 360)) {
        this.direction = getRandomInt(90, 270);
        return;
    }
    // Left -> Right
    if (this.direction > 90 && this.direction < 270) {
        var exept = [90, 270];
        this.direction = getRandomInt(0, 360, exept);
        return;
    }
    // Down -> Up
    if (this.direction > 0 && this.direction < 180) {
        this.direction = getRandomInt(180, 360);
        return;
    }
    // Up -> Down
    if (this.direction > 180) {
        this.direction = getRandomInt(0, 180);
    }
}

Firefly.prototype.update = function() {

    context.beginPath();

    context.fillStyle = this.color + this.alpha + ")";
    context.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 2, 0, 2 * Math.PI, false);
    context.shadowColor = this.color + this.alpha + ")";
    context.shadowBlur = this.shadowBlur;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fill();

    if (this.id > 15) {
        this.alpha -= this.alphaReduction;
        if (this.alpha <= 0) this.die();
    }

}

Firefly.prototype.die = function() {
    persons[this.id] = null;
    delete persons[this.id];
}

window.onload = function() {
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    start();
}

function start() {
    instantiatePopulation();
    animate();
}

function instantiatePopulation() {
    var i = 0;
    while (i < numberOfFirefly) {
        persons[i] = new Firefly(i);
        i++;
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    // Création d'une copie de l'array persons
    persons_order = persons.slice(0);
    // Tri par ordre de position sur l'axe y (afin de gérer les z-index)
    persons_order.sort(function(a, b) {
        return a.y - b.y
    });

    // Paint les instances dans l'ordre trié
    for (var i in persons_order) {
        var u = persons_order[i].id;
        persons[u].walk();
    }

    requestAnimationFrame(animate);
}

canvas.onclick = function(e) {
    giveBirth(e, birthToGive);
}

function giveBirth(e, u) {
    var i = persons.length;
    persons[i] = new Firefly(i);
    persons[i].x = e.layerX;
    persons[i].y = e.layerY;

    if (u > 1) giveBirth(e, u - 1);
}
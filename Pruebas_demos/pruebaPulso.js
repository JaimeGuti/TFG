var position_desp = '10 20 -4.5';
var position_scaled = '10 15 -4.5';
var position_inv = '10 10 -4.5';
var position_high = '10 5 -4.5';
var position_neg = '20 5 -4.5';

AFRAME.registerComponent('draw-pulse', {
    schema: {
        width: {default: 5},
        height: {default: 3},
        depth: {default: 2},
        color: {default: 'green'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        var materials = [
            new THREE.MeshBasicMaterial( { color: 'black' } ), // right
            new THREE.MeshBasicMaterial( { color: 'black' } ), // left
            new THREE.MeshBasicMaterial( { color: 'black' } ), // top
            new THREE.MeshBasicMaterial( { color: 'black' } ), // bottom
            new THREE.MeshBasicMaterial( { color: 'tomato' } ), // back
            new THREE.MeshBasicMaterial( { color: 'black' } )  // front
        ];
        // el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);
        // this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.material = new THREE.MultiMaterial(materials);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#pulsecanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(50,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(50,y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            for(x=0; x<=400; x+=1) {
                var desplazamiento_y = 180;
                var frec = 90;
                var scaled = 120;
                var desplazamiento_x = 0.0;
                var mod_desp = 0;
                   
                y = desplazamiento_y - Math.max(desplazamiento_x, 0)*1;

                if (x < 50) {
                    this.ctx.lineTo(x, 75);    
                }
                if ((x >= 50)&&(x<=100)) {
                    this.ctx.lineTo(x, 25);
                }
                if (x > 100) {
                    this.ctx.lineTo(x, 75);
                }
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            var materials = [
                new THREE.MeshBasicMaterial( { color: 'black' } ), // right
                new THREE.MeshBasicMaterial( { color: 'black' } ), // left
                new THREE.MeshBasicMaterial( { color: 'black' } ), // top
                new THREE.MeshBasicMaterial( { color: 'black' } ), // bottom
                new THREE.MeshBasicMaterial( { map: this.texture } ), // back
                new THREE.MeshBasicMaterial( { color: 'black' } )  // front
            ];
            // this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.material = new THREE.MultiMaterial(materials);
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            // el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
            el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);
        });
    }
});

///////////////////////////////////////////////////////////

AFRAME.registerComponent('desp-pulse', {
    schema: {
        width: {default: 5},
        height: {default: 3},
        depth: {default: 2},
        color: {default: 'green'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);
        
/*         var colors = ['#4CC3D9', '#FFC65D', '#FF0000', '#FF00FF', '#00FFFF', '#00FF00', '#FFFF00', '#000000'];
        var currentColor = 0;
        el.addEventListener('mousedown', function () {
            // el.setAttribute('color', colors[currentColor]);
            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ color: colors[currentColor] });

            currentColor = currentColor + 1;
            if (currentColor === colors.length) {
                currentColor = 0;
            }
        }); */

       
        var mod_desp = -100;
        // var currentDesp = 0;
        // console.log("FUERA "+mod_desp);

        el.addEventListener('mousedown', function () {
            // console.log("DENTRO "+mod_desp);

            this.canvas = document.querySelector("#despcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150,y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            /* generar un número aleatorio entre -100 y 100 */
            var minlimit = -100;
            var randomNum = Math.floor(Math.random() * (160 - (-80) + 1)) + (minlimit);
            console.log("Random number = " + randomNum);
            
            // mod_desp = mod_desp - randomNum;
            mod_desp = mod_desp + randomNum;
            // console.log("CURRENT FINAL "+currentDesp);
            // console.log("FINAL "+(mod_desp - 100));
            if ((mod_desp <= -300) || (mod_desp >= 300)) {
                mod_desp = -100;
                randomNum = 0;
            }
            
            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.texto);
            }
            
            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', position_desp);
            this.box.setAttribute('width','2px');
            this.box.setAttribute('depth','0.5px');
            this.box.setAttribute('color', 'olive'); // ¡¡¡ CHANGE THIS !!!
            // this.box.setAttribute('value', 'HELLO WORLD');
            this.scene.appendChild(this.box);
                        
            this.texto = document.createElement('a-text');

            var signo = '';
            if (randomNum => 0) {
                signo = ' + ';
                randomNum = randomNum;
            } 
            if (randomNum < 0){
                signo = ' - ';
                randomNum = -randomNum;
            }

            this.texto.setAttribute('value', "y(t) = x(t" + signo + randomNum + "to)");
            this.texto.setAttribute('color', 'red');
            // this.texto.textAlign = 'center';
            // this.texto.setAttribute('textAlign', 'center');
            this.texto.setAttribute('position', '-0.8 0 0.25');
            this.texto.setAttribute('scale', '1 1 1');
            this.box.appendChild(this.texto);

            for(x=0; x<=400; x+=1) {
                var desplazamiento_y = 180;
                var frec = 90;
                var scaled = 120;
                var desplazamiento_x = 0.0;
                // var mod_desp = 50;
                // var mod_scaled = 0;
                   
                y = desplazamiento_y - Math.max(desplazamiento_x, 0)*1; // Modificas altura

                if (x < 0 - mod_desp) {
                    this.ctx.lineTo(0, 75);
                }
                if ((x >= 0 - mod_desp)&&(x < 50 - mod_desp)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x, 75);    
                }
                if ((x >= 50 - mod_desp)&&(x <= 100 - mod_desp)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x, 25);
                }
                if (x > 100 - mod_desp) {
                    // this.ctx.moveTo(x, 75)
                    this.ctx.lineTo(x, 75);
                }
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });

            mod_desp = -100;
        });
    }
});

AFRAME.registerComponent('scaled-pulse', {
    schema: {
        width: {default: 5},
        height: {default: 3},
        depth: {default: 2},
        color: {default: 'yellow'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        var mod_scaled = 0;

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#scaledcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150,y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            // generate random number between 0 y 75
            var minlimit = 0;
            var maxlimit = 75;
            var randomNum = Math.floor(Math.random() * (maxlimit)) + (minlimit);
            
            mod_scaled = randomNum;
            console.log(mod_scaled)
            if ((mod_scaled <= 0) || (mod_scaled >= 75)) {
                mod_scaled = 74;
                randomNum = 74;
            }
            
            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.texto);
            }
            
            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', position_scaled);
            this.box.setAttribute('width','2px');
            this.box.setAttribute('depth','0.5px');
            this.box.setAttribute('color', 'olive'); // ¡¡¡ CHANGE THIS !!!
            this.scene.appendChild(this.box);
                        
            this.texto = document.createElement('a-text');

/*             var signo = '';
            if (randomNum => 0) {
                signo = ' + ';
                randomNum = randomNum;
            } 
            if (randomNum < 0){
                signo = ' - ';
                randomNum = -randomNum;
            } */

            this.texto.setAttribute('value', "y(t) = x(" + mod_scaled + "t)");
            this.texto.setAttribute('color', 'red');
            //this.texto.setAttribute('position', 'center');
            this.texto.setAttribute('position', '-0.75 0 0.25');
            this.texto.setAttribute('scale', '1.25 1.25 1.25');
            this.box.appendChild(this.texto);            

            for(x=0; x<=400; x+=1) {
                var desp_y = 180;
                var frec = 90;
                var scaled = 120;
                var desp_x = 0.0;
                var mod_desp = 0;
                // var mod_scaled = 80;
                   
                y = desp_y - Math.max(desp_x, 0)*1; // Modificas altura

                if (x < 100 + mod_desp) {
                    this.ctx.lineTo(0, 75);
                }
                if ((x >= 100 + mod_desp)&&(x < 150 + mod_desp)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x, 75);    
                }
                if ((x >= 150 + mod_desp)&&(x <= 200 + mod_desp)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x, mod_scaled);
                }
                if (x > 200 + mod_desp) {
                    // this.ctx.moveTo(x, 75)
                    this.ctx.lineTo(x, 75);
                }
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });
        });
    }
});

AFRAME.registerComponent('inv-pulse', {
    schema: {
        width: {default: 5},
        height: {default: 3},
        depth: {default: 2},
        color: {default: 'tomato'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        var count = 0;

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#invcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            var mod_inv = 50;

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150, y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150, y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

/*             if (mod_inv != 0) {
               var mod_inv = mod_inv - 50;
            } */

            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.text);
            }

            if (count % 2 == 0) { // Count pair --> x(-t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_inv);
                this.box.setAttribute('width','2px');
                this.box.setAttribute('depth','0.5px');
                this.box.setAttribute('color', 'olive'); // ¡¡¡ CHANGE THIS !!!
                this.box.setAttribute('border-width', '0.5px');
                this.box.setAttribute('border-style', 'solid');
                this.box.setAttribute('border-color', 'red');
                this.scene.appendChild(this.box);
                            
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = x(-t)");
                this.text.setAttribute('color', 'red');
                // this.text.setAttribute('position', 'center');
                this.text.setAttribute('position', '-0.75 0 0.25');
                this.text.setAttribute('scale', '1.5 1.5 1.5');
                this.box.appendChild(this.text);

                for(x=0; x<=400; x+=1) {
                    var desp_y = 180;
                    var frec = 90;
                    var scaled = 120;
                    var desp_x = 0.0;
                    var mod_desp = 0;
                    var mod_scaled = 0;
                    
                    y = desp_y - Math.max(desp_x + mod_scaled, 0)*1; // Modify high

                    if (x < 0 + mod_desp + mod_inv) {
                        this.ctx.lineTo(0, 75);
                    }
                    if ((x >= 0 + mod_desp + mod_inv)&&(x < 50 + mod_desp + mod_inv)) {
                        // this.ctx.moveTo(x, 75);
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 50 + mod_desp + mod_inv)&&(x <= 100 + mod_desp + mod_inv)) {
                        // this.ctx.moveTo(x, 75);
                        this.ctx.lineTo(x, 25);
                    }
                    if (x > 100 + mod_desp + mod_inv) {
                        // this.ctx.moveTo(x, 75)
                        this.ctx.lineTo(x, 75);
                    }
                }
            } else { // Count odd --> x(t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_inv);
                this.box.setAttribute('width','2px');
                this.box.setAttribute('depth','0.5px');
                this.box.setAttribute('color', 'olive'); // ¡¡¡ CHANGE THIS !!!
                this.box.setAttribute('border-width', '0.5px');
                this.box.setAttribute('border-style', 'solid');
                this.box.setAttribute('border-color', 'red');
                this.scene.appendChild(this.box);
                            
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = x(t)");
                this.text.setAttribute('color', 'white');
                // this.text.setAttribute('position', 'center');
                this.text.setAttribute('position', '-0.75 0 0.25');
                this.text.setAttribute('scale', '1.5 1.5 1.5');
                this.box.appendChild(this.text);

                for(x=0; x<=400; x+=1) {
                    var desplazamiento_y = 180;
                    var frec = 90;
                    var scaled = 120;
                    var desplazamiento_x = 0.0;
                    var mod_desp = -100;

                    y = desplazamiento_y - Math.max(desplazamiento_x, 0)*1; // Modificas altura

                    if (x < 0 - mod_desp) {
                        this.ctx.lineTo(0, 75);
                    }
                    if ((x >= 0 - mod_desp)&&(x < 50 - mod_desp)) {
                        // this.ctx.moveTo(x, 75);
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 50 - mod_desp)&&(x <= 100 - mod_desp)) {
                        // this.ctx.moveTo(x, 75);
                        this.ctx.lineTo(x, 25);
                    }
                    if (x > 100 - mod_desp) {
                        // this.ctx.moveTo(x, 75)
                        this.ctx.lineTo(x, 75);
                    }
                }
            }
            
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });

            count++;
        });
    }
});

AFRAME.registerComponent('high-pulse', {
    schema: {
        width: {default: 5},
        height: {default: 3},
        depth: {default: 2},
        color: {default: 'black'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);
        
        var mod_high = 0;

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#highcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            var mod_inv = 0;

            // AXIS LINEs
            // AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150,y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            // generate random number between -40 y 50
            var minlimit = -40;
            var randomNum = Math.floor(Math.random() * (50 - (-25) + 1)) + (minlimit);
            console.log("Random number = " + randomNum);
            
            mod_high = randomNum;
            if ((mod_high <= -50) || (mod_high >= 60)) {
                mod_high = 0;
                randomNum = 0;
            }
            
            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.texto);
            }
            
            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', position_high);
            this.box.setAttribute('width','2px');
            this.box.setAttribute('depth','0.5px');
            this.box.setAttribute('color', 'olive'); // ¡¡¡ CHANGE THIS !!!
            this.scene.appendChild(this.box);
                        
            this.texto = document.createElement('a-text');

            var signo = '';
            if (randomNum => 0) {
                signo = ' + ';
                randomNum = randomNum;
            } 
            if (randomNum < 0){
                signo = ' - ';
                randomNum = -randomNum;
            }

            this.texto.setAttribute('value', "y(t) = x(t) " + signo + " " + randomNum);
            this.texto.setAttribute('color', 'red');
            //this.texto.setAttribute('position', 'center');
            this.texto.setAttribute('position', '-0.8 0 0.25');
            this.texto.setAttribute('scale', '1 1 1');
            this.box.appendChild(this.texto);            

            if (mod_inv != 0) {
               var mod_inv = mod_inv - 50;
            }

            for(x=0; x<=400; x+=1) {
                var desp_y = 180;
                var frec = 90;
                var scaled = 120;
                var desp_x = 0.0;
                var mod_desp = 0;
                var mod_scaled = 0;
                // var mod_high = 20;
                   
                y = desp_y - Math.max(desp_x + mod_scaled, 0)*1; // Modificas amplitud y

                if (x < 100 - mod_desp + mod_inv) {
                    this.ctx.lineTo(0, 75 - mod_high);
                }
                if ((x >= 100 - mod_desp + mod_inv)&&(x < 150 - mod_desp + mod_inv)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x, 75 - mod_high);    
                }
                if ((x >= 150 - mod_desp + mod_inv)&&(x <= 200 - mod_desp + mod_inv)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x, (25) - mod_high);
                }
                if (x > 200 - mod_desp + mod_inv) {
                    // this.ctx.moveTo(x, 75)
                    this.ctx.lineTo(x, 75 - mod_high);
                }
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });
        });
    }
});

AFRAME.registerComponent('neg-pulse', {
    schema: {
        width: {default: 5},
        height: {default: 3},
        depth: {default: 2},
        color: {default: 'green'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        var materials = [
            new THREE.MeshBasicMaterial( { color: 'black' } ), // right
            new THREE.MeshBasicMaterial( { color: 'black' } ), // left
            new THREE.MeshBasicMaterial( { color: 'black' } ), // top
            new THREE.MeshBasicMaterial( { color: 'black' } ), // bottom
            new THREE.MeshBasicMaterial( { color: 'tomato' } ), // back
            new THREE.MeshBasicMaterial( { color: 'black' } )  // front
        ];
        // el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);
        // this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.material = new THREE.MultiMaterial(materials);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        var count = 0;

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#negcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5, 75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x, 75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(50,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(50,y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                // this.box.removeChild(this.texto);
            }

            if (count % 2 == 0) { // Count pair --> -x(t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_neg);
                this.box.setAttribute('width','2px');
                this.box.setAttribute('depth','0.5px');
                this.box.setAttribute('color', 'olive'); // ¡¡¡ CHANGE THIS !!!
                this.box.setAttribute('border-width', '0.5px');
                this.box.setAttribute('border-style', 'solid');
                this.box.setAttribute('border-color', 'red');
                this.scene.appendChild(this.box);
                                
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = -x(t)");
                this.text.setAttribute('color', 'red');
                // this.text.setAttribute('position', 'center');
                this.text.setAttribute('position', '-0.75 0 0.25');
                this.text.setAttribute('scale', '1.5 1.5 1.5');
                this.box.appendChild(this.text);

                for(x=0; x<=400; x+=1) {
                    var desplazamiento_y = 180;
                    var frec = 90;
                    var scaled = 120;
                    var desplazamiento_x = 0.0;
                    var mod_desp = 0;
                    
                    y = desplazamiento_y - Math.max(desplazamiento_x, 0)*1;

                    if (x < 50) {
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 50)&&(x <= 100)) {
                        this.ctx.lineTo(x, 125);
                    }
                    if (x > 100) {
                        this.ctx.lineTo(x, 75);
                    }
                }
                
            } else { // Count odd --> x(t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_neg);
                this.box.setAttribute('width','2px');
                this.box.setAttribute('depth','0.5px');
                this.box.setAttribute('color', 'olive'); // ¡¡¡ CHANGE THIS !!!
                this.box.setAttribute('border-width', '0.5px');
                this.box.setAttribute('border-style', 'solid');
                this.box.setAttribute('border-color', 'red');
                this.scene.appendChild(this.box);
                                
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = x(t)");
                this.text.setAttribute('color', 'white');
                // this.text.setAttribute('position', 'center');
                this.text.setAttribute('position', '-0.75 0 0.25');
                this.text.setAttribute('scale', '1.5 1.5 1.5');
                this.box.appendChild(this.text);

                for(x=0; x<=400; x+=1) {
                    var desplazamiento_y = 180;
                    var frec = 90;
                    var scaled = 120;
                    var desplazamiento_x = 0.0;
                    var mod_desp = 0;
                    
                    y = desplazamiento_y - Math.max(desplazamiento_x, 0)*1;

                    if (x < 50) {
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 50)&&(x <= 100)) {
                        this.ctx.lineTo(x, 25);
                    }
                    if (x > 100) {
                        this.ctx.lineTo(x, 75);
                    }
                }
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            var materials = [
                new THREE.MeshBasicMaterial( { color: 'black' } ), // right
                new THREE.MeshBasicMaterial( { color: 'black' } ), // left
                new THREE.MeshBasicMaterial( { color: 'black' } ), // top
                new THREE.MeshBasicMaterial( { color: 'black' } ), // bottom
                new THREE.MeshBasicMaterial( { map: this.texture } ), // back
                new THREE.MeshBasicMaterial( { color: 'black' } )  // front
            ];
            // this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.material = new THREE.MultiMaterial(materials);
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            // el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
            el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);

            count++;
        });
    }
});




AFRAME.registerComponent('give-num', {
    schema: {
        width: {default: 4},
        height: {default: 2},
        depth: {default: 1},
        color: {default: 'yellow'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#numcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'yellow';
            this.ctx.fill();

            var num = parseInt(Math.floor(Math.random() * (100 - (-50) + 1)) + (1));
            // this.canvas.setAttribute("text","value",num.toString());
            console.log("DISPLAY VALUE: " + num);
            console.log("CANVAS " + this.canvas);

            this.texture = new THREE.Texture(num.toString())
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });
        });
    }
});

AFRAME.registerComponent('score-counter', {
    schema: {
      el: {
        type: 'selector'
      },
      score:{
        type: 'int',
        default: 0
      },
    },
  
    init: function () {
      // var sceneEl = document.querySelector('a-scene'); 
      var scoreBoard = document.querySelector('#score');
      // var data = this.data;
      var el = this.el;
  
      el.addEventListener('click', () => {
        console.log("SCORE COUNTER")
        this.data.score++;
        var newScore = 'Score: ' + this.data.score
        // console.log("SCORE = " + score);
        console.log(newScore);
        scoreBoard.setAttribute('text', 'value',  newScore)
      })
    }
});

AFRAME.registerComponent('draw-num', {
    schema: {
        width: {default: 2},
        height: {default: 1},
        depth: {default: 1},
        color: {default: 'blue'},
        score: {type: 'int', default: 0}
    },
    
    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#numcanvas");
            this.ctx = this.canvas.getContext('2d', {antialias: false});

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 300, 150);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

/*             var prueba1 = 5;
            var prueba2 = 10;

            ctx.fillStyle = 'green';
            ctx.fillText("HELLO WORLD!!!" + prueba1, 20, 20);
            ctx.strokeStyle = 'red';
            ctx.strokeText(("NUM = " + prueba2), 80, 80);

            data.score++;
            var newScore = 'Score: ' + data.score
            console.log("SCORE = " + score);
            console.log(newScore);
            ctx.strokeStyle = 'blue';
            ctx.strokeText((newScore), 140, 140); */

            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', '11 -3 -5');
            // this.box.setAttribute('color', 'red');
            // this.box.setAttribute('style', 'width: 200px; height: 100px');
            // this.box.style.width = '200px';
            this.box.setAttribute('width','2px')
            this.box.setAttribute('value', 'HELLO WORLD');
            this.scene.appendChild(this.box);
            
            this.texto = document.createElement('a-text');
            // var frase = "HOLA MUNDO :)";
            this.texto.setAttribute('value', "y(t) = x(t - " + "mod_desp" + "to)");
            this.texto.setAttribute('color', 'red');
            // this.texto.textAlign = 'center';
            // this.texto.setAttribute('textAlign', 'center');
            this.texto.setAttribute('position', '-0.8 0 0.5');
            this.texto.setAttribute('scale', '0.75 0.75 0.75');
            this.box.appendChild(this.texto);

            this.ctx.fillStyle = 'red';
            this.ctx.font = "25px Arial";
            this.ctx.textAlign = 'center';
            this.ctx.fillText("y(t) = x(t - " + "mod_desp" + "to)", 150, 75);

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });
        });
    }
});

AFRAME.registerComponent('count', {
    
    init: function () {
        var contador = 0;
        var parImpar = document.createElement('a-box');
        parImpar.setAttribute('position', '10 5 -5');
        parImpar.setAttribute('rotation', '0 45 0');
        parImpar.setAttribute('color', 'yellow');
        scene.appendChild(parImpar);
        parImpar.onclick = function() {
            contador++;
            parImpar.innerHTML = contador;
            if (contador % 2 == 0) {
                parImpar.setAttribute('color', 'red');
            } else {
                parImpar.setAttribute('color', 'blue');
            }
        }
    
    }    
});

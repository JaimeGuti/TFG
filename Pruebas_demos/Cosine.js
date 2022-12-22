var position_desp_cosine = '-30 21 -15';
var position_ampli_cosine = '-30 7 -15';
var position_inv_cosine = '-20 21 -15';
var position_high_cosine = '-20 7 -15';
var position_frec_cosine = '-10 21 -15';

AFRAME.registerComponent('draw-cos', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
        depth: {default: 1},
        color: {default: 'blue'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#coscanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,72);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,72);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150,y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw sinusoid

            for(x=0; x<=360; x+=1) {
                var desp_y = 180;
                var frec = 90;
                var amplitude = 120;
                var desp_x = 120.0;
                y = desp_y + Math.cos((x + desp_x)*Math.PI/ frec )*amplitude;
                                                    //"zoom"
                this.ctx.lineTo(x, y/2.5); // draw
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

AFRAME.registerComponent('desp-cos', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
        depth: {default: 1},
        color: {default: 'green'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        var mod_desp = 120; 

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#despcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,72);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,72);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150, y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150, y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw sinusoid

            // generate random number between -180 to 250
            var minlimit = -180;
            var maxlimit = 250;
            var randomNum = Math.floor(Math.random() * (maxlimit)) + (minlimit);
            // console.log("Random number = " + randomNum);
            
            mod_desp = mod_desp + randomNum;
            if ((mod_desp <= -200) || (mod_desp >= 200)) {
                mod_desp = 120;
                randomNum = 120;
            }
            
            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.text);
            }
            
            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', position_desp_cosine);
            this.box.setAttribute('width','4px');
            this.box.setAttribute('height','2px');
            this.box.setAttribute('depth','0.5px');
            this.box.setAttribute('color', 'white'); // ¡¡¡ CHANGE THIS !!!
            this.scene.appendChild(this.box);
                        
            this.text = document.createElement('a-text');

            var sign = '';
            if (randomNum => 0) {
                sign = ' + ';
                randomNum = randomNum;
            } 
            if (randomNum < 0){
                sign = ' - ';
                randomNum = -randomNum;
            }

            this.text.setAttribute('value', "y(t) = cos(x " + sign + " "  + randomNum + ")"); // ¡¡¡ CHANGE THIS !!!
            this.text.setAttribute('color', 'red');
            //this.text.setAttribute('position', 'center');
            this.text.setAttribute('position', '-1.8 0 0.25');
            this.text.setAttribute('scale', '2 2 2');
            this.box.appendChild(this.text);

            for(x=0; x<=360; x+=1) {
                var desp_y = 180;
                var frec = 90;
                var amplitude = 120;
                // var desp_x = 45; // DESP
                y = desp_y + Math.cos((x + mod_desp)*Math.PI/ frec )*amplitude;
                                                    //"zoom"
                this.ctx.lineTo(x, y/2.5); // draw
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });

            mod_desp = 120;
        });
    }
});

AFRAME.registerComponent('ampli-cos', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
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

        var amplitude = 120;

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
                this.ctx.moveTo(x+5,72);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,72);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150, y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150, y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw sinusoid

            // generate random number between 1 to 250
            var minlimit = 1;
            var maxlimit = 200;
            var randomNum = Math.floor(Math.random() * (maxlimit)) + (minlimit);
            console.log("Random number = " + randomNum);
            
            amplitude = randomNum;
            if ((amplitude <= 1) || (amplitude >= 200)) {
                amplitude = 120;
                randomNum = 120;
            }
            
            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.text);
            }
            
            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', position_ampli_cosine);
            this.box.setAttribute('width','4px');
            this.box.setAttribute('height','2px');
            this.box.setAttribute('depth','0.5px');
            this.box.setAttribute('color', 'white'); // ¡¡¡ CHANGE THIS !!!
            this.scene.appendChild(this.box);
                        
            this.text = document.createElement('a-text');

            var sign = '';
            if (randomNum => 0) {
                sign = ' + ';
                randomNum = randomNum;
            } 
            if (randomNum < 0){
                sign = ' - ';
                randomNum = -randomNum;
            }

            if (amplitude > 120) {
                var result = "y(t) = " + randomNum + "cos(x)"
            } else if (amplitude < 120){
                var result = "y(t) = 1/" + randomNum + "cos(x)"
            } else {
                var result = "y(t) = cos(x)"
            }

            this.text.setAttribute('value', result);
            this.text.setAttribute('color', 'red');
            //this.text.setAttribute('position', 'center');
            this.text.setAttribute('position', '-1.8 0 0.25');
            this.text.setAttribute('scale', '2 2 2');
            this.box.appendChild(this.text);

            for(x=0; x<=360; x+=1) {
                var desp_y = 180;
                var frec = 90;
                // var amplitude = 50; // AMPLI
                var desp_x = 150; // DESP
                y = desp_y - Math.cos((x - desp_x)*Math.PI/ frec )*amplitude;
                                                    //"zoom"
                this.ctx.lineTo(x, y/2.5); // draw
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

AFRAME.registerComponent('inv-cos', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
        depth: {default: 1},
        color: {default: 'orange'}
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

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,72);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,72);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150, y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150, y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw sinusoid

            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.text);
            }

            if (count % 2 == 0) { // Count pair --> x(-t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_inv_cosine);
                this.box.setAttribute('width','4px');
                this.box.setAttribute('height','2px');
                this.box.setAttribute('depth','0.5px');
                this.box.setAttribute('color', 'white'); // ¡¡¡ CHANGE THIS !!!
                this.scene.appendChild(this.box);
                            
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = cos(-x)");
                this.text.setAttribute('color', 'red');
                // this.text.setAttribute('position', 'center');
                this.text.setAttribute('position', '-1.8 0 0.25');
                this.text.setAttribute('scale', '3 3 3');
                this.box.appendChild(this.text);

                for(x=0; x<=360; x+=1) {
                    var desp_y = 180;
                    var frec = 90;
                    var amplitude = 120; // AMPLI
                    var desp_x = 150; // DESP
                    y = desp_y - Math.cos(-(x - desp_x)*Math.PI/ frec )*amplitude;
                                                        //"zoom"
                    this.ctx.lineTo(x, y/2.5); // draw
                }
                
            } else { // Count odd --> x(t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_inv_cosine);
                this.box.setAttribute('width','4px');
                this.box.setAttribute('height','2px');
                this.box.setAttribute('depth','0.5px');
                this.box.setAttribute('color', 'white'); // ¡¡¡ CHANGE THIS !!!
                this.scene.appendChild(this.box);
                            
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = cos(x)");
                this.text.setAttribute('color', 'black');
                // this.text.setAttribute('position', 'center');
                this.text.setAttribute('position', '-1.7 0 0.25');
                this.text.setAttribute('scale', '3 3 3');
                this.box.appendChild(this.text);

                for(x=0; x<=360; x+=1) {
                    var desp_y = 180;
                    var frec = 90;
                    var amplitude = 120;
                    var desp_x = 120.0;
                    y = desp_y + Math.cos((x + desp_x)*Math.PI/ frec )*amplitude;
                                                        //"zoom"
                    this.ctx.lineTo(x, y/2.5); // draw
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

AFRAME.registerComponent('high-cos', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
        depth: {default: 1},
        color: {default: 'black'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        var desp_y = 180;

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#highcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,72);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,72);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150, y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150, y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw sinusoid

            // generate random number between -70 to 150
            var minlimit = -70;
            var maxlimit = 150;
            var randomNum = Math.floor(Math.random() * (maxlimit)) + (minlimit);
            // console.log("Random number = " + randomNum);
            
            desp_y = desp_y + randomNum;
            if ((desp_y <= -50) || (desp_y >= 360)) {
                desp_y = 180;
                randomNum = 0;
            }
            
            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.text);
            }
            
            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', position_high_cosine);
            this.box.setAttribute('width','4px');
            this.box.setAttribute('height','2px');
            this.box.setAttribute('depth','0.5px');
            this.box.setAttribute('color', 'white'); // ¡¡¡ CHANGE THIS !!!
            this.scene.appendChild(this.box);
                        
            this.text = document.createElement('a-text');

            var sign = '';
            if (randomNum => 0) {
                sign = ' + ';
                randomNum = -randomNum;
            } 
            if (randomNum < 0){
                sign = ' - ';
                randomNum = -randomNum;
            }

            this.text.setAttribute('value', "y(t) = cos(x) " + sign + " " + randomNum);
            this.text.setAttribute('color', 'red');
            //this.text.setAttribute('position', 'center');
            this.text.setAttribute('position', '-1.9 0 0.25');
            this.text.setAttribute('scale', '2.25 2.25 2.25');
            this.box.appendChild(this.text);

            for(x=0; x<=360; x+=1) {
                // var desp_y = 180; // HIGH
                var frec = 90;
                var amplitude = 120; // AMPLI
                var desp_x = 150; // DESP
                y = desp_y - Math.cos((x - desp_x)*Math.PI/ frec )*amplitude;
                                                    //"zoom"
                this.ctx.lineTo(x, y/2.5); // draw
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });

            desp_y = 180;
        });
    }
});

AFRAME.registerComponent('frec-cos', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
        depth: {default: 1},
        color: {default: 'tomato'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        var frec = 90;

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#freccanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,72);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,72);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150, y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150, y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw sinusoid

            // generate random number between 2 to 230
            var minlimit = 0;
            var maxlimit = 180;
            var randomNum = Math.floor(Math.random() * (maxlimit)) + (minlimit);
            // console.log("Random number = " + randomNum);
            
            frec = 181 - randomNum;
            if ((frec < 0) || (frec > 180)) {
                frec = 90;
                randomNum = 0;
            }
            
            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.text);
            }
            
            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', position_frec_cosine);
            // this.box.setAttribute('rotation', "0 45 0");
            this.box.setAttribute('width','4px');
            this.box.setAttribute('height','2px');
            this.box.setAttribute('depth','0.5px');
            this.box.setAttribute('color', 'white'); // ¡¡¡ CHANGE THIS !!!
            this.scene.appendChild(this.box);
                        
            this.text = document.createElement('a-text');

            var sign = '';
            if (randomNum => 0) {
                sign = ' + ';
                randomNum = randomNum;
            } 
            if (randomNum < 0){
                sign = ' - ';
                randomNum = -randomNum;
            }

            if (frec == 1){
                var result = "y(t) = cos(x)";
            } else if (frec < 90) {
                var result = "y(t) = cos(" + randomNum + "x)";
            } else if (frec > 90){
                var result = "y(t) = cos(1/" + randomNum + "x)";
            }

            this.text.setAttribute('value', result);
            this.text.setAttribute('color', 'red');
            //this.text.setAttribute('position', 'center');
            this.text.setAttribute('position', '-1.8 0 0.25');
            this.text.setAttribute('scale', '2.25 2.25 2.25');
            this.box.appendChild(this.text);

            for(x=0; x<=360; x+=1) {
                var desp_y = 180; // HIGH
                // var frec = 45;
                var amplitude = 120; // AMPLI
                var desp_x = 150; // DESP
                y = desp_y - Math.sin((x - desp_x)*Math.PI/ frec )*amplitude;
                                                    //"zoom"
                this.ctx.lineTo(x, y/2.5); // draw
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });

            // frec = 90;
        });
    }
});

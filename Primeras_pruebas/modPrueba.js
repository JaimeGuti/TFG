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
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        el.addEventListener('mousedown', function () {
            // console.log("CLICK");

            this.canvas = document.querySelector("#fourthcanvas");
            this.ctx = this.canvas.getContext('2d');

            // LÍNEAS EJES
            //EJE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,72);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,72);  // ENDING POINT
            }
            //EJE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(50,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(50,y);  // dibujar ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // volver a la izq para dibujar sinusoide

            for(x=0; x<=400; x+=1) {
                var desplazamiento_y = 180;
                var frec = 90;
                var ampli = 120;
                var desplazamiento_x = 0.0;
                var mod_desp = 0;
                   
                y = desplazamiento_y - Math.max(desplazamiento_x, 0)*1;

                if (x < 50 + mod_desp) {
                    this.ctx.lineTo(x, 72);    
                }
                if ((x >= 50)&&(x<=100) + mod_desp) {
                    this.ctx.lineTo(x, y/5);
                }
                if (x > 100 + mod_desp) {
                    this.ctx.lineTo(x, 72);
                }
            }
            this.ctx.stroke(); // trazar en el canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
        });
    }
});

///////////////////////////////////////////////////////////

AFRAME.registerComponent('desp-pulse', {
    schema: {
        width: {default: 5},
        height: {default: 3},
        depth: {default: 2},
        color: {default: 'red'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        el.addEventListener('mousedown', function () {
            // console.log("CLICK");

            this.canvas = document.querySelector("#despcanvas");
            this.ctx = this.canvas.getContext('2d');

            // LÍNEAS EJES
            //EJE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,72);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,72);  // ENDING POINT
            }
            //EJE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(50,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(50,y);  // dibujar ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // volver a la izq para dibujar sinusoide

            for(x=0; x<=400; x+=1) {
                var desplazamiento_y = 180;
                var frec = 90;
                var ampli = 120;
                var desplazamiento_x = 0.0;
                var mod_desp = 50;
                // var mod_ampli = 0;
                   
                y = desplazamiento_y - Math.max(desplazamiento_x, 0)*1; // Modificas altura

                if (x < 0 + mod_desp) {
                    this.ctx.lineTo(0, 72);
                }
                if ((x >= 0 + mod_desp)&&(x < 50 + mod_desp)) {
                    // this.ctx.moveTo(x, 72);
                    this.ctx.lineTo(x, 72);    
                }
                if ((x >= 50 + mod_desp)&&(x <= 100 + mod_desp)) {
                    // this.ctx.moveTo(x, 72);
                    this.ctx.lineTo(x, y/5);
                }
                if (x > 100 + mod_desp) {
                    // this.ctx.moveTo(x, 72)
                    this.ctx.lineTo(x, 72);
                }
            }
            this.ctx.stroke(); // trazar en el canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
        });
    }
});

AFRAME.registerComponent('ampli-pulse', {
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

        el.addEventListener('mousedown', function () {
            // console.log("CLICK");

            this.canvas = document.querySelector("#amplicanvas");
            this.ctx = this.canvas.getContext('2d');

            // LÍNEAS EJES
            //EJE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,72);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,72);  // ENDING POINT
            }
            //EJE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(50,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(50,y);  // dibujar ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // volver a la izq para dibujar sinusoide

            for(x=0; x<=400; x+=1) {
                var desplazamiento_y = 180;
                var frec = 90;
                var ampli = 120;
                var desplazamiento_x = 0.0;
                var mod_desp = 0;
                var mod_ampli = 80;
                   
                y = desplazamiento_y - Math.max(desplazamiento_x + mod_ampli, 0)*1; // Modificas altura

                if (x < 0 + mod_desp) {
                    this.ctx.lineTo(0, 72);
                }
                if ((x >= 0 + mod_desp)&&(x < 50 + mod_desp)) {
                    // this.ctx.moveTo(x, 72);
                    this.ctx.lineTo(x, 72);    
                }
                if ((x >= 50 + mod_desp)&&(x <= 100 + mod_desp)) {
                    // this.ctx.moveTo(x, 72);
                    this.ctx.lineTo(x, y/5);
                }
                if (x > 100 + mod_desp) {
                    // this.ctx.moveTo(x, 72)
                    this.ctx.lineTo(x, 72);
                }
            }
            this.ctx.stroke(); // trazar en el canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
        });
    }
});

AFRAME.registerComponent('inv-pulse', { // ¡¡¡¡¡¡¡¡ REVISAR < >= !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    schema: {
        width: {default: 5},
        height: {default: 3},
        depth: {default: 2},
        color: {default: 'orange'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        el.addEventListener('mousedown', function () {
            // console.log("CLICK");

            this.canvas = document.querySelector("#invcanvas");
            this.ctx = this.canvas.getContext('2d');

            var mod_inv = 200;

            // LÍNEAS EJES
            //EJE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,72);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,72);  // ENDING POINT
            }
            //EJE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(50 + mod_inv,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(50 + mod_inv,y);  // dibujar ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // volver a la izq para dibujar sinusoide

            if (mod_inv != 0) {
               var mod_inv = mod_inv - 50;
            }

            for(x=0; x<=400; x+=1) {
                var desplazamiento_y = 180;
                var frec = 90;
                var ampli = 120;
                var desplazamiento_x = 0.0;
                var mod_desp = 0;
                var mod_ampli = 0;
                   
                y = desplazamiento_y - Math.max(desplazamiento_x + mod_ampli, 0)*1; // Modificas altura

                if (x < 0 - mod_desp + mod_inv) {
                    this.ctx.lineTo(0, 72);
                }
                if ((x >= 0 - mod_desp + mod_inv)&&(x < 50 - mod_desp + mod_inv)) {
                    // this.ctx.moveTo(x, 72);
                    this.ctx.lineTo(x, 72);    
                }
                if ((x >= 50 - mod_desp + mod_inv)&&(x <= 100 - mod_desp + mod_inv)) {
                    // this.ctx.moveTo(x, 72);
                    this.ctx.lineTo(x, y/5);
                }
                if (x > 100 - mod_desp + mod_inv) {
                    // this.ctx.moveTo(x, 72)
                    this.ctx.lineTo(x, 72);
                }
            }
            this.ctx.stroke(); // trazar en el canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
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

        el.addEventListener('mousedown', function () {
            // console.log("CLICK");

            this.canvas = document.querySelector("#highcanvas");
            this.ctx = this.canvas.getContext('2d');

            var mod_inv = 0;

            // LÍNEAS EJES
            //EJE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,72);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,72);  // ENDING POINT
            }
            //EJE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(50 + mod_inv,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(50 + mod_inv,y);  // dibujar ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // volver a la izq para dibujar sinusoide

            if (mod_inv != 0) {
               var mod_inv = mod_inv - 50;
            }

            for(x=0; x<=400; x+=1) {
                var desplazamiento_y = 180;
                var frec = 90;
                var ampli = 120;
                var desplazamiento_x = 0.0;
                var mod_desp = 0;
                var mod_ampli = 0;
                var mod_high = 20;
                   
                y = desplazamiento_y - Math.max(desplazamiento_x + mod_ampli, 0)*1; // Modificas amplitud y

                if (x < 0 - mod_desp + mod_inv) {
                    this.ctx.lineTo(0, 72 + mod_high);
                }
                if ((x >= 0 - mod_desp + mod_inv)&&(x < 50 - mod_desp + mod_inv)) {
                    // this.ctx.moveTo(x, 72);
                    this.ctx.lineTo(x, 72 - mod_high);    
                }
                if ((x >= 50 - mod_desp + mod_inv)&&(x <= 100 - mod_desp + mod_inv)) {
                    // this.ctx.moveTo(x, 72);
                    this.ctx.lineTo(x, (y/5) - mod_high);
                }
                if (x > 100 - mod_desp + mod_inv) {
                    // this.ctx.moveTo(x, 72)
                    this.ctx.lineTo(x, 72 - mod_high);
                }
            }
            this.ctx.stroke(); // trazar en el canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
        });
    }
});
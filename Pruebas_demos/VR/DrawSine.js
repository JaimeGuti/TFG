var position_desp_sine = '-80 21 -5';
var position_ampli_sine = '-80 7 -5';
var position_inv_sine = '-70 21 -5';
var position_high_sine = '-70 7 -5';
var position_frec_sine = '-60 21 -5';

AFRAME.registerComponent('draw-sen', {
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

            this.canvas = document.querySelector("#sinecanvas");
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

            for(x=0; x<=360; x+=1) {
                var desp_y = 180;
                var frec = 90;
                var amplitude = 120;
                var desp_x = 120.0;
                y = desp_y + Math.sin((x + desp_x)*Math.PI/ frec )*amplitude;
                                                    //"zoom"
                this.ctx.lineTo(x, y/2.5); // draw
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
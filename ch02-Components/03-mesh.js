function init() {
    var stats = initStats();
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    scene.add(plane);

    var material = new THREE.MeshLambertMaterial({color: 0x44ff44});
    var geom = new THREE.BoxGeometry(6, 8, 3);
    var cube = new THREE.Mesh(geom, material);
    cube.position.y = 4;
    cube.castShadow = true;
    scene.add(cube);

    camera.position.set(-20, 25, 20);
    camera.lookAt(new THREE.Vector3(5, 0, 0));

    var ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);
    var spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI / 4);
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.position.set(-40, 30, 30);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    var controls = new function() {
        this.visible = true;

        this.scale = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.scaleZ = 1;

        this.positionX = 0;
        this.positionY = 4;
        this.positionZ = 0;

        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;

        this.translateX = 0;
        this.translateY = 0;
        this.translateZ = 0;

        this.translate = function() {
            cube.translateX(controls.translateX);
            cube.translateY(controls.translateY);
            cube.translateZ(controls.translateZ);

            controls.positionX = cube.position.x;
            controls.positionY = cube.position.y;
            controls.positionZ = cube.position.z;
        }
    }

    var gui = new dat.GUI();
    guiScale = gui.addFolder('scale');
    guiScale.add(controls, 'scaleX', 0, 5);
    guiScale.add(controls, 'scaleY', 0, 5);
    guiScale.add(controls, 'scaleZ', 0, 5);
    guiPosition = gui.addFolder('position');
    var contX = guiPosition.add(controls, 'positionX', -10, 10);
    var contY = guiPosition.add(controls, 'positionY', -4, 20);
    var contZ = guiPosition.add(controls, 'positionZ', -10, 10);
    
    contX.listen();
    contX.onChange(function(value) {
        cube.position.x = controls.positionX;
    });
    contY.listen();
    contY.onChange(function(value) {
        cube.position.y = controls.positionY;
    });
    contZ.listen();
    contZ.onChange(function(value) {
        cube.position.z = controls.positionZ;
    });

    guiRotation = gui.addFolder('rotation');
    guiRotation.add(controls, 'rotationX', -4, 4);
    guiRotation.add(controls, 'rotationY', -4, 4);
    guiRotation.add(controls, 'rotationZ', -4, 4);
  
    guiTranslate = gui.addFolder('translate');
    guiTranslate.add(controls, 'translateX', -10, 10);
    guiTranslate.add(controls, 'translateY', -10, 10);
    guiTranslate.add(controls, 'translateZ', -10, 10);
    guiTranslate.add(controls, 'translate');
  
    gui.add(controls, 'visible');
  
    var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();
  
    render();

    function render() {
        trackballControls.update(clock.getDelta());
        stats.update();

        cube.visible = controls.visible;

        cube.scale.set(controls.scaleX, controls.scaleY, controls.scaleZ);

        cube.rotation.x = controls.rotationX;
        cube.rotation.y = controls.rotationY;
        cube.rotation.z = controls.rotationZ;

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
function init() {
    //listen resize events
    window.addEventListener('resize', onResize, false);

    var stats = initStats();

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    //plane
    var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    scene.add(plane);

    //cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xFF0000,
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, 4, 0);
    cube.castShadow = true;
    scene.add(cube);

    //sphere
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff,
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20, 0, 2);
    sphere.castShadow = true;
    scene.add(sphere);

    //camera
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);   //指向场景中心

    //spot light
    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-10, 20, -5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    var ambienLight = new THREE.AmbientLight(0x353535);
    scene.add(ambienLight);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    //call render func
    var step = 0;

    //add gui
    var controls = new function() {
        //添加希望通过data.GUI改变的属性
        this.rotationSpeed = 0.02;  //默认值
        this.bouncingSpeed = 0.03;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);  //设定取值范围0~0.5
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();

    renderScene();

    function renderScene() {
        stats.update();  //更新统计
        trackballControls.update(clock.getDelta());

        //cube.rotation.x += 0.02;
        //cube.rotation.y += 0.02;
        //cube.rotation.z += 0.02;
        //step += 0.04;

        //换成gui控制
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;
        step += controls.bouncingSpeed;

        sphere.position.x = 20 + 10 * Math.cos(step);
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

        //render
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    //自适应浏览器尺寸
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;  //屏幕长宽比
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

function init() {
    //创建场景
    var scene = new THREE.Scene();

    //创建摄像机
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    //创建渲染器
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));   //场景背景颜色
    renderer.setSize(window.innerWidth, window.innerHeight);  //场景大小

    //添加坐标轴
    //var axes = new THREE.AxesHelper(20);   //参数表示粗细值
    //scene.add(axes);

    //添加平面pane
    var planeGeometry = new THREE.PlaneGeometry(60, 20);   //参数为宽和高
    var planeMaterial = new THREE.MeshLambertMaterial({   //材质
        color: 0xAAAAAA
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    //旋转平面
    plane.rotation.x = -0.5 * Math.PI;
    //设置位置
    plane.position.set(15, 0, 0);  //x,y,z值
    plane.receiveShadow = true;
    scene.add(plane);

    //创建一个正方体
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xFF0000,
       // wireframe: true
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, 3, 0);
    cube.castShadow = true;
    scene.add(cube);

    //创建球体
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff,
       // wireframe: true
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20, 4, 2);
    sphere.castShadow = true;
    scene.add(sphere);

    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);   //指向场景中心

    //添加点光源
    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
    scene.add(spotLight);

    //背景光
    //var ambienLight = new THREE.AmbientLight(0x353535);
    //scene.add(ambienLight);

    //将渲染结果添加到div
    document.getElementById("webgl-output").appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
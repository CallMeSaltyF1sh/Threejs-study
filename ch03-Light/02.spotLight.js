function init() {
    var stats = initStats();
    var renderer = initRenderer();
    var camera = initCamera();
    var scene = new THREE.Scene();
    var plane, cube;
    [plane, cube] = addObj(scene);

    var ambientLight = new THREE.AmbientLight("#1c1c1c");
    scene.add(ambientLight);

    /*
    var spotlight = new THREE.SpotLight("#cccccc");
    spotlight.position.set(-40,30,-10);
    spotlight.lookAt(plane);
    scene.add(spotlight);
    */

    //在空间创建一个点作为聚光灯的指向
    var target = new THREE.Object3D();
    target.position = new THREE.Vector3(5, 0, 0);

    var spotlight = new THREE.SpotLight("#ffffff");
    spotlight.position.set(-40, 60, -10);
    spotlight.castShadow = true;    //是否投影
    spotlight.shadow.camera.near = 1;   //投影近点：从距离光源的哪个位置开始生成阴影
    spotlight.shadow.camera.far = 100;  //投影远点：到距离光源的哪个位置可以生成阴影
    spotlight.target = target;   //指向的对象
    spotlight.distance = 0;   //光源照射的距离，0意味着光线强度不会随距离的增加而减弱
    spotlight.angle = 0.4;   //光束的宽度，单位是弧度
    spotlight.shadow.camera.fov = 120;   //投影视场：摄像机能看到的视场的大小，单位为度
    scene.add(spotlight);

    //阴影调试和光源调试
    //var debugCamera = new THREE.CameraHelper(spotlight.shadow.camera);
    //var debugSpot = new THREE.SpotLightHelper(spotlight);
    //scene.add(debugSpot);

    //用于测试的遮挡物
    var sphereG = new THREE.SphereGeometry(0.2);
    var sphereM = new THREE.MeshBasicMaterial({ color: 0xac625 });
    sphere = new THREE.Mesh(sphereG, sphereM);
    sphere.castShadow = true;
    sphere.position = new THREE.Vector3(3, 20, 3);
    scene.add(sphere);

    render();
    function render() {
        stats.update();
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
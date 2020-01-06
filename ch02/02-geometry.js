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

    camera.position.set(-20, 25, 20);
    camera.lookAt(new THREE.Vector3(5, 0, 0));

    var ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);
    var spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI / 4);
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.position.set(-40, 30, 30);
    spotLight.castShadow = true;
    spotLight.lookAt(mesh);
    scene.add(spotLight);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    //通过定义顶点和面创建几何体
    var vertices = [
        new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(1, 3, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 3, -1),
        new THREE.Vector3(-1, 3, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1)
    ];
    var faces = [
        new THREE.Face3(0, 2, 1),  //即由vertices中的点0，2，1形成的面
        new THREE.Face3(2, 3, 1),  //顶点顺序决定面是面向还是背向摄像机
        new THREE.Face3(4, 6, 5),  //面向：顺时针，背向：逆时针
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 4),
    ];

    var geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;
    geom.computeFaceNormals();  //决定每个面的法向量

    var materials = [
        new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }),
        new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0x44ff44, transparent: true })
    ];
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
    mesh.castShadow = true;
    mesh.children.forEach(function (e) {
        e.castShadow = true
    });
    scene.add(mesh);

    function addControlPoint(x, y, z) {
        return new function () {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    var controlPoints = [];
    controlPoints.push(addControlPoint(3, 5, 3));
    controlPoints.push(addControlPoint(3, 5, 0));
    controlPoints.push(addControlPoint(3, 0, 3));
    controlPoints.push(addControlPoint(3, 0, 0));
    controlPoints.push(addControlPoint(0, 5, 0));
    controlPoints.push(addControlPoint(0, 5, 3));
    controlPoints.push(addControlPoint(0, 0, 0));
    controlPoints.push(addControlPoint(0, 0, 3));

    var gui = new dat.GUI();
    for (var i = 0, len = controlPoints.length; i < len; i++) {
        f = gui.addFolder("Vertice" + (i + 1));  //顶点1~8，添加对x、y、z值的控制
        f.add(controlPoints[i], 'x', -10, 10);
        f.add(controlPoints[i], 'y', -10, 10);
        f.add(controlPoints[i], 'z', -10, 10);
    }

    var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();

    render();

    function render() {
        trackballControls.update(clock.getDelta());
        stats.update();

        var vertices = [];
        for (var i = 0, len = controlPoints.length; i < len; i++) {
            vertices.push(new THREE.Vector3(controlPoints[i].x, controlPoints[i].y, controlPoints[i].z));
        }

        mesh.children.forEach(function (e) {
            e.geometry.vertices = vertices;  //指向更新后的顶点数组
            e.geometry.verticesNeedUpdate = true;
            e.geometry.computeFaceNormals();  //重新计算每个面
            delete e.geometry.__directGeometry
        });

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
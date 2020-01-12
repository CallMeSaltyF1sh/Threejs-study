function initRenderer(additionalProperties) {
    var props = (typeof additionalProperties !== 'undefined' && additionalProperties) ? additionalProperties : {};
    var renderer = new THREE.WebGLRenderer(props);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    return renderer;
}

function initCamera(initialPosition) {
    var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(position);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    return camera;
}

function addObj(scene) {
     //为了测试添加的内容
     var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
     var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
     var plane = new THREE.Mesh(planeGeometry, planeMaterial);
     plane.receiveShadow = true;
     plane.rotation.x = -0.5 * Math.PI;
     plane.position.set(15, 0, 0);
     scene.add(plane);

     var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
     var cubeMaterial = new THREE.MeshLambertMaterial({
         color: 0xFF0000,
     });
     var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
     cube.position.set(-4, 4, 0);
     cube.castShadow = true;
     scene.add(cube);

     return [plane, cube]
}

function init() {
    var stats = initStats();
    var renderer = initRenderer();
    var camera = initCamera();
    var scene = new THREE.Scene();
    var plane, cube;
    [plane, cube] = addObj(scene);

    var ambientLight = new THREE.AmbientLight("#1c1c1c");
    scene.add(ambientLight);

    //点光源
    var pointLight = new THREE.PointLight("#cccccc");
    pointLight.decay = 0.1;   //光源强度随距离的增长而衰减的速度
    pointLight.castShadow = true;
    scene.add(pointLight);

    //平行光
    var directionalLight = new THREE.DirectionalLight("#ff5808");
    directionalLight.position.set(-40, 60, -10);
    directionalLight.intensity = 0.5;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    //设置投影的立方体区域
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 2;
    directionalLight.shadow.camera.far = 80;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    scene.add(directionalLight);

    //半球光光源，用于创建户外自然光
    var hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);   //参数分别为从地面发出的光线的颜色、从天空发出的光线的颜色、光强
    hemiLight.position.set(0, 500, 0);
    scene.add(hemiLight);

    //区域光光源，可以模拟窗户照进来的光
    var areaLight = new THREE.RectAreaLight(0xff0000, 500, 4, 10);   //创建一个矩形区域光，参数为光源颜色、光强、宽、高
    areaLight.position.set(-10, 10, -35);
    scene.add(areaLight);

    //镜头光晕
    //var flare = new THREE.LensFlare(texture,size,distance,blending,color,opacity);
    //texture是纹理图片，决定光晕的形状；size单位为像素；distance取0~1之间的值
}
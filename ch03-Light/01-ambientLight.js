function init() {
    var stats = initStats();
    var renderer = initRenderer();
    var camera = initCamera();

    var scene = new THREE.Scene();
    addObj(scene);

    //创建基础光源
    var ambientLight = new THREE.AmbientLight("#606008", 1);
    scene.add(ambientLight);

    //为了方便测试添加聚光灯
    var spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI / 4);
    spotLight.shadow.mapSize.set(2048, 2048);   //设置阴影映射宽度和高度，即决定用多少像素生成阴影
    spotLight.position.set(-30, 40, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    //添加对光源强度和颜色的控制
    var controls = (function () {
        var ctrl = new function () {
            this.intensity = ambientLight.intensity;
            this.ambientColor = ambientLight.color.getStyle();
            this.disableSpotlight = false;
        }

        var gui = new dat.GUI();
        gui.add(ctrl, 'intensity', 0, 3, 0.1).onChange(function (e) {
            ambientLight.color = new THREE.Color(ctrl.ambientColor);
            ambientLight.intensity = ctrl.intensity;
        });
        gui.addColor(ctrl, 'ambientColor').onChange(function (e) {
            ambientLight.color = new THREE.Color(ctrl.ambientColor);
            ambientLight.intensity = ctrl.intensity;
        });
        gui.add(ctrl, 'disableSpotlight').onChange(function (e) {
            spotLight.visible = !e;
        });

        return ctrl;
    })();

    render();

    function render() {
        stats.update();
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}

import * as THREE from "./three/build/three.module.js";

class App {
  constructor() {
    const divContainer = document.querySelector(".skill-3d-container");
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);
    this._renderer = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5e1be); // background
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);

    camera.position.z = 50;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this._scene.add(light);
  }

  _setupModel() {
    // 구모형
    const CircleObject = new THREE.Object3D();
    this._scene.add(CircleObject);

    const circleGeometry = new THREE.SphereGeometry(7, 20, 20);

    const lineMaterial = new THREE.LineBasicMaterial({color: 0x08000});
    const line = new THREE.LineSegments(
      new THREE.WireframeGeometry(circleGeometry),
      lineMaterial
    );

    CircleObject.add(line);

    // 링모형
    const torusGeometry = new THREE.TorusGeometry(17, 7, 10, 30);
    const toruslineMaterial = new THREE.LineBasicMaterial({color: 0x808080});
    const ringLineObject = new THREE.LineSegments(
      new THREE.WireframeGeometry(torusGeometry),
      toruslineMaterial
    );

    CircleObject.add(ringLineObject);

    this._CircleObject = CircleObject;
    this._ringLineObject = ringLineObject;
  } // _setupModal

  // resize
  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.001;
    this._CircleObject.rotation.y = time / 2;
    this._ringLineObject.rotation.x = time * 2;
  }
}

// window.onload = function () {
new App();
// };

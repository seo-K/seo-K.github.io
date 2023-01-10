import * as THREE from "./three/build/three.module.js";
import {FontLoader} from "./three/examples/jsm/loaders/FontLoader.js";
import {TextGeometry} from "./three/examples/jsm/geometries/TextGeometry.js";

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
    // this._setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);

    camera.position.z = 2;
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
    const torusGeometry = new THREE.TorusGeometry(17, 5, 8, 30);
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
    // this._CircleObject.rotation.y = time / 2;
    // this._ringLineObject.rotation.x = time * 2;
  }
}

class App2 {
  constructor() {
    const divContainer = document.querySelector(".skill-text-3d-container");
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

    camera.position.z = 18;
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
    const loader = new FontLoader();
    async function loadFont(that, text, x, y) {
      const url = "../css/fonts/Poppins_Regular.json";
      const font = await new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });

      const geometry = new TextGeometry(text, {
        font: font,
        size: 1.5,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: true, // 베벨링 유무 (false)
        bevelThickness: 0.5, // 베벨링 두께 값(10)
        bevelSize: 0.2, // shape의 외곽선으로부터 얼마나 멀리 베벨링할건지 (5)
        bevelOffset: 0, // text 윤곽선 베벨에서 시작하는 거리 * 필수 (0)
        bevelSegments: 2, // 베벨링 단계수(3)
      });

      geometry.center();

      const materials = [
        new THREE.MeshPhongMaterial({color: 0x808080}), // front
        new THREE.MeshPhongMaterial({color: 0xffffff}), // side
      ];

      const textMesh = new THREE.Mesh(geometry, materials);
      textMesh.castShadow = true;

      textMesh.position.set(x, y);
      textMesh.rotation.set(0, Math.PI * -0.1, 0);

      that._scene.add(textMesh);
    }
    loadFont(this, "HTML", 0, 0);
    loadFont(this, "React.JS", 0, 3);
    loadFont(this, "CSS", 0, 6);
    loadFont(this, "JQuery", 0, 9);
    loadFont(this, "Git", 0, 12);
    loadFont(this, "Bootstrap", 0, -3);
    loadFont(this, "Three.JS", 0, -6);
    loadFont(this, "Swiper", 0, -9);
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
    this._scene.rotation.y = time / 2;
  }
}

// window.onload = function () {
new App();
new App2();
// };

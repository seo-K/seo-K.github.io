import * as THREE from "three";
import {OrbitControls} from "./three/examples/jsm/controls/OrbitControls.js";
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
    this._setupControls();

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

  // OrbitControls 같은 컨트롤 정의
  _setupControls() {
    new OrbitControls(this._camera, this._divContainer);
  }

  // resize
  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  render(time) {
    this._renderer.render(this._scene, this._camera); // scene을 카메라 시점으로 랜더링해라
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.001; // 상단에서 전달받은 time에 0.001을 곱해 milli-second 단위를 second 단위로 변환
    this._CircleObject.rotation.y = time / 2;
    this._ringLineObject.rotation.x = time * 2;
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
    this._setupControls();

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
      });

      geometry.center();

      const materials = new THREE.MeshPhongMaterial({color: 0x808080});

      const textMesh = new THREE.Mesh(geometry, materials);
      textMesh.castShadow = true;

      textMesh.position.set(x, y);
      textMesh.rotation.set(0, Math.PI * -0.1, 0);
      // textMesh.scale.set( s, s, s );
      // 		group.add( mesh );

      that._scene.add(textMesh);

      // this._textMesh = textMesh;
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

  _setupControls() {
    new OrbitControls(this._camera, this._divContainer);
  }

  // resize
  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  render(time) {
    this._renderer.render(this._scene, this._camera); // scene을 카메라 시점으로 랜더링해라
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.001; // 상단에서 전달받은 time에 0.001을 곱해 milli-second 단위를 second 단위로 변환
  }
}

window.onload = function () {
  new App();
  new App2();
};

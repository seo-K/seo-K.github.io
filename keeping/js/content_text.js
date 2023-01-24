import * as THREE from "three";
import {FontLoader} from "./three/examples/jsm/loaders/FontLoader.js";
import {TextGeometry} from "./three/examples/jsm/geometries/TextGeometry.js";
// "_"로 사용되는 이름 : App클래스 내부에서만 사용되는 private field, private method
// ㄴ App 바깥에서는 얘네를 부르면 아니되옴.

class App {
  constructor() {
    const divContainer = document.querySelector("#skill-container");
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);
    this._renderer = renderer;

    const scene = new THREE.Scene();
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
    // ------- 원 생성
    const CircleWrap = new THREE.Object3D();
    this._scene.add(CircleWrap);

    const radius = 16; // 반지름
    const widthSegments = 8;
    const heightSegments = 0;
    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );

    // 선추가
    const lineMaterial = new THREE.LineBasicMaterial({color: 0xffff00});
    const line = new THREE.LineSegments(
      new THREE.WireframeGeometry(sphereGeometry),
      lineMaterial
    );

    this._scene.add(line);
    this._line = line;

    CircleWrap.scale.set(1, 1, 1); // x,y,x 값이며, 원래 geometry 가 갖는 크기보다 xyz 축에 대해 3배 크기로 표시하기 위함.

    // CircleWrap.add(sunMesh);

    const loader = new FontLoader();
    async function loadFont(text, x, y) {
      const url = "../css/fonts/Poppins_Regular.json";
      const font = await new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });

      const geometry = new TextGeometry(text, {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
      });
      // geometry.depthTest = false;
      geometry.center();

      // geometry 위치정렬
      geometry.computeBoundingBox();
      const midX =
        (geometry.boundingBox.max.x - geometry.boundingBox.min.x) / 2.0;
      const midY = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
      const midZ = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

      const materials = [
        new THREE.MeshPhongMaterial({color: 0xfac670}), // front
        new THREE.MeshPhongMaterial({color: 0x91c3ce}), // side
      ];

      const textMesh = new THREE.Mesh(geometry, materials);
      textMesh.castShadow = true;
      // textMesh.position.x = 1;
      // textMesh.position.y = 1;
      // textMesh.position.z = radius;

      console.log(midX, midY, midZ);
      textMesh.rotation.y = Math.PI * 0.25 * y;
      CircleWrap.add(textMesh);
    }

    loadFont("HTML", 0, 0);
    loadFont("React.JS", 1, 1);
    loadFont("CSS", 0, 2);
    loadFont("JQuery", 0, 3);
    // loadFont("Bootstrap", 0, 4);
    // loadFont("Swiper", 0, 5);
    // loadFont("Three.JS", 0, 6);
    // loadFont("Git", 0, 7);
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
};

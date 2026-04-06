import * as THREE from "./build/three.module.js";

class App {
  constructor() {
    const divContainer = document.querySelector(".moon_img");
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio); // 디스플레이 배율 크기
    divContainer.appendChild(renderer.domElement);
    this._renderer = renderer;

    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(transparent);
    renderer.setClearColor(0xffffff, 0); // 배경 투명처리
    this._scene = scene; // field 화

    this._setupCamera();
    this._setupLight();
    this._setupModel();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  // three.js 가 3차원 그래픽을 출력할 영역에 대한 가로/세로 깊이
  _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 43);

    camera.position.z = 2;
    this._camera = camera;
  }

  // 광원 생성 = 광원의 색상, 세기, 광원의 위치
  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity); // 색상과, 세기로 광원 생성
    light.position.set(-1, 2, 4);
    this._scene.add(light); // scene 객체에 구성요소로 추가
  }

  // 모델 생성
  _setupModel() {
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load(
      "./image/common/moon_texture.jpeg",
      (texture) => {
        texture.repeat.x = 2;
        texture.repeat.y = 1;

        texture.wrapS = THREE.MirroredRepeatWrapping;
        texture.wrapT = THREE.MirroredRepeatWrapping;

        texture.offset.x = 10;
        texture.offset.y = 10;
      }
    );

    const circleGeometry = new THREE.SphereGeometry(1, 32, 26, 0);
    const material = new THREE.MeshPhongMaterial({map: map}); // 재질
    const circle = new THREE.Mesh(circleGeometry, material);

    this._scene.add(circle);
    this._circle = circle;
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
    time *= 0.0005; // 상단에서 전달받은 time에 0.001을 곱해 milli-second 단위를 second 단위로 변환
    // this._circle.rotation.x = time;
    this._circle.rotation.y = time;
  }
}

window.onload = function () {
  new App();
};

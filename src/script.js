import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";
import * as dat from 'lil-gui'

// Scene
const scene = new THREE.Scene();
const gui = new dat.GUI()
// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = -(event.clientX / sizes.width - 0.5);
  cursor.y = event.clientY / sizes.height - 0.5;
});

// Object
const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 3, 3, 3);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Debug
gui.add(mesh.position, 'y', -3, 3, 0.01).name('red cube y')



// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//resize function
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updatedProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


//FullScreen
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitFullscreenElement) {
      canvas.webkitFullscreenElement();
    }
  } else {
    if(document.exitFullscreen) {document.exitFullscreen();}
    else if (document.webkitExitFullscreen){
        document.webkitExitFullscreen()
    }
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.001,
  100
);
camera.position.z = 3;
// camera.lookAt(mesh.position)
scene.add(camera);

const canvas = document.querySelector("canvas.webgl");

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// const clock = new THREE.Clock()

function tick() {
  // const elapsedTime = clock.getElapsedTime();

  // camera.position.x = Math.cos(elapsedTime)
  // camera.position.y = Math.sin(elapsedTime)

  camera.position.x = cursor.x * 2;
  camera.position.y = cursor.y * 2;
  camera.lookAt(mesh.position);

  // controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();

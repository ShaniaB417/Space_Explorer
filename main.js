import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#webgl')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.SphereGeometry(10,32,16);
const material = new THREE.MeshBasicMaterial({
  color: 0x4b0082 , wireframe: true
})
const sphere = new THREE.Mesh (geometry, material);

scene.add(sphere)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera,renderer.domElement);




function animate() {
requestAnimationFrame(animate);
renderer.render(scene,camera);
sphere.rotation.y += 0.0005;
sphere.rotation.y += 0.001;
controls.update();

}

animate()

function stars () {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  })
  const star = new THREE.Mesh (geometry, material);
  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(stars)

const spaceBackground = new THREE.TextureLoader().load('background.jpg');
scene.background = spaceBackground;


const planetbackground = new THREE.TextureLoader().load('Planet.jpeg');

const planet = new THREE.Mesh( 
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: planetTexture,})
);

scene.add(planet);

planet.position.z = 30;
planet.position.setX(-10);

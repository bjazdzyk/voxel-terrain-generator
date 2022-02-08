import * as THREE from '/js/Three.js';
import {OrbitControls} from '/js/OrbitControls.js'
import {FlyControls} from '/js/FlyControls.js'

const scene = new THREE.Scene();
scene.background=new THREE.Color('skyblue')
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const texture = new THREE.TextureLoader().load( '/assets/stone.png' );

// // immediately use the texture for material creation
// const material = new THREE.MeshBasicMaterial( { map: texture } );

camera.rotation.order = 'YXZ'

const controls = new FlyControls( camera, renderer.domElement );
controls.movementSpeed = 30;
controls.domElement = renderer.domElement;
controls.rollSpeed = Math.PI / 4;
controls.autoForward = false;
controls.dragToLook = false;

camera.position.z = 50
camera.position.y = 30
//controls.update()
//poc

const vert = [
	// top
  [
	  { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 1], },
	  { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 1], },
	  { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 0], },
	 
	  { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 0], },
	  { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 1], },
	  { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 0], },
	],
  // bottom
  [
	  { pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 1], },
	  { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 1], },
	  { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 0], },
	 
	  { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 0], },
	  { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 1], },
	  { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 0], },
  ],
  // right
  [
	  { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
	  { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
	  { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
	 
	  { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
	  { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
	  { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 0], },
  ],
  // left
  [
	  { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 1], },
	  { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 1], },
	  { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 0], },
	 
	  { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 0], },
	  { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 1], },
	  { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 0], },
  ],
  // front
  [
	  { pos: [-1, -1,  1], norm: [ 0,  0,  1], uv: [0, 1], },
	  { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
	  { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 0], },
	 
	  { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 0], },
	  { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
	  { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 0], },
  ],
  // back
  [
	  { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
	  { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
	  { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 0], },
	 
	  { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 0], },
	  { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
	  { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 0], },
  ]
]

const crd2str =(x, y, z)=>{
	return `${x}:${y}:${z}`
}

noise.seed(Math.random())

const positions=[]
const normals=[]
const uvs=[]

const blocks={}

for(let i=-40; i<40; i++){
	for(let k=-40; k<40; k++){
		for(let j=-30; j<noise.simplex2(i/50, k/50)*5+80; j++){
			let addBlock = false
			if(j+12>Math.abs((noise.simplex2(i/80, k/60)*20))){
				addBlock = true
			}else if(j+7<Math.abs(noise.simplex2(i/60, k/80)*9)){
				addBlock = true
			}

			if(addBlock){
				if(Math.abs(j-15)/15<noise.simplex3(i/50, j/10, k/50)/2){
					if(j+6>Math.abs(noise.simplex2(i/50, k/75)*9)){
						addBlock = false
					}
				}
			}
			if(addBlock){
				blocks[crd2str(i, j, k)] = true
			}
		}
	}
}

const nei=[
	[0,1,0],
	[0,-1,0],
	[1,0,0],
	[-1,0,0],
	[0,0,1],
	[0,0,-1],
]

for(const block in blocks){
	let [x,y,z]=block.split(":")
	x=parseFloat(x)
	y=parseFloat(y)
	z=parseFloat(z)
	for(const i in nei){
		const n=nei[i]
		if(!blocks[`${x+n[0]}:${y+n[1]}:${z+n[2]}`]){
			for (const vertex of vert[i]) {
				const posi=vertex.pos.slice(0)
				posi[0]/=2;
				posi[1]/=2;
				posi[2]/=2;
				posi[0]+=x
				posi[1]+=y
				posi[2]+=z
			  positions.push(...posi);
			  normals.push(...vertex.norm);
			  uvs.push(...vertex.uv);
			}
		}
	}
}



const geometry = new THREE.BufferGeometry();
const positionNumComponents = 3;
const normalNumComponents = 3;
const uvNumComponents = 2;
geometry.addAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
geometry.addAttribute(
    'normal',
    new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
geometry.addAttribute(
    'uv',
    new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial( { map:texture } ))

//const lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2} )
//const edges = new THREE.EdgesGeometry( geometry );
//const line = new THREE.LineSegments( edges, lineMaterial);
scene.add(mesh)

const clock = new THREE.Clock();

function animate() {
	requestAnimationFrame( animate );
	// console.log(camera.position)

	const delta = clock.getDelta();
	camera.rotation.z = 0
	controls.update( delta );
	renderer.render( scene, camera );
};

animate();
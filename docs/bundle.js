import * as THREE from '/js/Three.js';
import {OrbitControls} from '/js/OrbitControls.js'

const scene = new THREE.Scene();
scene.background=new THREE.Color('skyblue')
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.z = 5;
controls.update()

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

const positions=[]
const normals=[]
const uvs=[]

const blocks={}

for(let i=0;i<2;i++){
	for(let j=0;j<2;j++){
		for(let k=0;k<2;k++){
			if(i==0 && j==0 && k==0){
				//nie dodajemy
			}else{
				blocks[`${i}:${j}:${k}`]=true
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
	console.log(x,y,z)
	for(const i in nei){
		const n=nei[i]
		if(!blocks[`${x+n[0]}:${y+n[1]}:${z+n[2]}`]){
			for (const vertex of vert[i]) {
				const posi=vertex.pos.slice(0)
				console.log(posi)
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

const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial( { color: 0x00ff00 } ))

scene.add(mesh)







//kon

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
};

animate();
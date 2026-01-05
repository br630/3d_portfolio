// Three.js Model Viewer Setup

// Scene, Camera, Renderer
const canvas = document.getElementById('modelCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas,
    antialias: true,
    alpha: true 
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

// Background - gradient or solid color
scene.background = new THREE.Color(0x1e3c72);

// Camera position
camera.position.z = 5;
camera.position.y = 1;

// Lighting Setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight1.position.set(5, 5, 5);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight2.position.set(-5, 3, -5);
scene.add(directionalLight2);

// Rim light for better definition
const rimLight = new THREE.DirectionalLight(0x4488ff, 0.3);
rimLight.position.set(0, 5, -5);
scene.add(rimLight);

// OrbitControls for mouse interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 1.5;

// Optional: Add a grid helper for reference (can remove later)
// const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
// scene.add(gridHelper);

// Load your 3D model
// Replace 'models/your-model.glb' with your actual model path
const loader = new THREE.GLTFLoader();
let model;

loader.load(
    'models/Model_1.glb',
    function (gltf) {
        model = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        // Scale model if needed (adjust based on your model size)
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDim;
        model.scale.multiplyScalar(scale);
        
        scene.add(model);
        
        console.log('Model loaded successfully!');
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('Error loading model:', error);
        // If model doesn't load, show a placeholder cube
        createPlaceholder();
    }
);

// Placeholder function (shows a cube if model fails to load)
function createPlaceholder() {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x3498db,
        metalness: 0.3,
        roughness: 0.4
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    console.log('Showing placeholder - replace with your model');
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update controls
    controls.update();
    
    // Optional: Auto-rotate the model slightly
    // Uncomment the lines below if you want gentle rotation
    // if (model) {
    //     model.rotation.y += 0.002;
    // }
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', function() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
});

// Start animation
animate();

// If no model is loaded after 2 seconds, show placeholder
setTimeout(() => {
    if (!model) {
        console.log('No model loaded, showing placeholder');
        createPlaceholder();
    }
}, 2000);

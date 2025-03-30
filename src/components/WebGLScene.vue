<template>
  <div ref="container" class="webgl-container">
    <video
      ref="video"
      src="/src/assets/300325.mp4"
      loop
      playsinline
      style="display: none;"
    ></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const container = ref(null)
const video = ref(null)
let scene, camera, renderer, plane
let moveSpeed = 0.1
let videoTexture
let raycaster, mouse
let isHovered = false
let isDragging = false
let previousMousePosition = { x: 0, y: 0 }
let cameraDistance = 15
let targetCameraDistance = 15
const zoomSpeed = 0.1 // Speed of zoom interpolation

// Movement state
const moveState = {
  forward: false,
  backward: false,
  left: false,
  right: false
}

// Initialize the scene
const init = () => {
  // Create scene
  scene = new THREE.Scene()
  
  // Create renderer first (needed for PMREM)
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  container.value.appendChild(renderer.domElement)
  
  // Load HDR environment map
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()
  
  new RGBELoader()
    .setPath('/hdr/')
    .load('royal_esplanade_1k.hdr', (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture
      scene.environment = envMap
      texture.dispose()
      
      // Add lights after environment is loaded
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)
      
      // Create camera
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 0, 10)
      camera.lookAt(0, 0, 0)
      
      // Create video texture
      videoTexture = new THREE.VideoTexture(video.value)
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      videoTexture.format = THREE.RGBFormat
      
      // Create rounded cube with video on front and back
      const geometry = new RoundedBoxGeometry(5.6, 10, 0.5, 40, 40, 10)
      
      // Create materials for each face
      const materials = [
        new THREE.MeshStandardMaterial({ 
          color: 0x808080,
          metalness: 0.8,
          roughness: 0.2,
          envMapIntensity: 1
        }), // Right
        new THREE.MeshStandardMaterial({ 
          color: 0x808080,
          metalness: 0.8,
          roughness: 0.2,
          envMapIntensity: 1
        }), // Left
        new THREE.MeshStandardMaterial({ 
          color: 0x808080,
          metalness: 0.8,
          roughness: 0.2,
          envMapIntensity: 1
        }), // Top
        new THREE.MeshStandardMaterial({ 
          color: 0x808080,
          metalness: 0.8,
          roughness: 0.2,
          envMapIntensity: 1
        }), // Bottom
        new THREE.MeshBasicMaterial({ 
          map: videoTexture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1,
          color: new THREE.Color(0.5, 0.5, 0.5) // Slightly darker tint
        }), // Front
        new THREE.MeshBasicMaterial({ 
          map: videoTexture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1,
          color: new THREE.Color(0.5, 0.5, 0.5) // Slightly darker tint
        }) // Back
      ]
      
      plane = new THREE.Mesh(geometry, materials)
      scene.add(plane)
      
      // Initialize raycaster and mouse
      raycaster = new THREE.Raycaster()
      mouse = new THREE.Vector2()
      
      // Start playing the video (muted initially)
      video.value.muted = true
      video.value.play()
      
      // Handle window resize
      window.addEventListener('resize', onWindowResize)
      
      // Handle keyboard input
      window.addEventListener('keydown', onKeyDown)
      window.addEventListener('keyup', onKeyUp)
      
      // Handle mouse movement
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('wheel', onMouseWheel)
      
      // Start animation loop
      animate()
    })
}

// Handle mouse movement
const onMouseMove = (event) => {
  // Calculate mouse position in normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  
  // Handle camera rotation when dragging
  if (isDragging) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    }
    
    // Calculate new camera position
    const currentPosition = camera.position.clone()
    const target = new THREE.Vector3(0, 0, 0)
    
    // Rotate around Y axis
    const angleY = deltaMove.x * 0.01
    currentPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), angleY)
    
    // Rotate around X axis (with limits)
    const angleX = deltaMove.y * 0.01
    const currentAngleX = Math.atan2(currentPosition.y, currentPosition.z)
    const newAngleX = currentAngleX - angleX
    
    // Limit vertical rotation to prevent flipping
    if (newAngleX > -Math.PI / 2 && newAngleX < Math.PI / 2) {
      currentPosition.applyAxisAngle(new THREE.Vector3(1, 0, 0), -angleX)
    }
    
    // Update camera position and look at target
    camera.position.copy(currentPosition)
    camera.lookAt(target)
    
    previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    }
  }
}

// Handle mouse down
const onMouseDown = (event) => {
  if (event.button === 0) { // Left click only
    isDragging = true
    previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    }
  }
}

// Handle mouse up
const onMouseUp = () => {
  isDragging = false
}

// Handle mouse wheel zoom
const onMouseWheel = (event) => {
  // Calculate zoom speed based on deltaY
  const zoomDelta = event.deltaY * 0.5
  
  // Get current camera position and target
  const currentPosition = camera.position.clone()
  const target = new THREE.Vector3(0, 0, 0)
  
  // Calculate current distance
  const currentDistance = currentPosition.distanceTo(target)
  
  // Calculate new target distance
  const newDistance = currentDistance + zoomDelta
  
  // Set minimum and maximum zoom distances
  const minDistance = 3
  const maxDistance = 20
  
  // Only update target if within bounds
  if (newDistance >= minDistance && newDistance <= maxDistance) {
    targetCameraDistance = newDistance
  }
}

// Animation loop
const animate = () => {
  requestAnimationFrame(animate)
  
  // Smooth camera zoom
  const currentPosition = camera.position.clone()
  const target = new THREE.Vector3(0, 0, 0)
  const currentDistance = currentPosition.distanceTo(target)
  
  if (Math.abs(currentDistance - targetCameraDistance) > 0.01) {
    // Calculate direction to target
    const direction = currentPosition.clone().sub(target).normalize()
    
    // Interpolate distance
    const newDistance = THREE.MathUtils.lerp(currentDistance, targetCameraDistance, zoomSpeed)
    
    // Calculate new position
    const newPosition = target.clone().add(direction.multiplyScalar(newDistance))
    camera.position.copy(newPosition)
  }
  
  // Update video texture
  if (videoTexture) {
    videoTexture.needsUpdate = true
  }
  
  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera)
  
  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObject(plane)
  
  // Handle hover effect
  if (intersects.length > 0) {
    if (!isHovered) {
      isHovered = true
      // Apply visual effects to all faces
      plane.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = 0.8
          child.material.color = new THREE.Color(1.2, 1.2, 1.2) // Brighten the video
        }
      })
      // Unmute video on hover (do this once, not for each face)
      video.value.muted = false
    }
  } else {
    if (isHovered) {
      isHovered = false
      // Reset visual effects on all faces
      plane.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = 1
          child.material.color = new THREE.Color(1, 1, 1) // Reset to normal
        }
      })
      // Mute video when not hovering (do this once, not for each face)
      video.value.muted = true
    }
  }
  
  // Handle movement
  if (moveState.forward) plane.position.z -= moveSpeed
  if (moveState.backward) plane.position.z += moveSpeed
  if (moveState.left) plane.position.x -= moveSpeed
  if (moveState.right) plane.position.x += moveSpeed
  
  renderer.render(scene, camera)
}

// Handle window resize
const onWindowResize = () => {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  
  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}

// Handle keyboard input
const onKeyDown = (event) => {
  switch(event.key.toLowerCase()) {
    case 'z':
      moveState.forward = true
      break
    case 's':
      moveState.backward = true
      break
    case 'q':
      moveState.left = true
      break
    case 'd':
      moveState.right = true
      break
  }
}

const onKeyUp = (event) => {
  switch(event.key.toLowerCase()) {
    case 'z':
      moveState.forward = false
      break
    case 's':
      moveState.backward = false
      break
    case 'q':
      moveState.left = false
      break
    case 'd':
      moveState.right = false
      break
  }
}

// Cleanup
const cleanup = () => {
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('wheel', onMouseWheel)
  if (video.value) {
    video.value.pause()
    video.value.src = ''
  }
  renderer.dispose()
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  cleanup()
})
</script>

<style scoped>
.webgl-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  cursor: pointer;
  background: #000;
}

:global(body) {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style> 
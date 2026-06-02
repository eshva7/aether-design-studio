import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PremiumAssistant3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    
    // 2. Camera setup with custom depth & FOV for natural product-shot visualization
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. Renderer with antialiasing & premium high-precision color options
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lights: Premium Apple-style Studio Lighting Setup
    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Ice blue fill light
    const fillLight = new THREE.DirectionalLight(0xc1e0ff, 1.1);
    fillLight.position.set(-6, -2, 2);
    scene.add(fillLight);

    // Top soft hair/rim highlights
    const topLight = new THREE.DirectionalLight(0xffffff, 0.8);
    topLight.position.set(0, 6, -1);
    scene.add(topLight);

    // Subtle neon backlight glowing on the shoulders to lift from background
    const backHighlight = new THREE.PointLight(0x00f3ff, 2.0, 10);
    backHighlight.position.set(0, -1, -3);
    scene.add(backHighlight);

    // Ambient light for filled shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // 5. Materials
    // Ultra-luxury glossy porcelain white finish
    const whitePorcelainMat = new THREE.MeshStandardMaterial({
      color: 0xfcfcfc,
      roughness: 0.12,
      metalness: 0.05,
      flatShading: false,
    });

    // High-contrast chrome silver
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.18,
      metalness: 0.85,
    });

    // Glossy deep cosmic visor glass
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x090b16,
      roughness: 0.04,
      metalness: 0.8,
    });

    // Glowing cyan neon eyes & accents
    const eyeMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
    });

    const eyeHoverMat = new THREE.MeshBasicMaterial({
      color: 0x39ff14, // Tech lime/cyan responsive hover color boost
    });

    // 6. Geometry construction: Procedural Assistant Model
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Head container group for cursor-follow rotation
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.4, 0);
    robotGroup.add(headGroup);

    // Head Base: Perfect, seamless glossy sphere
    const headGeo = new THREE.SphereGeometry(1.3, 64, 64);
    const headMesh = new THREE.Mesh(headGeo, whitePorcelainMat);
    headGroup.add(headMesh);

    // Futuristic Face Visor Slot
    // Standard section sphere rotated to cover front face elegantly
    const visorGeo = new THREE.SphereGeometry(1.315, 32, 32, 0, Math.PI, 0.35, 0.7);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.rotation.x = -0.15;
    visorMesh.rotation.y = Math.PI * 0.5; // Rotate front face
    headGroup.add(visorMesh);

    // Glowing Interactive LED Eyes setup:
    // Left eye
    const eyeGeo = new THREE.CircleGeometry(0.12, 32);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.38, 0.05, 1.22);
    leftEye.rotation.y = 0.28;
    leftEye.rotation.x = -0.1;

    // Right eye
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.38, 0.05, 1.22);
    rightEye.rotation.y = -0.28;
    rightEye.rotation.x = -0.1;

    // Eye cluster container allowing micro horizontal parallax tracking!
    const eyeCluster = new THREE.Group();
    eyeCluster.add(leftEye);
    eyeCluster.add(rightEye);
    headGroup.add(eyeCluster);

    // Sleek earphones on both sides of visor
    const earGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.2, 32);
    const leftEar = new THREE.Mesh(earGeo, chromeMat);
    leftEar.position.set(-1.28, 0, 0.1);
    leftEar.rotation.z = Math.PI * 0.55;
    leftEar.rotation.y = 0.1;
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, chromeMat);
    rightEar.position.set(1.28, 0, 0.1);
    rightEar.rotation.z = -Math.PI * 0.55;
    rightEar.rotation.y = -0.1;
    headGroup.add(rightEar);

    // Tech accents inside ears
    const earAccentGeo = new THREE.TorusGeometry(0.16, 0.04, 16, 48);
    const leftEarAccent = new THREE.Mesh(earAccentGeo, eyeMat);
    leftEarAccent.position.set(-1.39, 0, 0.1);
    leftEarAccent.rotation.y = Math.PI * 0.5;
    headGroup.add(leftEarAccent);

    const rightEarAccent = new THREE.Mesh(earAccentGeo, eyeMat);
    rightEarAccent.position.set(1.39, 0, 0.1);
    rightEarAccent.rotation.y = -Math.PI * 0.5;
    headGroup.add(rightEarAccent);

    // Sleek robotic neck
    const neckGeo = new THREE.CylinderGeometry(0.36, 0.39, 0.8, 32);
    const neckMesh = new THREE.Mesh(neckGeo, chromeMat);
    neckMesh.position.set(0, -0.6, 0);
    robotGroup.add(neckMesh);

    // Torso Shoulders structure
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(0, -1.8, 0);
    robotGroup.add(bodyGroup);

    // Premium curved sleek porcelain collar plate
    const torsoGeo = new THREE.SphereGeometry(1.6, 48, 24);
    const torsoMesh = new THREE.Mesh(torsoGeo, whitePorcelainMat);
    torsoMesh.scale.set(1.1, 0.6, 0.7); // Flattened to model realistic sleek collar
    bodyGroup.add(torsoMesh);

    // Inner mechanical silver neck joint base
    const neckJointGeo = new THREE.CylinderGeometry(0.5, 0.55, 0.2, 32);
    const neckJointMesh = new THREE.Mesh(neckJointGeo, chromeMat);
    neckJointMesh.position.set(0, 0.42, 0);
    bodyGroup.add(neckJointMesh);

    // 7. Cursor interaction states
    const mouse = { x: 0, y: 0 };
    const smoothedMouse = { x: 0, y: 0 };
    let isHoveringHero = false;
    let isMobile = false;

    // Detect if device is touch-based/mobile
    const checkViewportMobile = () => {
      isMobile = window.innerWidth < 1024;
    };
    checkViewportMobile();

    // Event listeners
    const handleMouseMove = (event: MouseMoveEvent) => {
      if (isMobile) return;
      
      // Calculate normalized mouse coordinate relative to viewport
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 - 1;
    };

    // Hover listeners over the hero parent block to increase attentiveness
    const heroEl = document.getElementById('hero-section');
    
    const handleHeroMouseEnter = () => {
      isHoveringHero = true;
    };

    const handleHeroMouseLeave = () => {
      isHoveringHero = false;
      // Gently return head to default position when idle
      mouse.x = 0;
      mouse.y = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (heroEl) {
      heroEl.addEventListener('mouseenter', handleHeroMouseEnter);
      heroEl.addEventListener('mouseleave', handleHeroMouseLeave);
    }
    window.addEventListener('resize', checkViewportMobile);

    // 8. Animation & Render engine
    let clock = new THREE.Clock();
    let frameId: number;

    // Blink timer variables
    let blinkTimer = 0;
    let isBlinking = false;
    let blinkState = 1.0; // scale on Y axis

    const animateLoop = () => {
      frameId = requestAnimationFrame(animateLoop);

      const time = clock.getElapsedTime();

      // Slow Breathing animations (Idle)
      const breathingOffsetY = Math.sin(time * 1.4) * 0.16;
      const breathingTiltZ = Math.cos(time * 0.7) * 0.02;
      const breathingRotateY = Math.sin(time * 0.3) * 0.04;

      // Base model floating & dynamic sway
      robotGroup.position.y = breathingOffsetY - 0.2;
      
      // Gentle counter-sway for realistic center-of-mass float
      bodyGroup.rotation.z = -breathingTiltZ * 0.5;
      bodyGroup.rotation.y = breathingRotateY * 0.3;

      // Eye blink cycle management
      blinkTimer += clock.getDelta();
      // Every 4 to 6 seconds make a brief eye blink
      if (!isBlinking && Math.random() < 0.007 && time > blinkTimer + 4) {
        isBlinking = true;
        blinkTimer = time;
      }

      if (isBlinking) {
        // Simple elegant bell-curve scaling for smooth frame interpolation
        blinkState -= 0.22;
        if (blinkState <= 0) {
          blinkState = 0;
          isBlinking = false; // Turn state back up
        }
      } else if (blinkState < 1.0) {
        blinkState += 0.22;
        if (blinkState >= 1.0) {
          blinkState = 1.0;
        }
      }

      // Smooth coordinate interpolation (lerping) for cursor follow stiffness
      const lerpSpeed = isHoveringHero ? 0.08 : 0.04;
      smoothedMouse.x += (mouse.x - smoothedMouse.x) * lerpSpeed;
      smoothedMouse.y += (mouse.y - smoothedMouse.y) * lerpSpeed;

      // Apply blinking and mouse scaling to dynamic eyes
      leftEye.scale.y = blinkState;
      rightEye.scale.y = blinkState;

      // Change eye color texture dynamically on hovering hero to feel responsive & digital
      if (isHoveringHero) {
        leftEye.material = eyeHoverMat;
        rightEye.material = eyeHoverMat;
        leftEarAccent.material = eyeHoverMat;
        rightEarAccent.material = eyeHoverMat;
        backHighlight.color.setHex(0x39ff14);
      } else {
        leftEye.material = eyeMat;
        rightEye.material = eyeMat;
        leftEarAccent.material = eyeMat;
        rightEarAccent.material = eyeMat;
        backHighlight.color.setHex(0x00f3ff);
      }

      // Render behavior conditions targeting mobile vs desktop
      if (!isMobile) {
        // Active rotation limits to avoid unnatural neck snap values (subtle looks realistic!)
        const maxRotY = 0.5; // Roughly 28 degrees left/right
        const maxRotX = 0.3; // Roughly 17 degrees up/down

        // Target rotation combines mouse track and background idle wiggle
        headGroup.rotation.y = smoothedMouse.x * maxRotY + (breathingRotateY * 0.4);
        headGroup.rotation.x = -smoothedMouse.y * maxRotX + Math.sin(time * 0.8) * 0.02;
        
        // Dynamic horizontal/vertical parallax for the glowing eye matrix (creates 3D volume!)
        eyeCluster.position.x = smoothedMouse.x * 0.06;
        eyeCluster.position.y = smoothedMouse.y * 0.04;
      } else {
        // Safe idle track when displaying on mobile/tablets
        headGroup.rotation.y = breathingRotateY;
        headGroup.rotation.x = Math.sin(time * 0.8) * 0.03;
        
        eyeCluster.position.x = 0;
        eyeCluster.position.y = 0;
      }

      renderer.render(scene, camera);
    };

    animateLoop();

    // 9. Resize observer: absolute exact responsive calculations bound to parent canvas bounds
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    });
    
    resizeObserver.observe(container);

    // Cleanup memory immediately on component unmount
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (heroEl) {
        heroEl.removeEventListener('mouseenter', handleHeroMouseEnter);
        heroEl.removeEventListener('mouseleave', handleHeroMouseLeave);
      }
      window.removeEventListener('resize', checkViewportMobile);
      resizeObserver.disconnect();
      
      // Dispose materials & geometries to secure persistent system health
      headGeo.dispose();
      visorGeo.dispose();
      eyeGeo.dispose();
      earGeo.dispose();
      earAccentGeo.dispose();
      neckGeo.dispose();
      torsoGeo.dispose();
      neckJointGeo.dispose();

      whitePorcelainMat.dispose();
      chromeMat.dispose();
      visorMat.dispose();
      eyeMat.dispose();
      eyeHoverMat.dispose();

      try {
        container.removeChild(renderer.domElement);
      } catch (err) {
        // Safe suppression if container was already removed or recycled
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full cursor-pointer z-10 overflow-hidden"
      style={{ touchAction: 'none' }}
    />
  );
}

// Simple typesafe interface for viewport mouse handlers
interface MouseMoveEvent {
  clientX: number;
  clientY: number;
}

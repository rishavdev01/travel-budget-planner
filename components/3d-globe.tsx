"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere } from "@react-three/drei"

function RotatingGlobe() {
  const meshRef = useRef<any>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshPhongMaterial color="#7c3aed" emissive="#5b21b6" shininess={100} wireframe={false} />
    </Sphere>
  )
}

export function Globe3D() {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingGlobe />
      </Canvas>
    </div>
  )
}

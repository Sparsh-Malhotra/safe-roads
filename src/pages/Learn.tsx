import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stage } from '@react-three/drei';
import CarScene from '@/components/CarScene';
import CrossroadScene from '@/components/CarScene2';
import CarScene3 from '@/components/CarScene3';


const SCENES = [
  {
    Component: (props) => <CarScene {...props} />
  },
  {
    Component: (props) => <CrossroadScene {...props} />
  },
  {
    Component: (props) => <CarScene3 {...props} />
  },
]

export default function Learn() {
  const [index, setIndex] = useState(0);
  // const scenes = [<CarScene />, <CrossroadScene />, <CarScene3 />];
  

  // const nextScene = () => {
  //   setIndex((prevIndex) => (prevIndex + 1) % scenes.length);
  // };

  const Component = SCENES[index].Component;

  return (
    <div className="w-screen h-screen">
    <Component 
      index={index}
      setIndex={setIndex}
    />
  </div>
    // <Canvas
    //   camera={{ position: [5, 2, 10], fov: 45 }}
    //   style={{ width: '100vw', height: '100vh' }}
    // >
    //   <Suspense fallback={null}>
    //     <Stage environment="city" intensity={0.6}>
    //       <Model />
    //     </Stage>
    //     <OrbitControls enableZoom={true} autoRotate />
    //   </Suspense>
    // </Canvas>
  );
}



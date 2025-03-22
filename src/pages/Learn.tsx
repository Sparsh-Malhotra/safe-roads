import { useState,Suspense, lazy } from 'react';
import Header from '@/components/Header';

const CarScene = lazy(() => import('@/components/CarScene'));
const CrossroadScene = lazy(() => import('@/components/CarScene2'));
const CarScene3 = lazy(() => import('@/components/CarScene3'));


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
    <div className="relative h-screen w-full overflow-hidden">
      <Header/>
    <div className="w-screen h-screen">
          <Component index={index} setIndex={setIndex} />
    </div>
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



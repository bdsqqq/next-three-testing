import { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, Box, Html } from "drei";
import { useSpring, animated } from "@react-spring/three";

const MyBox = (props) => {
  const AnimatedBox = animated(Box);
  const mesh = useRef();
  const wireframe = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const spring = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray",
  });

  useFrame(
    () =>
      (wireframe.current.rotation.x = wireframe.current.rotation.y = mesh.current.rotation.x = mesh.current.rotation.y += 0.01)
  );

  return (
    <>
      <AnimatedBox
        args={[1, 1, 1]}
        {...props}
        ref={mesh}
        scale={spring.scale}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <animated.meshStandardMaterial attach="material" color={spring.color} />
      </AnimatedBox>
      <AnimatedBox ref={wireframe} scale={spring.scale}>
        <meshBasicMaterial attach="material" color="white" wireframe />
      </AnimatedBox>
    </>
  );
};

const HtmlContent = () => {
  return (
    <>
      <h1>hello</h1>
      <p>world</p>
    </>
  );
};

const BoxesPage = () => {
  return [
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <MyBox position={[0, 0, 0]} />
      <Html scaleFactor={15}>
        <HtmlContent />
      </Html>
      <OrbitControls />
    </Canvas>,
  ];
};

export default BoxesPage;

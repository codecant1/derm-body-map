export default function Pin({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.03, 12, 12]} />  {/* 2x size */}
      <meshStandardMaterial color="purple" />     {/* Changed to blue */}
    </mesh>
  );
}

export default function Pin({ position, scale = 0.3, color = "purple" }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

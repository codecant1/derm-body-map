// utils/femaleAnatomyMap.js
export function getFemaleAnatomicalLabel(position) {
  const { x, y, z } = position;

  if (y > 1.4) return 'Vertex of the Scalp (Female)';
  if (y > 1.1) return 'Frontal Scalp (Female)';
  if (y > 0.9 && x < 0) return 'Left Cheek (Female)';
  if (y > 0.9 && x >= 0) return 'Right Cheek (Female)';
  if (
    x >= -0.09 && x <= 0.13 &&
    y >= 0.16 && y <= 0.39 &&
    z >= 1.47 && z <= 1.55
  ) {
    return 'Nasal Tip (Female)';
  }
  if (
    x >= -0.105 && x <= -0.095 &&
    y >= 0.22 && y <= 0.39 &&
    z >= 1.34 && z <= 1.47
  ) {
    return 'Right Supralar Crease (Female)';
  }
  if (
    x >= 0.095 && x <= 0.105 &&
    y >= 0.22 && y <= 0.39 &&
    z >= 1.34 && z <= 1.47
  ) {
    return 'Left Supralar Crease (Female)';
  }
  if (
    x >= -0.06 && x <= 0.07 &&
    y >= 0.02 && y <= 0.18 &&
    z >= 1.29 && z <= 1.48
  ) {
    return 'Columella (Female)';
  }
  if (
    x >= 0.11 && x <= 0.26 &&
    y >= 0.17 && y <= 0.34 &&
    z >= 1.23 && z <= 1.50
  ) {
    return 'Left Ala (Female)';
  }
  if (
    x >= -0.26 && x <= -0.11 &&
    y >= 0.17 && y <= 0.34 &&
    z >= 1.23 && z <= 1.50
  ) {
    return 'Right Ala (Female)';
  }

  return 'Unknown Region (Female)';
}

export function rotationVectorFromAngle(angleInDegrees: number) {
  const angleInRadians = angleInDegrees * Math.PI / 180;
  return [Math.sin(angleInRadians), Math.cos(angleInRadians)];
}

export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

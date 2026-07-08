import * as THREE from "three";

/** Convert lat/long (degrees) to a point on a sphere of the given radius. */
export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/**
 * Great-circle arc between two lat/long points, lifted off the surface so it
 * bows outward. `height` is the peak lift as a fraction of radius.
 * Returns `segments + 1` points along the arc.
 */
export function greatCircleArc(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  radius: number,
  height: number,
  segments = 128,
): THREE.Vector3[] {
  const start = latLngToVector3(from.lat, from.lng, radius).normalize();
  const end = latLngToVector3(to.lat, to.lng, radius).normalize();
  const points: THREE.Vector3[] = [];
  const angle = start.angleTo(end);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Spherical interpolation between the two surface directions.
    const point = new THREE.Vector3().copy(start).lerp(end, t);
    if (angle > 1e-6) {
      const sinAngle = Math.sin(angle);
      const a = Math.sin((1 - t) * angle) / sinAngle;
      const b = Math.sin(t * angle) / sinAngle;
      point.copy(start).multiplyScalar(a).addScaledVector(end, b);
    }
    point.normalize();
    // Lift: a smooth arch that is zero at the endpoints, peaks at the middle,
    // scaled by how far apart the cities are (long crossings bow higher).
    const lift = Math.sin(Math.PI * t) * height * (0.4 + angle / Math.PI);
    point.multiplyScalar(radius + radius * lift);
    points.push(point);
  }
  return points;
}

/**
 * Quaternion that rotates a globe so `point` (a direction from its centre)
 * turns to face `toward` (default: the camera, +Z). Used to swing each city
 * into view as the story scrolls.
 */
export function faceQuaternion(
  point: THREE.Vector3,
  toward = new THREE.Vector3(0, 0, 1),
): THREE.Quaternion {
  return new THREE.Quaternion().setFromUnitVectors(point.clone().normalize(), toward.clone().normalize());
}

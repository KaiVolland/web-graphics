export class ObjParser {

  static readObj(objString: string) {
    const coordinates: number[] = [];
    const textureCoordinates: number[] = [];
    const normals: number[] = [];

    objString.split('\n').forEach(line => {
      const tokens = line.split(' ');
      const type = tokens.shift();
      if (type === 'v') {
        coordinates.push(...tokens.map(Number));
      } else if (type === 'vt') {
        textureCoordinates.push(...tokens.map(Number));
      } else if (type === 'vn') {
        normals.push(...tokens.map(Number));
      } else if (type === 'f') {
        tokens.forEach(token => {
          const [coordIndex, textureIndex, normalIndex] = token.split('/').map(Number);
          coordinates.push(...coordinates.slice((coordIndex - 1) * 3, coordIndex * 3));
          textureCoordinates.push(...textureCoordinates.slice((textureIndex - 1) * 2, textureIndex * 2));
          normals.push(...normals.slice((normalIndex - 1) * 3, normalIndex * 3));
        });
      }
    });

    return {
      coordinates: new Float32Array(coordinates),
      textureCoordinates: new Float32Array(textureCoordinates),
      normals: new Float32Array(normals),
    }
  }
}

export class Result {
  results: Array<Results>;
}

export class Results {
  // tslint:disable-next-line:variable-name
  formatted_address: string;
  geometry: Geometry;
}

export class Geometry {
  location: Location;
}

export class Location {
  lat: number;
  lng: number;
}

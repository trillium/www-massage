import * as yaml from "js-yaml"

function hasNestedObjects(obj: Record<string, any>): boolean {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      return true;
    }
  }
  return false;
}

export function dumpData(obj: Record<string, any>): string {
  if (hasNestedObjects(obj)) {
    throw new Error("Object contains nested objects");
  }
  return yaml.dump(obj);
}

export function loadData(str: string): object {
  return yaml.load(str) as object
}
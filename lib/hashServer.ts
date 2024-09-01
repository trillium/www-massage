"use server"

import { getHash } from "./hash"

type HashableObject = {
  [key: string]: any
  hash?: string
}

type ValidationResult = {
  validated: boolean
  data: HashableObject
}

/**
 * Encodes an object by adding a hash property.
 *
 * @param {HashableObject} obj - The input object to encode.
 * @returns {HashableObject} The new object with an additional hash property.
 */
export async function encode(obj: HashableObject): Promise<HashableObject> {
  const dataString = JSON.stringify(obj)
  const hash = getHash(dataString)
  return { key: hash, data: obj }
}


/**
 * Decodes an object by validating its hash property.
 *
 * @param {HashableObject} obj - The input object with a hash property to validate.
 * @returns {boolean} True if the hash is valid, otherwise false.
 */
export async function decode(obj: HashableObject): Promise<ValidationResult> {
  if (!obj.key) {
    return { validated: false, data: obj }
  }
  const { hash, ...dataWithoutHash } = obj
  const dataString = JSON.stringify(dataWithoutHash)
  const validHash = await getHash(dataString)
  return { validated: hash === validHash, data: dataWithoutHash }
}

// Example usage
export async function exampleUsage() {
  const originalObject: HashableObject = { key1: "value1", key2: "value2" }
  
  // Encode the object
  const encodedObject = await encode(originalObject)
  console.log("Encoded Object:", encodedObject)
  
  // Decode the object
  const validationResult = await decode(encodedObject)
  console.log("Validation Result:", validationResult)
  
  // Compare hashes
  if (validationResult.validated) {
    console.log("Hashes are equal.")
  } else {
    console.log("Hashes are not equal.")
  }
}
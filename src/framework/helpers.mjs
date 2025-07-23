import fs from "fs"
import crypto from "crypto"

export const doubleHashFile = (filePath, alg1 = 'sha256', alg2 = 'blake2s256', encoding = 'base64url') =>
  new Promise((resolve, reject) => {
    const hash1 = crypto.createHash(alg1)
    const hash2 = crypto.createHash(alg2)
    const stream = fs.createReadStream(filePath)

    stream.on('error', reject)
    stream.on('data', chunk => {
      hash1.update(chunk)
      hash2.update(chunk)
    })
    stream.on('end', () => resolve(hash1.digest(encoding) + hash2.digest(encoding)))
  })

export function hashFileSync(filePath, algorithm = 'sha256', encoding = 'base64') {
  const fileBuffer = fs.readFileSync(filePath)
  const hash = crypto.createHash(algorithm)
  hash.update(fileBuffer)
  return hash.digest(encoding)
}

export const useSettings = (path, defaultValue = null) => ({
  read: () => JSON.parse(fs.readFileSync(path).toString() ?? 'null') ?? defaultValue,
  write: (json) => fs.writeFileSync(
    path,
    JSON.stringify(json, null, 2),
    { encoding:'utf8', flag:'w' }
  )
})

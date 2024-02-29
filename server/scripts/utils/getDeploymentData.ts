import { readFile } from 'fs/promises'
import path from 'path'

/**
 * Reads the contract deployment files (contract & abi).
 * NOTE: Base directory can be configured via the `DIR` environment variable
 */

export const getDeploymentData = async (contractName: string) => {
  const baseDir = process.env.DIR || './artifacts'
  const contractPath = path.join(path.resolve(), baseDir, contractName)

  let abi, contract
  try {
    abi = JSON.parse(await readFile(path.join(contractPath, `${contractName}.json`), 'utf-8'))
    contract = await readFile(path.join(contractPath, `${contractName}.contract`))
  } catch (e) {
    console.error(e)
    throw new Error("Couldn't find contract deployment files. Did you build it via `pnpm build`?")
  }

  return {
    contractPath,
    abi,
    contract,
  }
}
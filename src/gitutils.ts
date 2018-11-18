import { exec } from "child_process"
import { promisify } from "util"

const execPromisified = promisify(exec)

export interface ExecOutput {
  stdout: string
  stderr: string
}

export async function getBranchName(): Promise<ExecOutput> {
  const cmd = "git rev-parse --abbrev-ref HEAD"
  return execPromisified(cmd)
}

export async function getOriginUrl(): Promise<ExecOutput> {
  const cmd = "git config remote.origin.url"
  return execPromisified(cmd)
}

export async function getGitFilePath(filepath: string): Promise<ExecOutput> {
  const cmd = `git ls-files --full-name ${filepath}`
  return execPromisified(cmd)
}

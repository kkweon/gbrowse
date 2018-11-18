enum Protocol {
  SSH,
  GITHUB,
}

function getProtocol(url: string): Protocol {
  return url.slice(0, 4) === "git@" ? Protocol.SSH : Protocol.GITHUB
}

export function removeUnnecessaryGit(url: string): string {
  return url.replace(/\.git$/, "")
}

export function convertToUrl(
  url: string,
  branchName?: string,
  filepath?: string,
): string {
  const protocol = getProtocol(url)
  const cleanUrl = getCleanUrl(url, protocol)

  if (branchName) {
    return postProcessUrl(cleanUrl, branchName, filepath)
  }
  return postProcessUrl(cleanUrl, "master", filepath)
}

const GITHUB_PREFIX = "https://github.com"

function getCleanUrl(url: string, protocol: Protocol): string {
  if (protocol === Protocol.SSH) {
    const tail: string = url.split(":")[1]
    const cleanGitPath = removeUnnecessaryGit(tail)
    return `${GITHUB_PREFIX}/${cleanGitPath}`
  }
  return removeUnnecessaryGit(url)
}

function postProcessUrl(
  url: string,
  branchname?: string,
  filepath?: string,
): string {
  const withBranch = processBranchName(url, branchname)
  return processFilename(withBranch, filepath)
}

function processBranchName(url: string, branchname?: string): string {
  if (branchname) {
    return `${url}/tree/${branchname}`
  }
  return `${url}/tree/master`
}

function processFilename(withBranchName: string, filepath?: string): string {
  if (filepath) {
    return `${withBranchName}/${filepath}`
  }
  return withBranchName.replace(/\/tree\/master$/, "")
}

export function isGitHubRepo(url: string): boolean {
  return (
    url
      .replace(/https:\/\//, "")
      .replace("git@", "")
      .slice(0, 6) === "github"
  )
}

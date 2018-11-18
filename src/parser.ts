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

export function convertToUrl(url: string, branchName?: string): string {
  const protocol = getProtocol(url)
  if (protocol === Protocol.SSH) {
    const tail = url.split(":")[1]

    if (branchName) {
      return `https://github.com/${removeUnnecessaryGit(
        tail,
      )}/tree/${branchName}`
    }
    return `https://github.com/${removeUnnecessaryGit(tail)}`
  }

  if (branchName) {
    return `${removeUnnecessaryGit(url)}/tree/${branchName}`
  }
  return `${removeUnnecessaryGit(url)}`
}

export function isGitHubRepo(url: string): boolean {
  return (
    url
      .replace(/https:\/\//, "")
      .replace("git@", "")
      .slice(0, 6) === "github"
  )
}

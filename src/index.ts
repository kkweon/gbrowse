import open from "open"
import { getBranchName, getGitFilePath, getOriginUrl } from "./gitutils"
import { convertToUrl } from "./parser"

export async function main(files?: string[]) {
  const originUrl = await getOriginUrl()
  const branchName = await getBranchName()

  if (originUrl.stderr === "" && branchName.stderr === "") {
    if (files && files.length) {
      const filepathList = await Promise.all(files.map(getGitFilePath))
      return filepathList.forEach(fp =>
        open(
          convertToUrl(
            originUrl.stdout.trim(),
            branchName.stdout.trim(),
            fp.stdout.trim(),
          ),
        ),
      )
    }

    open(convertToUrl(originUrl.stdout.trim(), branchName.stdout.trim()))
  }
}

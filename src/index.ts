import open from "open"
import { getBranchName, getOriginUrl } from "./gitutils"
import { convertToUrl } from "./parser"

export async function main() {
  const originUrl = await getOriginUrl()
  const branchName = await getBranchName()

  if (originUrl.stderr === "" && branchName.stderr === "") {
    open(convertToUrl(originUrl.stdout.trim(), branchName.stdout.trim()))
  }
}

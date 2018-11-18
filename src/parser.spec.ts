import { expect } from "chai"
import { convertToUrl, isGitHubRepo, removeUnnecessaryGit } from "./parser"

describe("parser", function() {
  describe("convertToUrl", function() {
    it("should return https://github.com/kkweon/gbrowse", function() {
      expect(convertToUrl("git@github.com:kkweon/gbrowse.git")).to.equal(
        "https://github.com/kkweon/gbrowse",
      )
    })

    it("should return https://github.com/kkweon/gbrowse", function() {
      expect(convertToUrl("https://github.com/kkweon/gbrowse.git")).to.equal(
        "https://github.com/kkweon/gbrowse",
      )
    })

    it("should return https://github.com/kkweon/gbrowse/tree/develop", function() {
      expect(
        convertToUrl("https://github.com/kkweon/gbrowse.git", "develop"),
      ).to.equal("https://github.com/kkweon/gbrowse/tree/develop")
    })

    it("should return https://github.com/kkweon/gbrowse/tree/develop", function() {
      expect(
        convertToUrl("git@github.com:kkweon/gbrowse.git", "develop"),
      ).to.equal("https://github.com/kkweon/gbrowse/tree/develop")
    })
  })

  describe("isGitHubRepo", function() {
    it("should return true if it's not a GitHub repository", function() {
      const result = isGitHubRepo(
        "https://github.com/kkweon/DeepLearningZeroToAll.git",
      )
      expect(result).to.be.true
    })

    it("should return true", function() {
      const result = isGitHubRepo("git@github.com:kkweon/gbrowse.git")
      expect(result).to.be.true
    })

    it("should return false", function() {
      const result = isGitHubRepo("https://gitlab.com/kkweon/resume.git")
      expect(result).to.be.false
    })

    it("should return false", function() {
      const result = isGitHubRepo("https://gitlab.com/github/github.com.git")
      expect(result).to.be.false
    })
  })

  describe("removeUnnecessaryGit", function() {
    it("should remove .git", function() {
      const input = "https://gitlab.com/github/github.com.git"
      expect(removeUnnecessaryGit(input)).to.equal(
        "https://gitlab.com/github/github.com",
      )
    })
  })
})

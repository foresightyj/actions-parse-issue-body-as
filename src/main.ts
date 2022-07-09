import * as core from '@actions/core';
import * as github from "@actions/github";

function isValidUrl(urlString: string): boolean {
  const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}

async function run(): Promise<void> {
  const issue = github.context.payload.issue;
  if (!issue) {
    core.warning("no issue, return");
    return;
  }
  core.warning(`issue: ${JSON.stringify(issue)}`);
  const body = issue.body?.trim();
  if (!body) {
    core.warning("empty issue body, return");
    return;
  }
  if (isValidUrl(body)) {
    core.setFailed("empty issue body, return")
    return;
  }
  core.setOutput("url", body);
}

run()

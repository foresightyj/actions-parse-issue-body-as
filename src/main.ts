import * as core from '@actions/core';
import * as github from "@actions/github";

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
  try {
    const parsed = JSON.parse(body);
    core.setOutput("json", JSON.stringify(parsed));
  } catch (err) {
    core.setFailed(`Failed to parse as json: ${body}`)
  }
}

run()

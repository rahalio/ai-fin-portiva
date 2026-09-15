/**
 * Postman-collection 1:1 Vitest tests for overlap (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  limit: "",
  overlapClusterId: "",
  status: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / overlap (1:1 generated)", () => {

  it("listOverlapClusters", async () => {
    const url = sub("{{baseUrl}}/v1/overlaps?cursor={{cursor}}&limit={{limit}}&status={{status}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("getOverlapCluster", async () => {
    const url = sub("{{baseUrl}}/v1/overlaps/{{overlapClusterId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("mergeOverlapCluster", async () => {
    const url = sub("{{baseUrl}}/v1/overlaps/{{overlapClusterId}}/merge");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"survivingInitiativeId\": \"ini_01HZYXK8J0M0W5N6P7Q8R9S0T1U2\",\n  \"notes\": \"\"\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("killOverlapMember", async () => {
    const url = sub("{{baseUrl}}/v1/overlaps/{{overlapClusterId}}/kill-member");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"initiativeId\": \"ini_01HZYXK8J0M0W5N6P7Q8R9S0T1U2\",\n  \"notes\": \"\"\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("keepOverlapDifferentiated", async () => {
    const url = sub("{{baseUrl}}/v1/overlaps/{{overlapClusterId}}/keep-differentiated");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"differentiationNotes\": \"\"\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});

import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("joins conditional class names", () => {
    expect(cn("card", false && "hidden", "active")).toBe("card active");
  });

  it("resolves conflicting Tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});

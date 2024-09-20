import { describe, expect, test } from "vitest";
import { isEmail } from "@/utils/validator";

describe("Testing email validator", () => {
  test("Success", () => {
    expect(isEmail("test@test.com")).toBeTruthy();
    expect(isEmail("test@test.fr")).toBeTruthy();
    expect(isEmail("")).toBeTruthy();
    expect(isEmail(null)).toBeFalsy();
    expect(isEmail(undefined)).toBeFalsy();
  });

  test("Falure", () => {
    expect(isEmail("", true)).toBeFalsy();
    expect(isEmail(null, true)).toBeFalsy();
    expect(isEmail(undefined, true)).toBeFalsy();
    expect(isEmail("test")).toBeFalsy();
    expect(isEmail("aze@aze")).toBeFalsy();
    expect(isEmail("aze.fr")).toBeFalsy();
  });
});

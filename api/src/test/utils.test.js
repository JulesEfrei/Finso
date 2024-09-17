import { describe, expect, test } from "vitest";
import { isEmail, isNull } from "../utils/validator";

describe("Testing email validator", () => {
  test("Success", () => {
    expect(isEmail("test@test.com")).toBeTruthy();
    expect(isEmail("test@test.fr")).toBeTruthy();
  });

  test("Falure", () => {
    expect(isEmail("")).toBeFalsy();
    expect(isEmail(null)).toBeFalsy();
    expect(isEmail(undefined)).toBeFalsy();
    expect(isEmail("test")).toBeFalsy();
    expect(isEmail("aze@aze")).toBeFalsy();
    expect(isEmail("aze.fr")).toBeFalsy();
  });
});

describe("Testing null validator", () => {
  test("Success", () => {
    expect(isNull(["test@test.com", ""])).toBeTruthy();
    expect(isNull([""])).toBeTruthy();
    expect(isNull([null])).toBeTruthy();
    expect(isNull([undefined])).toBeTruthy();
  });

  test("Falure", () => {
    expect(isNull(["aze"])).toBeFalsy();
  });
});

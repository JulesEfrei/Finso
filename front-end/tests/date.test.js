import { expect, test } from "vitest";
import { formatDateToDMY, monthlyDate } from "../src/utils/date";

test("Testing format date method to DD/MM/YY", () => {
  expect(formatDateToDMY(null)).toBe("01/01/1970");
  expect(formatDateToDMY(new Date("05-01-2024"))).toBe("05/01/2024");
});

test("Testing first and last day of the month", () => {
  expect(monthlyDate(new Date())).toStrictEqual(["09/01/2024", "09/30/2024"]);
  expect(monthlyDate()).toStrictEqual(["09/01/2024", "09/30/2024"]);
  expect(monthlyDate(new Date("05-01-2024"))).toStrictEqual([
    "05/01/2024",
    "05/31/2024",
  ]);
});

import { formatPhone } from "../utils/formatPhone";

describe("formatPhone", () => {
  it("formats a valid 10-digit number correctly", () => {
    expect(formatPhone("1234567890")).toBe("(123) 456 7890");
  });

  it("returns input unchanged if not 10 digits", () => {
    expect(formatPhone("12345")).toBe("12345");
    expect(formatPhone("abcdefghij")).toBe("abcdefghij");
  });

  it("returns input unchanged for empty string", () => {
    expect(formatPhone("")).toBe("");
  });
});

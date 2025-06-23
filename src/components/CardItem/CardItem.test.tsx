import React from "react";
import { render } from "@testing-library/react-native";
import CardItem from "./CardItem";

describe("CardItem", () => {
  const mockProps = {
    jobName: "Software Engineer",
    wagePerHourInCents: "50",
    companyName: "TechCorp",
    branch: "Warsaw",
    milesToTravel: 1.2,
  };

  it("renders job name in subheader", () => {
    const { getByText } = render(<CardItem {...mockProps} />);
    expect(getByText("Software Engineer")).toBeTruthy();
  });

  it("renders wage per hour correctly", () => {
    const { getByText } = render(<CardItem {...mockProps} />);
    expect(getByText("50 ¢/hour")).toBeTruthy();
  });

  it("renders company and branch correctly", () => {
    const { getByText } = render(<CardItem {...mockProps} />);
    expect(getByText("TechCorp, Warsaw")).toBeTruthy();
  });

  it("renders miles to travel correctly", () => {
    const { getByText } = render(<CardItem {...mockProps} />);
    expect(getByText("1.2 miles from you")).toBeTruthy();
  });
});

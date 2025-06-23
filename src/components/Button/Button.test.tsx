import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "./Button";

describe("Button component", () => {
  it("renders correctly with given title", () => {
    const { getByTestId } = render(<Button title="Click me" />);
    expect(getByTestId("button-title").props.children).toBe("Click me");
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button title="Press" onPress={onPressMock} />
    );

    fireEvent.press(getByTestId("button-pressable-inner"));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button title="Disabled" onPress={onPressMock} disabled />
    );

    fireEvent.press(getByTestId("button-pressable"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("applies correct theme when disabled is true", () => {
    const { getByTestId } = render(<Button title="Theme Test" disabled />);
    expect(getByTestId("button-title").props.style.color).toBe("#FFFFFF");
  });

  it("handles press in and out state changes", () => {
    const { getByTestId } = render(<Button title="Press Me" />);
    const pressable = getByTestId("button-pressable");

    fireEvent(pressable, "pressIn");
    fireEvent(pressable, "pressOut");
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import Header from "./Header";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({
    top: 20,
  }),
}));

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: jest.fn(() => ({
      goBack: jest.fn(),
    })),
  };
});

describe("Header", () => {
  it("renders title", () => {
    const { getByText } = render(<Header title="Hello World" />);
    expect(getByText("Hello World")).toBeTruthy();
  });

  it("hides left button when isLeftButtonShown is false", () => {
    const { queryByText } = render(
      <Header title="Test" isLeftButtonShown={false} />
    );
    expect(queryByText("←")).toBeNull();
  });

  it("calls navigation.goBack when left icon is pressed", () => {
    const goBackMock = jest.fn();

    const mockNavigation = {
      goBack: goBackMock,
    };

    // Переопределяем поведение useNavigation внутри теста
    const { useNavigation } = require("@react-navigation/native");
    useNavigation.mockReturnValue(mockNavigation);

    const mockIcon = <Text>←</Text>;
    const { getByText } = render(
      <Header title="Back test" leftIcon={mockIcon} />
    );

    fireEvent.press(getByText("←").parent!);
    expect(goBackMock).toHaveBeenCalledTimes(1);
  });
  it("renders empty title when title is undefined", () => {
    const { getByText } = render(<Header title={undefined} />);
    expect(getByText("")).toBeTruthy();
  });
});

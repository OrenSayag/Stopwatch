import React from "react";
import { Stopwatch } from "./Stopwatch";

export default {
  title: "components/Stopwatch",
  component: Stopwatch,
};

const Template = (args: any) => <Stopwatch {...args} />;

export const Blue: any = Template.bind({});
Blue.args = {
  lapRecorder: () => {
    alert("Hello from lap recroder");
  },
  textColor: "text-blue-500",
};

export const Red: any = Template.bind({});
Red.args = {
  lapRecorder: () => {
    alert("Hello from lap recroder");
  },
  textColor: "text-red-500",
};

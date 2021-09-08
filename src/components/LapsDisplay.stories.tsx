import React from "react";
import { LapsDisplay } from "./LapsDisplay";

export default {
  title: "components/LapsDisplay",
  component: LapsDisplay,
};

const Template = (args: any) => <LapsDisplay {...args} />;

export const Primary: any = Template.bind({});
Primary.args = {
  laps: [
    { lapIndex: 1, ms: "1", secs: "1", mins: "1", hrs: "1" },
    { lapIndex: 2, ms: "2", secs: "2", mins: "2", hrs: "2" },
    { lapIndex: 3, ms: "3", secs: "3", mins: "3", hrs: "3" },
  ],
  clearLapHistory: () => {
    alert("This will clear the lap history");
  },
};

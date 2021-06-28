import { Box } from "@material-ui/core";
import { PropsWithChildren } from "react";
import { WrapperProps } from "./types";

export default function StyledWrapper(props: PropsWithChildren<WrapperProps>) {
  return <Box display="flex" flexDirection="row" padding={2} marginTop={1} marginBottom={1} justifyContent="flex-end">
    {props.children}
  </Box>
};

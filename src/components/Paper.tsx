import { Box } from "@material-ui/core";
import React from "react";

export default function Paper({ children }: React.PropsWithChildren<any>) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      border="1px solid #ccc"
      borderRadius={5}
      marginTop={2}
      marginBottom={2}
      padding={2}
    >
      {children}
    </Box>
  );
}

import React from "react";
import { Box } from "@material-ui/core";

export default function FieldBlock({
  label,
  children,
}: React.PropsWithChildren<{ label: string }>) {
  return (
    <>
      <Box my={1} flexDirection="column">
        <Box my={1} fontWeight="bold" color="#666" fontSize="12px">
          {label}
        </Box>
        <Box my={1}>{children}</Box>
      </Box>
    </>
  );
}

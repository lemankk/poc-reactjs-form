import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import styled, { css } from "styled-components";

type ProgressProps = {
  enabled?: boolean;
};

const StyledOverlay = styled(Box)`
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  width: 80px;
  height: 80px;
  left: 50%;
  top: 50%;
  transform: translate(-40px, -40px, 0);
  z-index: 11;
`;

const ProgressWrapper = styled.div<ProgressProps>`
  position: relative;

  ${StyledOverlay}, ${StyledCircularProgress} {
    display: none;
  }

  ${({ enabled = false }) =>
    enabled &&
    css`
      ${StyledOverlay}, ${StyledCircularProgress} {
        display: block;
      }
    `}
`;

export default function Progress({
  enabled = false,
  children,
}: React.PropsWithChildren<ProgressProps>) {
  return (
    <ProgressWrapper enabled={enabled}>
      {children}

      <>
        <StyledOverlay />
        <StyledCircularProgress />
      </>
    </ProgressWrapper>
  );
}

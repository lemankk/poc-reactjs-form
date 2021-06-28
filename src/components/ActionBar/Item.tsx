import { Button } from "@material-ui/core";
import styled, { css } from "styled-components";
import { ItemProps } from "./types";

const Item: React.ComponentType<ItemProps> = Button;

const StyledItem = styled(Item)`
  ${({ aside = false }) =>
    aside &&
    css`
      justify-self: flex-start;
    `}
`;

export default StyledItem;

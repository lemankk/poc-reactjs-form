import Wrapper from "./Wrapper";
import Item from "./Item";
import React from "react";
import { WrapperProps, ItemProps } from "./types";

type ActionBarTypes = React.FC<WrapperProps> & {
  Item: React.FC<ItemProps>;
};

const ActionBarTemp: any = Wrapper;
ActionBarTemp.Item = Item;

const ActionBar: ActionBarTypes = ActionBarTemp;

export default ActionBar;

import { BoxProps, ButtonProps } from "@material-ui/core";

export type ActionBarWrapperBaseProps = {};
export type ActionBarItemBaseProps = {
  aside?: boolean;
};

export type WrapperProps = BoxProps & ActionBarWrapperBaseProps;

export type ItemProps = ButtonProps & ActionBarItemBaseProps;

export type ActionBarTypes = React.FC<WrapperProps> & {
  Item: React.FC<ItemProps>;
};

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import styles from "./PixelButton.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    as?: "button";
  };

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    as: "a";
    href: string;
  };

export type PixelButtonProps = ButtonProps | AnchorProps;

/**
 * Chunky retro button with a hard offset shadow.
 *
 * Polymorphic: renders as a <button> by default, or an <a> when `as="a"`.
 */
export function PixelButton(props: PixelButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    iconLeft,
    iconRight,
    className,
    ...rest
  } = props;

  const classes = [
    styles.btn,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (props.as === "a") {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorRest}>
        <ButtonInner iconLeft={iconLeft} iconRight={iconRight}>
          {children}
        </ButtonInner>
      </a>
    );
  }

  const { type = "button", ...buttonRest } =
    rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type={type} className={classes} {...buttonRest}>
      <ButtonInner iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </ButtonInner>
    </button>
  );
}

type ButtonInnerProps = {
  children: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

function ButtonInner({ children, iconLeft, iconRight }: ButtonInnerProps) {
  return (
    <>
      {iconLeft ? (
        <span aria-hidden="true" className={styles.icon}>
          {iconLeft}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
      {iconRight ? (
        <span aria-hidden="true" className={styles.icon}>
          {iconRight}
        </span>
      ) : null}
    </>
  );
}

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { useSound } from "../../hooks/useSound";
import styles from "./PixelButton.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  /** Disables the SFX for this button only (useful inside forms or on quiet pages). */
  silent?: boolean;
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
 * Plays a hover/click SFX through the global sound layer (no-op when muted).
 */
export function PixelButton(props: PixelButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    iconLeft,
    iconRight,
    silent = false,
    className,
    ...rest
  } = props;

  const { play } = useSound();

  const classes = [
    styles.btn,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const onPointerEnter = () => {
    if (!silent) play("hover");
  };
  const onClickAudio = () => {
    if (!silent) play("click");
  };

  if (props.as === "a") {
    const { onMouseEnter, onClick, ...anchorRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        className={classes}
        onMouseEnter={(e) => {
          onPointerEnter();
          onMouseEnter?.(e);
        }}
        onClick={(e) => {
          onClickAudio();
          onClick?.(e);
        }}
        {...anchorRest}
      >
        <ButtonInner iconLeft={iconLeft} iconRight={iconRight}>
          {children}
        </ButtonInner>
      </a>
    );
  }

  const { onMouseEnter, onClick, type = "button", ...buttonRest } =
    rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={type}
      className={classes}
      onMouseEnter={(e) => {
        onPointerEnter();
        onMouseEnter?.(e);
      }}
      onClick={(e) => {
        onClickAudio();
        onClick?.(e);
      }}
      {...buttonRest}
    >
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

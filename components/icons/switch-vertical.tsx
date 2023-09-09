type Props = {
  className: string;
};

export default function SwitchVertical({ className }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path
        d="M17 4V20M17 20L13 16M17 20L21 16M7 20V4M7 4L3 8M7 4L11 8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

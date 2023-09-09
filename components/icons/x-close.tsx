type Props = {
  className: string;
};

export default function Close({ className }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path
        d="M18 6L6 18M6 6L18 18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

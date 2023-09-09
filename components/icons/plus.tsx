type Props = {
  className?: string;
};

export default function Plus({ className }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path d="M12 5V19M5 12H19" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

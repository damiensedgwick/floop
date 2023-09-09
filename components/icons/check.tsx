type Props = {
  className: string;
};

export default function Check({ className }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

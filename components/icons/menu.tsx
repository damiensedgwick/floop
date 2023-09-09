type Props = {
  className: string;
};

export default function Menu({ className }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path
        d="M3 12H21M3 6H21M3 18H21"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function getScoreBackgroundColor(score: number): string {
  switch (score) {
    case 1:
      return "bg-red-400";
    case 2:
      return "bg-orange-400";
    case 3:
      return "bg-amber-400";
    case 4:
      return "bg-lime-400";
    case 5:
      return "bg-green-400";
    default:
      return "bg-black";
  }
}

export function getScoreTextColor(score: number): string {
  switch (score) {
    case 1:
      return "text-red-400";
    case 2:
      return "text-orange-400";
    case 3:
      return "text-amber-400";
    case 4:
      return "text-lime-400";
    case 5:
      return "text-green-400";
    default:
      return "text-black";
  }
}

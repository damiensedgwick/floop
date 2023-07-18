export function getScoreTextColor(score: number): string {
  switch (score) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return "text-red-500";
    case 7:
    case 8:
      return "text-amber-500";
    case 9:
    case 10:
      return "text-green-500";
    default:
      return "text-black";
  }
}

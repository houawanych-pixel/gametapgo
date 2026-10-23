import { RATING_LABEL } from "@/lib/ratings";
import type { Rating } from "@/lib/types";

/** Our own age badge (not the ESRB mark). */
export default function RatingBadge({ rating, size = "md" }: { rating: Rating; size?: "sm" | "md" }) {
  return (
    <span className={`rating r-${rating === "10+" ? "10" : rating} ${size}`} title={RATING_LABEL[rating]}
      aria-label={`Rated ${RATING_LABEL[rating]}`}>
      {rating}
    </span>
  );
}

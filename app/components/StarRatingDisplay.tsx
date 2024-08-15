import StarIcon from "./StarIcon";

const StarRatingDisplay = ({ rating }: { rating: number }) => {
    // Vérifie que le rating est compris entre 1 et 3 inclus
    const stars = Array.from({ length: rating }, (_, i) => (
        <StarIcon key={i} />
    ));

    return <div className="flex">{stars}</div>;
};

export default StarRatingDisplay;

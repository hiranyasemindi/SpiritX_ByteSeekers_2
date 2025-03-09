import { MdOutlineSportsCricket } from 'react-icons/md';
import Card from './Card';
import { FaRunning, FaMedal, FaTrophy } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';

function Tournament({ runs, wickets, highestRunScorer, highestWicketTaker, isLoading }) {
    const highestRunScorerText = highestRunScorer
        ? `${highestRunScorer.playerName}`
        : 'N/A';

    const highestWicketTakerText = highestWicketTaker
        ? `${highestWicketTaker.playerName}`
        : 'N/A';

    return (
        <div className="pb-6 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} height={150} className="w-full" />
                ))
            ) : (
                <>
                    <Card icon={<FaRunning />} title="Overall Runs" value={runs} />
                    <Card icon={<MdOutlineSportsCricket />} title="Overall Wickets" value={wickets} />
                    <Card icon={<FaMedal />} title="Highest Run Scorer" value={highestRunScorerText} />
                    <Card icon={<FaTrophy />} title="Highest Wicket Taker" value={highestWicketTakerText} />
                </>
            )}
        </div>
    );
}

export default Tournament;
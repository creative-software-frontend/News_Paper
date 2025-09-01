import { formatDistanceToNowStrict } from 'date-fns';
import { bn } from 'date-fns/locale';

const NewsCard = ({ title, publish }) => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold text-black  cursor-pointer transition duration-200">
        {title}
      </h3>
      <span className="flex items-center  justify-between">
        <p className="text-sm text-gray-500 mt-1">
          প্রকাশ:{' '}
          {new Date(publish).toLocaleDateString('bn-BD', {
            weekday: 'long', // রোববার
            year: 'numeric', // ২০২৫
            month: 'long', // আগস্ট
            day: 'numeric', // ৩১
          })}{' '}
        </p>{' '}
        <p className="text-xs text-gray-400 mt-1">
          {formatDistanceToNowStrict(
            new Date(new Date(publish).getTime() + 6 * 60 * 60 * 1000), // UTC → BD
            {
              locale: bn,
              addSuffix: true, // "আগে" যোগ করবে
              roundingMethod: 'floor', // ঘন্টার সময় নিচের দিকে রাউন্ড
            }
          )}
        </p>
      </span>
    </div>
  );
};

export default NewsCard;

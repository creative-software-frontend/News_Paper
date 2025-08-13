import Marquee from 'react-fast-marquee';

const Headline = () => {
  return (
    <div className="relative group w-full hover:cursor-pointer overflow-hidden border bg-[#f9f9f9] dark:bg-[#111827] dark:text-[#abc2d3] dark:border-slate-700 border-gray-200 border-r-4 border-r-[#F63C25] dark:border-r-[#F63C25] my-4 h-16">
      <div
        className="absolute top-0 left-0 h-full flex items-center text-white font-bold z-10"
        style={{
          clipPath:
            'polygon(100% 0%, calc(100% - 20px) 50%, 100% 100%, 0 100%, 0% 50%, 0 0)',
          backgroundColor: '#F44336',
          padding: '0 50px 0 20px',
          whiteSpace: 'nowrap',
        }}
      >
        Headline
      </div>

      <div className="ml-[150px] h-full flex items-center">
        <Marquee>
          <span className="mx-4">
            {' '}
            I can be a React component, multiple React components, or just some
            text.
          </span>
          <span className="mx-4">
            {' '}
            I can be a React component, multiple React components, or just some
            text.
          </span>
          <span className="mx-4">
            {' '}
            I can be a React component, multiple React components, or just some
            text.
          </span>
        </Marquee>
      </div>
    </div>
  );
};

export default Headline;

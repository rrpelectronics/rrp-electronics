import React from 'react';
import GridEventCards from '@/app/components/GridEventCards';
import events_data from './events_data';

const Events = ({ id }) => {
  return (
    <section
      id={id}
      className="@container w-full h-fit grid grid-cols-4 md:grid-cols-12 gap-x-3 md:gap-x-5 px-3.5 md:px-5 lg:px-10 py-10"
    >
      <h3 className="text-wrap text-display text-black tracking-display leading-[90%] col-span-4 md:col-span-12 @6xl:col-span-3 mb-10">
        Events
      </h3>
      <ul className="col-span-4 md:col-span-12 @6xl:col-span-9 grid grid-cols-4 w-full h-fit gap-y-7.5 md:gap-y-10 gap-4">
        {events_data.map((events, id) => (
          <GridEventCards
            key={id}
            imgBgclass={events.imgBgClass}
            newsEventImg={events.newsEventImg}
            date={events.date}
            source={events.source}
            title={events.title}
            link={`/news-events/${events.id}`}
          />
        ))}
      </ul>
    </section>
  );
}

export default Events
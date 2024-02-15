import EventList from "@/components/events/event-list";
import Head from "next/head";
import { Fragment } from "react";
// import {getFilteredEvents } from "@/dummy-data";

export async function getAllEvents() {
  const response = await fetch(
    'https://nextjs-practiceproject-default-rtdb.asia-southeast1.firebasedatabase.app/events.json', { cache: 'no-store' }
  );

  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;

}

export async function getFilteredEvents(dateFilter : {year : number, month : number}) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}


export default async function FilteredEventspage({
  params,
}: {
  params: { slug: string[] };
}) {

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`A list of filtered events.`} />
    </Head>
  );

  if (!params.slug) {
    return <Fragment>
      {pageHeadData}
      <p className="center">Loading...</p>
    </Fragment>;
  }

  if (params.slug.length > 2) {
    return <p className="center">Page Not Found</p>;
  }

  const filteredYear = +params.slug[0];
  const filteredMonth = +params.slug[1];

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content={`All events for ${filteredMonth}/${filteredYear}.`}
      />
    </Head>
  );

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear < 2021 ||
    filteredYear > 2022 ||
    filteredMonth > 12 ||
    filteredMonth < 1
  ) {
    return <Fragment>
      {pageHeadData}
      <p className="center">Invalid Parameters, Please Adjust The Parameters</p>
    </Fragment> 
  };

  const filteredEvents = await getFilteredEvents({year : filteredYear,  month : filteredMonth});

  if (!filteredEvents || filteredEvents.length === 0)
  {
    return <Fragment>
      {pageHeadData}
      <p className="center">No Events Found</p>
    </Fragment> 
  }

  return (
    <div>
      {pageHeadData}
      <EventList items={filteredEvents}/>
    </div>
  );
}

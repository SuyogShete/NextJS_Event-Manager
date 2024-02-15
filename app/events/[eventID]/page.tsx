import EventSummary from "../../../components/event-detail/event-summary";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventContent from "../../../components/event-detail/event-content";
import Comments from '../../../components/input/comments'

import { Fragment } from "react";
import Head from "next/head";

export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-practiceproject-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    { next : {revalidate : 30}}
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

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: string) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function generateStaticParams() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventID: event.id } }));

  return paths;
}

export default async function EventsDetail({
  params,
}: {
  params: { eventID: string };
}) {
  const event = await getEventById(params.eventID);

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta
          name='description'
          content={event.description}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
        <Comments eventId={event.id}/>
      </EventContent>
    </Fragment>
  );
}

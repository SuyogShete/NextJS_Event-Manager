import Head from "next/head";
import EventList from "../components/events/event-list";
import NewsLetterRegisteration from '../components/input/newsletter-registeration';

export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-practiceproject-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    { next: { revalidate: 1800 } }
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

export default async function HomePage() {
  const featuredEvents = await getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsLetterRegisteration />
      <EventList items={featuredEvents} />
    </div>
  );
}

// https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration






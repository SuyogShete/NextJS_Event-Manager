"use client";

import { useRouter } from "next/navigation";
// import { getAllEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment, useState, useEffect } from "react";
import Head from "next/head";

export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-practiceproject-default-rtdb.asia-southeast1.firebasedatabase.app/events.json", {next : {revalidate : 60}}
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

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const allEvents: any = await getAllEvents();
      setEvents(allEvents);
    };

    getData();
  }, []);

  const router = useRouter();

  function findEventshandler(year: number, month: number) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <EventsSearch onSearch={findEventshandler} />
      <EventList items={events} />
    </Fragment>
  );
}

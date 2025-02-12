import { useState, useEffect } from 'react';
import NewEntryModal from '../components/NewEntryModal.jsx';
import EventList from '../components/EventList.jsx';
import Header from '../components/Header.jsx';

const Home = () => {
    const [events, setEvents] = useState([]); 
    const [originalEvents, setOriginalEvents] = useState([]); // Save initial events in state
  
    // Fetch Events from API (initial load)
    useEffect(() => {
      const fetchEvents = async () => {
          try {
              const response = await fetch("http://localhost:3001/api/events?page=1&limit=10");
              if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
              const data = await response.json();
              console.log("📡 Events loaded:", data.results);
              setEvents(data.results || []);
              setOriginalEvents(data.results || []); // save initial list of events
          } catch (error) {
              console.error("Error when loading events:", error);
          }
      };
      fetchEvents();
  }, []);

      // Update Event-List based on search
      const handleSearchResults = (filteredEvents) => {
        if (filteredEvents === null) {
            setEvents(originalEvents); // Falls Suchfeld leer ist, lade Original-Events
        } else {
            setEvents(filteredEvents);
        }
    };
  
    // Add new events to event list
    const handleEventCreated = (newEvent) => {
      setEvents((prevEvents) => [newEvent, ...prevEvents]); 
    };

  return (
    <section id='events' className='flex flex-col items-center justify-center'>
    <Header onSearch={handleSearchResults} />
      <div className="flex flex-col items-center p-8 mb-6">
        <h1 className="text-4xl font-black text-white my-12">🍌 Upcoming Banana Events 🍌</h1>
        <p className='mb-16 font-thin lg:mx-64 md:mx-48 sm:mx-32 mx-16'>
          At Banana Events, we don’t just throw events – 
          we peel back the ordinary and bring you a world of pure potassium-powered fun! 
          Whether you’re here to slip into an unforgettable festival, 
          go bananas at a wild party, or just mash up your routine with something new, 
          we’ve got events that are always ripe for the picking.
          🎭 From banana-tastic music festivals to tropical rooftop parties, 
          our events are designed to brighten your mood faster than a perfectly ripe Cavendish. 
          No monkey business here – just a bunch of peel-good vibes, great people, 
          and memories that stick better than a banana to your smoothie blender.
          So why wait? Grab your bunch, take a bite out of life, 
          and let’s make every event a-peeling! 🍌🎉
          </p>
        <EventList events={events} />
      </div>
      <div className='mb-6'>
        <NewEntryModal onEventCreated={handleEventCreated} />
      </div>
    </section>
  );
};

export default Home;

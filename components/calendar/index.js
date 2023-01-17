import React from 'react'
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function Calendar() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr)
  }
  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth',
        }}
        dateClick={(e) => handleDateClick(e)}
        events={[
          { title: 'event 13', date: '2023-01-18' },
          { title: 'event 2', date: '2023-01-02' },
        ]}
      />
    </div>
  )
}

export default Calendar

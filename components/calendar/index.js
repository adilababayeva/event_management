import React from 'react'
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Button, Modal, Space } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { Input } from 'antd'

function Calendar() {
  const ref = useRef(null)
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState({})
  const [update, setUpdate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const showModal = () => {
    setIsModalOpen(true)
  }
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events')
      const data = await response.json()
      setEvents(data)
    }
    fetchEvents()
  }, [update])

  const handleOk = async () => {
    let value = ref.current.input.value
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: value,
        date: selectedDate,
      }),
    })
    const data = await response.json()
    ref.current.input.value = ''
    await setUpdate(Date.now())
    await setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setIsModalOpen2(false)
  }
  const handleDelete = async () => {
    const rawResponse = await fetch(`/api/events/${event._id}`, {
      method: 'DELETE',
    })
    const content = await rawResponse.json()
    ref.current.input.value = ''
    await setUpdate(Date.now())
    await setIsModalOpen2(false)
  }
  const handleUpdate = async () => {
    const rawResponse = await fetch(`/api/events/${event._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: event?.title,
        date: event.date,
      }),
    })
    const content = await rawResponse.json()
    await setUpdate(Date.now())
    await setIsModalOpen2(false)
  }
  const handleDateClick = async (arg) => {
    await setSelectedDate(arg.dateStr)
    showModal()
  }
  const handleEventClick = async (e) => {
    const datum = {
      title: e.title,
      date: e.startStr,
      _id: e.extendedProps._id,
    }
    await setEvent(datum)
    await setIsModalOpen2(true)
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
        events={events}
        eventClick={(e) => handleEventClick(e.event)}
      />
      <Modal
        title="Add Event"
        open={isModalOpen}
        onOk={handleOk}
        centered={true}
        onCancel={handleCancel}
        okText="Add"
      >
        <p>
          DATE : <time>{selectedDate}</time>
        </p>

        <Input ref={ref} placeholder="Event ..." />
      </Modal>
      <Modal
        title="Event"
        open={isModalOpen2}
        onOk={handleDelete}
        centered={true}
        onCancel={handleCancel}
        okText="Delete"
        okType="danger"
      >
        <p>
          DATE : <time>{event?.date}</time>
        </p>
        <Input
          value={event?.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          placeholder="Event ..."
        />
        <Button
          style={{ marginTop: 12 }}
          color="primary"
          onClick={handleUpdate}
        >
          Edit
        </Button>
      </Modal>
    </div>
  )
}

export default Calendar

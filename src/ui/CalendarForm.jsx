// CalendarForm.jsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import "@/components/calendar/calendar.css";

const CalendarForm = ({ schedules, handleDateClick, handleEventClick }) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={schedules}
            locale={koLocale}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventContent={(eventInfo) => {
                return { html: `<b>${eventInfo.event.title}</b>` };
            }}
        />
    );
};

export default CalendarForm;

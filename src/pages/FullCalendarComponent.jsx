import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // 일별 그리드 뷰 플러그인
import timeGridPlugin from '@fullcalendar/timegrid'; // 주간 및 일간 뷰 플러그인
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 언어 팩

function FullCalendarComponent() {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locale={koLocale}
        />

    );
}

export default FullCalendarComponent;

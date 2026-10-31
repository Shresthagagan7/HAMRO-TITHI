import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  MapPin,
  Search,
  Sparkles,
} from 'lucide-react'
import './App.css'

type Tradition = 'Hindu' | 'Buddhist' | 'Kirat' | 'Muslim' | 'Christian'

type Festival = {
  date: string
  title: string
  tradition: Tradition
  category: string
  description: string
  time?: string
}

const traditions: { name: Tradition; nepali: string; color: string }[] = [
  { name: 'Hindu', nepali: 'हिन्दू', color: 'vermilion' },
  { name: 'Buddhist', nepali: 'बौद्ध', color: 'saffron' },
  { name: 'Kirat', nepali: 'किरात', color: 'leaf' },
  { name: 'Muslim', nepali: 'मुस्लिम', color: 'teal' },
  { name: 'Christian', nepali: 'इसाई', color: 'blue' },
]

const festivals: Festival[] = [
  {
    date: '2026-10-26',
    title: 'कोजाग्रत पूर्णिमा',
    tradition: 'Hindu',
    category: 'पूर्णिमा',
    description: 'दशैंको अन्तिम दिनका रूपमा मनाइने पूर्णिमा। रातभर जाग्राम बसी लक्ष्मीको पूजा गर्ने परम्परा छ।',
    time: 'साँझदेखि',
  },
  {
    date: '2026-10-27',
    title: 'कार्तिक स्नान आरम्भ',
    tradition: 'Hindu',
    category: 'मास आरम्भ',
    description: 'कार्तिक महिनामा बिहान स्नान र दीपदान गर्ने धार्मिक परम्पराको सुरुवात।',
    time: 'बिहान',
  },
  {
    date: '2026-11-08',
    title: 'काग तिहार',
    tradition: 'Hindu',
    category: 'तिहार',
    description: 'तिहारको पहिलो दिन कागलाई यमदूतको प्रतीक मानी सम्मान र भोजन अर्पण गरिन्छ।',
  },
  {
    date: '2026-11-09',
    title: 'कुकुर तिहार',
    tradition: 'Hindu',
    category: 'तिहार',
    description: 'निष्ठा र मित्रताको प्रतीक कुकुरलाई टीका, माला र मिठाईले सम्मान गरिन्छ।',
  },
  {
    date: '2026-11-10',
    title: 'लक्ष्मी पूजा',
    tradition: 'Hindu',
    category: 'तिहार',
    description: 'घर आँगनमा दीप बालेर धनधान्यकी देवी लक्ष्मीको पूजा गरिने तिहारको विशेष साँझ।',
    time: 'साँझ',
  },
  {
    date: '2026-11-11',
    title: 'गाई तिहार / गोवर्धन पूजा',
    tradition: 'Hindu',
    category: 'तिहार',
    description: 'गाई र गोवर्धन पर्वतको पूजा गरी प्रकृति र जीवनप्रतिको कृतज्ञता व्यक्त गरिन्छ।',
  },
  {
    date: '2026-11-12',
    title: 'भाइटीका',
    tradition: 'Hindu',
    category: 'तिहार',
    description: 'दिदीबहिनीले दाजुभाइलाई सप्तरङ्गी टीका लगाई दीर्घायु र मंगलको कामना गर्छन्।',
  },
  {
    date: '2026-11-15',
    title: 'छठ पर्व',
    tradition: 'Hindu',
    category: 'पर्व',
    description: 'सूर्यदेव र छठी माताको उपासनासहित नदी वा जलाशयमा अर्घ्य अर्पण गरिने पर्व।',
  },
  {
    date: '2026-11-25',
    title: 'साकेला उधौली',
    tradition: 'Kirat',
    category: 'सांस्कृतिक पर्व',
    description: 'किरात समुदायले प्रकृति र पुर्खाप्रति कृतज्ञता व्यक्त गर्दै साकेला नाच्ने पर्व।',
  },
  {
    date: '2026-05-01',
    title: 'बुद्ध जयन्ती',
    tradition: 'Buddhist',
    category: 'पर्व',
    description: 'गौतम बुद्धको जन्म, ज्ञान प्राप्ति र महापरिनिर्वाणको स्मरणमा मनाइने पर्व।',
  },
  {
    date: '2026-03-20',
    title: 'ईद उल-फित्र',
    tradition: 'Muslim',
    category: 'पर्व',
    description: 'रमजान महिनाको उपवासपछि मनाइने पर्व। चन्द्रदर्शनअनुसार मिति फरक पर्न सक्छ।',
  },
  {
    date: '2026-02-14',
    title: 'माघे संक्रान्ति',
    tradition: 'Hindu',
    category: 'संक्रान्ति',
    description: 'सूर्यको संक्रमणको शुभ समय मानिन्छ, र स्नान, दान र अर्घ्यको परम्परा छ।',
    time: 'बिहान',
  },
  {
    date: '2026-02-18',
    title: 'श्रीकृष्ण जन्माष्टमी',
    tradition: 'Hindu',
    category: 'पर्व',
    description: 'भगवान कृष्णको जन्मोत्सवमा भजन, व्रत र रातभर जागरण गरिन्छ।',
    time: 'रात',
  },
  {
    date: '2026-03-03',
    title: 'होली',
    tradition: 'Hindu',
    category: 'पर्व',
    description: 'रङ्ग, गुलाल र संगीतले मनाइने प्रेम, सद्भावना र नत्थीको पर्व।',
    time: 'दिउँसो',
  },
  {
    date: '2026-04-06',
    title: 'महाशिवरात्रि',
    tradition: 'Hindu',
    category: 'पर्व',
    description: 'भगवान शिवको उपासना गरी उपवास र जलार्पण गरिन्छ।',
    time: 'रात',
  },
  {
    date: '2026-04-13',
    title: 'बैशाखी / नवसंवत्सर',
    tradition: 'Hindu',
    category: 'सांस्कृतिक पर्व',
    description: 'नयाँ वर्षको शुभारम्भ मानिन्छ, र कृषि र जीवनको नयाँ आशाको प्रतीक मानिन्छ।',
    time: 'बिहान',
  },
  {
    date: '2026-07-10',
    title: 'गुरु पूर्णिमा',
    tradition: 'Buddhist',
    category: 'पर्व',
    description: 'गुरु र आध्यात्मिक मार्गदर्शकको सम्मान गर्ने बौद्ध पर्व।',
    time: 'बिहान',
  },
  {
    date: '2026-09-08',
    title: 'रथयात्रा',
    tradition: 'Hindu',
    category: 'पर्व',
    description: 'भगवान जगन्नाथको रथको यात्रा, जो समुदाय,Unity र भक्ति समेट्ने पर्व हो।',
    time: 'दिउँसो',
  },
  {
    date: '2026-09-30',
    title: 'नवरात्र आरम्भ',
    tradition: 'Hindu',
    category: 'पर्व',
    description: 'देवीको शक्ति, शुद्धता र नारी-आधारको उपासना गरी मनाइने नौदिनको पर्व।',
    time: 'साँझ',
  },
  {
    date: '2026-10-02',
    title: 'महाअष्टमी',
    tradition: 'Hindu',
    category: 'पर्व',
    description: 'नवरात्रको आठौं दिन, जहाँ देवीका उपासना र शक्तिको सम्मान गरिन्छ।',
    time: 'साँझ',
  },
  {
    date: '2026-10-04',
    title: 'दशहरा',
    tradition: 'Hindu',
    category: 'पर्व',
    description: 'दुष्टता पर विजय र शुभताका प्रतीकको रूपमा मनाइने दसौं दिवस।',
    time: 'दिउँसो',
  },
  {
    date: '2026-10-05',
    title: 'तिहार आरम्भ',
    tradition: 'Hindu',
    category: 'तिहार',
    description: 'दीप, ध्वनि, छायाँ र पर्वतको सांस्कृतिक शुभता मनाउने नेपाली तिहारको सुरुवात।',
    time: 'साँझ',
  },
  {
    date: '2026-10-25',
    title: 'दशैंको प्रारम्भ',
    tradition: 'Hindu',
    category: 'पर्व',
    description: 'देवी पूजा र शुभता, परिवारिक भेटघाट र संस्कृति समेट्ने आरम्भिक दिवस।',
    time: 'बिहान',
  },
  {
    date: '2026-11-25',
    title: 'साकेला उधौली',
    tradition: 'Kirat',
    category: 'सांस्कृतिक पर्व',
    description: 'किरात समुदायले प्रकृति, पुर्खा र जीवनको कृतज्ञता व्यक्त गरि नाच्ने पर्व।',
  },
  {
    date: '2026-12-25',
    title: 'क्रिसमस',
    tradition: 'Christian',
    category: 'पर्व',
    description: 'येशू ख्रीष्टको जन्मको स्मरणमा मनाइने इसाई पर्व।',
  },
]

const weekdayNames = ['आइत', 'सोम', 'मङ्गल', 'बुध', 'बिही', 'शुक्र', 'शनि']
const monthNames = [
  'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जुन',
  'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर',
]
const todayKey = dateKey(new Date())

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function App() {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })
  const [selectedDate, setSelectedDate] = useState(() => dateKey(new Date()))
  const [activeTraditions, setActiveTraditions] = useState<Tradition[]>(traditions.map(({ name }) => name))
  const [search, setSearch] = useState('')

  const calendarDays = useMemo(() => {
    const firstWeekday = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay()
    const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate()
    const daysInPreviousMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 0).getDate()
    return Array.from({ length: 42 }, (_, index) => {
      const dayNumber = index - firstWeekday + 1
      const date = dayNumber < 1
        ? new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, daysInPreviousMonth + dayNumber)
        : dayNumber > daysInMonth
          ? new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, dayNumber - daysInMonth)
          : new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), dayNumber)
      return { date, inMonth: date.getMonth() === visibleMonth.getMonth() }
    })
  }, [visibleMonth])

  const selectedEvents = festivals.filter((festival) => festival.date === selectedDate && activeTraditions.includes(festival.tradition))
  const visibleEvents = festivals.filter((festival) => {
    const matchesTradition = activeTraditions.includes(festival.tradition)
    const matchesSearch = `${festival.title} ${festival.tradition} ${festival.category}`.toLowerCase().includes(search.toLowerCase())
    return matchesTradition && matchesSearch
  })
  const selectedDateValue = new Date(`${selectedDate}T12:00:00`)
  const selectedDateLabel = new Intl.DateTimeFormat('ne-NP', { weekday: 'long', day: 'numeric', month: 'long' }).format(selectedDateValue)

  function shiftMonth(amount: number) {
    setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + amount, 1))
  }

  function toggleTradition(tradition: Tradition) {
    setActiveTraditions((current) => current.includes(tradition)
      ? current.filter((item) => item !== tradition)
      : [...current, tradition])
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="हाम्रो तिथि गृहपृष्ठ">
          <span className="brand-mark"><Sparkles size={19} strokeWidth={1.8} /></span>
          <span><strong>हाम्रो तिथि</strong><small>NEPAL'S SHARED CALENDAR</small></span>
        </a>

        <div className="sidebar-label">तपाईंको पात्रो</div>
        <nav className="side-nav" aria-label="मुख्य मेनु">
          <a className="nav-item selected" href="#calendar"><CalendarDays size={18} />पात्रो<span className="nav-count">आज</span></a>
          <a className="nav-item" href="#observances"><Sparkles size={18} />पर्वहरू</a>
          <button className="nav-item" type="button"><Bell size={18} />रिमाइन्डर<span className="nav-soon">चाँडै</span></button>
        </nav>

        <div className="sidebar-label tradition-heading">परम्परा छान्नुहोस्</div>
        <div className="tradition-list">
          {traditions.map((tradition) => (
            <button
              type="button"
              className={`tradition-option ${activeTraditions.includes(tradition.name) ? 'checked' : ''}`}
              key={tradition.name}
              onClick={() => toggleTradition(tradition.name)}
              aria-pressed={activeTraditions.includes(tradition.name)}
            >
              <span className={`tradition-dot ${tradition.color}`} />
              <span>{tradition.nepali}<small>{tradition.name}</small></span>
              <span className="check-box">{activeTraditions.includes(tradition.name) && <Check size={13} />}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-note">
          <span className="note-icon"><Compass size={17} /></span>
          <p>सबै परम्परा,<br /><strong>एउटै साझा आकाश।</strong></p>
        </div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <div className="location-pill"><MapPin size={15} /><span>Kathmandu, Nepal</span><ChevronDown size={14} /></div>
          <div className="topbar-actions"><span className="date-caption">समय: नेपाल मानक समय</span><button className="icon-button" aria-label="रिमाइन्डर" type="button"><Bell size={18} /><i /></button><div className="avatar">ग</div></div>
        </header>

        <section className="welcome-row">
          <div><div className="eyebrow"><span /> NEPAL'S CULTURAL CALENDAR</div><h1>हरेक पर्वको <em>आफ्नै</em><br className="title-break" /> कथा हुन्छ।</h1><p className="welcome-copy">तपाईंको परम्परा, तपाईंको पात्रो। सबै तिथि र पर्व अब एउटै ठाउँमा।</p></div>
          <div className="welcome-art" aria-hidden="true"><div className="sun-disc" /><span className="art-ring ring-one" /><span className="art-ring ring-two" /><span className="art-mountain mountain-one" /><span className="art-mountain mountain-two" /><span className="art-star">✳</span></div>
        </section>

        <section className="calendar-layout" id="calendar">
          <div className="calendar-panel">
            <div className="calendar-heading">
              <div><span className="section-kicker">पात्रो</span><h2>{monthNames[visibleMonth.getMonth()]} <span>{visibleMonth.getFullYear()}</span></h2></div>
              <div className="month-actions"><button type="button" className="icon-button month-arrow" aria-label="अघिल्लो महिना" onClick={() => shiftMonth(-1)}><ArrowLeft size={17} /></button><button type="button" className="today-button" onClick={() => { const today = new Date(); setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1)); setSelectedDate(dateKey(today)) }}>आज</button><button type="button" className="icon-button month-arrow" aria-label="अर्को महिना" onClick={() => shiftMonth(1)}><ArrowRight size={17} /></button></div>
            </div>
            <div className="calendar-grid" role="grid" aria-label={`${monthNames[visibleMonth.getMonth()]} ${visibleMonth.getFullYear()}`}>
              {weekdayNames.map((weekday) => <div className="weekday" key={weekday} role="columnheader">{weekday}</div>)}
              {calendarDays.map(({ date, inMonth }) => {
                const key = dateKey(date)
                const dayEvents = festivals.filter((festival) => festival.date === key && activeTraditions.includes(festival.tradition))
                const isToday = key === todayKey
                return <button key={key} type="button" role="gridcell" aria-label={`${date.getDate()} ${monthNames[date.getMonth()]}${dayEvents.length ? `, ${dayEvents.map((event) => event.title).join(', ')}` : ''}`} aria-pressed={selectedDate === key} onClick={() => setSelectedDate(key)} className={`day-cell ${inMonth ? '' : 'outside'} ${selectedDate === key ? 'active' : ''} ${isToday ? 'today' : ''}`}>
                  <span className="day-number">{date.getDate()}</span>{dayEvents.length > 0 && <span className="event-dots">{dayEvents.slice(0, 3).map((event) => <i key={event.title} className={traditions.find((item) => item.name === event.tradition)?.color} />)}</span>}
                </button>
              })}
            </div>
            <div className="calendar-legend"><span><i className="legend-dot vermilion" />हिन्दू</span><span><i className="legend-dot leaf" />किरात</span><span className="legend-note">थोप्लो = पर्व</span></div>
          </div>

          <aside className="day-panel">
            <div className="day-panel-top"><span className="section-kicker">चयन गरिएको दिन</span><span className="lunar-mark">☾</span></div>
            <h2>{selectedDateLabel}</h2>
            <div className="nepali-date">वि.सं. मिति गणना जोडिँदैछ</div>
            <div className="panel-rule" />
            {selectedEvents.length ? selectedEvents.map((event) => <article className="selected-event" key={event.title}>
              <span className={`event-line ${traditions.find((item) => item.name === event.tradition)?.color}`} />
              <div className="event-meta"><span>{traditions.find((item) => item.name === event.tradition)?.nepali} · {event.category}</span>{event.time && <span className="event-time"><Clock3 size={12} />{event.time}</span>}</div>
              <h3>{event.title}</h3><p>{event.description}</p>
            </article>) : <div className="empty-day"><span className="empty-moon">☽</span><p>यो दिनका लागि चयन गरिएको परम्परामा कुनै पर्व छैन।</p></div>}
            <div className="day-panel-footer"><Sparkles size={15} /><span>समुदायसँग जोडिएको पात्रो</span></div>
          </aside>
        </section>

        <section className="observances" id="observances">
          <div className="observances-header"><div><span className="section-kicker">अब आउने दिनहरू</span><h2>नजिकिँदै गरेका पर्व</h2></div><label className="search-box"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="पर्व खोज्नुहोस्" aria-label="पर्व खोज्नुहोस्" /></label></div>
          <div className="observance-list">{visibleEvents.length ? visibleEvents.map((event) => {
            const eventDate = new Date(`${event.date}T12:00:00`)
            return <button className="observance-row" type="button" key={event.title} onClick={() => { setSelectedDate(event.date); setVisibleMonth(new Date(eventDate.getFullYear(), eventDate.getMonth(), 1)) }}>
              <span className="event-date"><strong>{eventDate.getDate()}</strong><small>{monthNames[eventDate.getMonth()].slice(0, 3)}</small></span><span className={`list-marker ${traditions.find((item) => item.name === event.tradition)?.color}`} /><span className="observance-name"><strong>{event.title}</strong><small>{traditions.find((item) => item.name === event.tradition)?.nepali} · {event.category}</small></span><ArrowRight className="row-arrow" size={17} />
            </button>
          }) : <p className="no-results">खोजसँग मिल्ने पर्व भेटिएन।</p>}</div>
        </section>

        <footer className="footer"><span>हाम्रो तिथि <i>·</i> साझा संस्कृतिको साझा पात्रो</span><span className="demo-disclaimer">सबै मिति नमुना हुन्; आधिकारिक पात्रोबाट पुष्टि गर्नुहोस्</span></footer>
      </main>
    </div>
  )
}

export default App

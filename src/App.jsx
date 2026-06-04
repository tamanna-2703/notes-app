import React, { useState } from 'react'

const DiaryNote = ({ elem, idx, onDelete }) => {
  // Punch hole positions
  const holes = [18, 50, 82]

  return (
    <div className="diary-card w-44 flex-shrink-0" style={{ height: '210px' }}>
      {/* Ruled lines overlay */}
      <div className="diary-lines" />

      {/* Punch holes */}
      {holes.map((top, i) => (
        <div
          key={i}
          className="diary-hole"
          style={{ top: `${top}%`, transform: 'translateY(-50%)' }}
        />
      ))}

      {/* Content */}
      <div className="diary-card-content flex flex-col justify-between h-full">
        {/* Title */}
        <div>
          <h3
            className="text-lg font-bold leading-tight"
            style={{
              color: '#1a1a2e',
              fontFamily: "'Caveat', cursive",
              fontSize: '1.15rem',
              marginTop: '4px',
              borderBottom: '1px solid rgba(100,149,237,0.3)',
              paddingBottom: '4px',
            }}
          >
            {elem.title}
          </h3>
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{
              color: '#3d3d3d',
              fontFamily: "'Caveat', cursive",
              fontSize: '0.95rem',
              lineHeight: '1.75rem',
            }}
          >
            {elem.details}
          </p>
        </div>

        {/* Delete */}
        <button onClick={() => onDelete(idx)} className="del-btn mt-2 w-full">
          DELETE
        </button>
      </div>

      {/* Folded corner */}
      <div className="corner-fold" />
    </div>
  )
}

const App = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [task, setTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setTask([...task, { title, details }])
    setTitle('')
    setDetails('')
  }

  const deleteNote = (idx) => {
    const copy = [...task]
    copy.splice(idx, 1)
    setTask(copy)
  }

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ background: '#0d0d0d', fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── LEFT: Add Notes Form ── */}
      <div className="lg:w-1/2 flex flex-col justify-center px-10 py-14">
        {/* Header */}
        <div className="mb-8">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#f5c842', letterSpacing: '0.18em' }}
          >
            My Notebook
          </span>
          <h1
            className="text-4xl font-bold mt-1"
            style={{ color: '#f0f0f0', lineHeight: 1.2 }}
          >
            Add a Note
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Jot down your thoughts, ideas, or tasks instantly.
          </p>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          {/* Title input */}
          <div>
            <label
              className="text-xs font-semibold mb-1 block"
              style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}
            >
              TITLE
            </label>
            <input
              type="text"
              placeholder="e.g. Shopping List…"
              className="note-input w-full px-4 py-3 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Details textarea */}
          <div>
            <label
              className="text-xs font-semibold mb-1 block"
              style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}
            >
              DETAILS
            </label>
            <textarea
              placeholder="Write your note here…"
              className="note-input w-full px-4 py-3 text-sm h-36 resize-none"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          <button type="submit" className="add-btn w-full py-3 text-sm mt-1">
            + Add Note
          </button>
        </form>

        {/* Note count badge */}
        <p className="mt-6 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {task.length} {task.length === 1 ? 'note' : 'notes'} saved
        </p>
      </div>

      {/* ── RIGHT: Recent Notes ── */}
      <div
        className="lg:w-1/2 flex flex-col px-10 py-14"
        style={{
          background: '#000000',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            style={{
              width: 4,
              height: 28,
              borderRadius: 2,
              background: 'linear-gradient(180deg,#f5c842,#f0a500)',
            }}
          />
          <h2
            className="text-2xl font-bold"
            style={{ color: '#f0f0f0' }}
          >
            Recent Notes
          </h2>
        </div>

        {/* Notes grid */}
        {task.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-3"
            style={{ color: 'rgba(255,255,255,0.18)' }}
          >
            {/* Notebook icon */}
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="2" width="13" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="8" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="8" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="8" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="4" y1="5" x2="2" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="4" y1="9" x2="2" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="4" y1="13" x2="2" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="text-sm text-center">
              No notes yet.<br />Add your first note on the left!
            </p>
          </div>
        ) : (
          <div className="notes-scroll flex flex-wrap gap-5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {task.map((elem, idx) => (
              <DiaryNote key={idx} elem={elem} idx={idx} onDelete={deleteNote} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App

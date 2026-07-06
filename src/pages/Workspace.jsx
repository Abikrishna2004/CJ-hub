import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/workspace.css';

export default function Workspace() {
  // 1. Weather Widget States
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');
  const [env, setEnv] = useState({});

  // 2. Goal & Task Tracker States
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('workspace-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTaskText, setNewTaskText] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  // Load Env Configuration on mount
  useEffect(() => {
    axios
      .get('/env')
      .then((res) => {
        const config = {};
        res.data.split('\n').forEach((line) => {
          const parts = line.split('=');
          if (parts.length >= 2) {
            config[parts[0].trim()] = parts.slice(1).join('=').trim();
          }
        });
        setEnv(config);
      })
      .catch((err) => console.error('Unable to fetch env:', err));
  }, []);

  // Sync tasks to localStorage
  useEffect(() => {
    localStorage.setItem('workspace-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Load cached city weather
  useEffect(() => {
    const cachedCity = localStorage.getItem('weather-city') || '';
    if (cachedCity) {
      setCity(cachedCity);
      // Wait for env key to load before running default search
      if (env.WEATHER_API_KEY) {
        searchWeather(cachedCity, env.WEATHER_API_KEY);
      }
    }
  }, [env]);

  const searchWeather = async (queryCity, apiKey) => {
    if (!queryCity) return;
    setWeatherLoading(true);
    setWeatherError('');
    setWeather(null);

    const key = apiKey || env.WEATHER_API_KEY || '224cca4c70123acc7c84ef439e0842f2';

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(queryCity)}&appid=${key}&units=metric`
      );
      setWeather(res.data);
      localStorage.setItem('weather-city', queryCity);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setWeatherError('City not found. Please check spelling.');
      } else {
        setWeatherError('Weather service is currently unavailable.');
      }
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleWeatherSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      searchWeather(city.trim());
    }
  };

  // Todo Actions
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
      editing: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleStartEdit = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, editing: true } : { ...t, editing: false })));
  };

  const handleSaveEdit = (id, newText) => {
    if (!newText.trim()) return;
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText.trim(), editing: false } : t)));
  };

  const handleCancelEdit = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, editing: false } : t)));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (currentFilter === 'active') return !t.completed;
    if (currentFilter === 'completed') return t.completed;
    return true;
  });

  return (
    <main id="main-content">
      {/* HERO SECTION */}
      <section className="services-hero" style={{ padding: 'var(--space-xl) 0 var(--space-lg) 0' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'var(--space-lg)' }}>
            <span className="section-tag">Workspace</span>
            <h1 className="section-title">Developer Workspace</h1>
            <p className="section-subtitle">
              An integrated suite of productivity tools for engineering students. Check the current weather and track your
              daily learning milestones.
            </p>
          </div>
        </div>
      </section>

      {/* WORKSPACE GRID SECTION */}
      <section style={{ padding: '0 0 var(--space-xxl) 0' }}>
        <div className="container">
          <div className="workspace-grid">
            {/* COLUMN 1: WEATHER DASHBOARD */}
            <div className="glass-card" style={{ padding: 'var(--space-xl)' }}>
              <h2
                className="path-card-title"
                style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}
              >
                Weather Dashboard
              </h2>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>
                Query live conditions to optimize your work schedule.
              </p>

              {/* Search Form */}
              <form onSubmit={handleWeatherSearch} className="widget-form">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="widget-input"
                  placeholder="Type city (e.g., Tokyo, New York)..."
                  aria-label="City Name"
                />
                <button type="submit" className="widget-btn" aria-label="Search Weather">
                  <span>Search</span>
                  <svg viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </form>

              {/* Weather Info Display Area */}
              <div id="weather-display-area">
                {weatherLoading && (
                  <div className="todo-item-empty" style={{ animation: 'none' }}>
                    <svg
                      style={{
                        animation: 'spin 1.5s linear infinite',
                        width: '32px',
                        height: '32px',
                        stroke: 'var(--color-cyan)',
                        strokeWidth: '2.5',
                        fill: 'none',
                      }}
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" stroke="var(--border-color)" />
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                    </svg>
                    <p>Fetching weather data...</p>
                  </div>
                )}

                {weatherError && !weatherLoading && (
                  <div className="weather-error-card">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className="weather-error-title">Search Failed</div>
                      <div className="weather-error-desc">{weatherError}</div>
                    </div>
                  </div>
                )}

                {!weather && !weatherError && !weatherLoading && (
                  <div className="todo-item-empty">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                    <p>Type a city and click Search to fetch live conditions.</p>
                  </div>
                )}

                {weather && !weatherError && !weatherLoading && (
                  <div className="weather-card">
                    <div className="weather-header">
                      <span className="weather-city-name">{weather.name}</span>
                      <span className="weather-country">{weather.sys.country}</span>
                    </div>

                    <div className="weather-temp-block">
                      <span className="weather-temp">{Math.round(weather.main.temp)}°C</span>
                      <div className="weather-icon-container">
                        <img
                          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                          alt={weather.weather[0].description}
                          className="weather-icon-img"
                        />
                      </div>
                    </div>

                    <div className="weather-desc">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                      </svg>
                      <span>{weather.weather[0].description}</span>
                    </div>

                    <div className="weather-details-grid">
                      <div className="weather-detail-item">
                        <div className="weather-detail-icon">
                          <svg viewBox="0 0 24 24">
                            <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
                          </svg>
                        </div>
                        <div className="weather-detail-info">
                          <span className="weather-detail-label">Humidity</span>
                          <span className="weather-detail-value">{weather.main.humidity}%</span>
                        </div>
                      </div>
                      <div className="weather-detail-item">
                        <div className="weather-detail-icon">
                          <svg viewBox="0 0 24 24">
                            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                          </svg>
                        </div>
                        <div className="weather-detail-info">
                          <span className="weather-detail-label">Wind Speed</span>
                          <span className="weather-detail-value">{weather.wind.speed} m/s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* COLUMN 2: STUDENT TASK TRACKER */}
            <div className="glass-card" style={{ padding: 'var(--space-xl)' }}>
              <h2 className="path-card-title" style={{ marginBottom: '4px' }}>
                Goal & Task Tracker
              </h2>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>
                Manage and compile your learning milestones persistently.
              </p>

              {/* Add Task Form */}
              <form onSubmit={handleAddTask} className="widget-form">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="widget-input"
                  placeholder="Add a new milestone (e.g., Write API routes)..."
                  aria-label="New Task"
                />
                <button type="submit" className="widget-btn" aria-label="Add Task">
                  <span>Add</span>
                  <svg viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </form>

              {/* Filter Tabs */}
              <div className="todo-filters" role="tablist" aria-label="Task Filters">
                {['all', 'active', 'completed'].map((filter) => (
                  <button
                    key={filter}
                    className={`todo-filter-btn ${currentFilter === filter ? 'active' : ''}`}
                    onClick={() => setCurrentFilter(filter)}
                    role="tab"
                    aria-selected={currentFilter === filter}
                  >
                    {filter === 'all' ? 'All Tasks' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>

              {/* Task list */}
              <ul className="todo-list" aria-live="polite">
                {filteredTasks.length === 0 ? (
                  <div className="todo-item-empty">
                    <svg viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <p>
                      {currentFilter === 'all'
                        ? 'No tasks registered. Add one above!'
                        : currentFilter === 'active'
                        ? 'No active tasks. Good job!'
                        : 'No completed tasks yet.'}
                    </p>
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
                      {task.editing ? (
                        <TodoEditForm
                          initialText={task.text}
                          onSave={(newText) => handleSaveEdit(task.id, newText)}
                          onCancel={() => handleCancelEdit(task.id)}
                        />
                      ) : (
                        <>
                          <span className="todo-text" title={task.text}>
                            {task.text}
                          </span>
                          <div className="todo-actions">
                            <button
                              className="todo-act-btn complete"
                              onClick={() => handleToggleComplete(task.id)}
                              title="Complete task"
                              aria-label="Toggle Complete"
                            >
                              <svg viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </button>
                            <button
                              className="todo-act-btn edit"
                              onClick={() => handleStartEdit(task.id)}
                              title="Edit text"
                              aria-label="Edit text"
                            >
                              <svg viewBox="0 0 24 24">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button
                              className="todo-act-btn delete"
                              onClick={() => handleDeleteTask(task.id)}
                              title="Delete task"
                              aria-label="Delete row"
                            >
                              <svg viewBox="0 0 24 24">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TodoEditForm({ initialText, onSave, onCancel }) {
  const [editText, setEditText] = useState(initialText);

  const handleSubmit = () => {
    if (editText.trim()) {
      onSave(editText);
    }
  };

  return (
    <>
      <input
        type="text"
        className="todo-edit-input"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
          else if (e.key === 'Escape') onCancel();
        }}
        aria-label="Edit Task"
        autoFocus
      />
      <div className="todo-actions">
        <button className="todo-act-btn save" onClick={handleSubmit} title="Save changes" aria-label="Save Task Changes">
          <svg viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
        <button className="todo-act-btn cancel" onClick={onCancel} title="Cancel edit" aria-label="Cancel Changes">
          <svg viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </>
  );
}

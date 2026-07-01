// Compile Journey Hub - Workspace Specific Scripts
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Weather Dashboard Widget
  initWeatherDashboard();

  // 2. Initialize Goal & Task Tracker Widget
  initTaskTracker();
});

/* ==========================================================================
   1. DEVELOPER WEATHER DASHBOARD WIDGET
   ========================================================================== */
function initWeatherDashboard() {
  const cityInput = document.getElementById("weather-city-input");
  const searchBtn = document.getElementById("weather-search-btn");
  const displayContainer = document.getElementById("weather-display-area");

  if (!cityInput || !searchBtn || !displayContainer) return;

  // Read key from shared global environment configurations
  async function getApiKey() {
    if (window.envConfig && window.envConfig.WEATHER_API_KEY) {
      return window.envConfig.WEATHER_API_KEY;
    }
    return "";
  }

  async function searchWeather(city) {
    if (!city) return;

    // Render loading state
    displayContainer.innerHTML = `
      <div class="todo-item-empty" style="animation: none;">
        <svg style="animation: spin 1.5s linear infinite; width: 32px; height: 32px; stroke: var(--color-cyan); stroke-width: 2.5; fill: none;" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="var(--border-color)"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <p>Fetching weather data for "${city}"...</p>
      </div>
    `;

    try {
      const apiKey = await getApiKey();
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
      
      if (!response.ok) {
        throw new Error(response.status === 404 ? "City not found. Please check spelling." : "Weather service is currently unavailable.");
      }

      const data = await response.json();

      // Save last successful city
      localStorage.setItem("weather-city", city);

      // Extract details
      const temp = Math.round(data.main.temp);
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const desc = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const cityName = data.name;
      const countryCode = data.sys.country;

      // Render weather details
      displayContainer.innerHTML = `
        <div class="weather-card">
          <div class="weather-header">
            <span class="weather-city-name">${cityName}</span>
            <span class="weather-country">${countryCode}</span>
          </div>
          
          <div class="weather-temp-block">
            <span class="weather-temp">${temp}°C</span>
            <div class="weather-icon-container">
              <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${desc}" class="weather-icon-img">
            </div>
          </div>
          
          <div class="weather-desc">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
            <span>${desc}</span>
          </div>
          
          <div class="weather-details-grid">
            <div class="weather-detail-item">
              <div class="weather-detail-icon">
                <svg viewBox="0 0 24 24"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z"></path></svg>
              </div>
              <div class="weather-detail-info">
                <span class="weather-detail-label">Humidity</span>
                <span class="weather-detail-value">${humidity}%</span>
              </div>
            </div>
            <div class="weather-detail-item">
              <div class="weather-detail-icon">
                <svg viewBox="0 0 24 24"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>
              </div>
              <div class="weather-detail-info">
                <span class="weather-detail-label">Wind Speed</span>
                <span class="weather-detail-value">${windSpeed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      // Render clean error card
      displayContainer.innerHTML = `
        <div class="weather-error-card">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div style="display:flex; flex-direction:column;">
            <div class="weather-error-title">Search Failed</div>
            <div class="weather-error-desc">${error.message || "An unexpected error occurred."}</div>
          </div>
        </div>
      `;
    }
  }

  // Trigger search on click
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      searchWeather(city);
    }
  });

  // Trigger search on enter key press
  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const city = cityInput.value.trim();
      if (city) {
        searchWeather(city);
      }
    }
  });

  // Automatically load last search
  const cachedCity = localStorage.getItem("weather-city");
  if (cachedCity) {
    cityInput.value = cachedCity;
    searchWeather(cachedCity);
  }
}

/* ==========================================================================
   2. STUDENT GOAL & TASK TRACKER (TODO LIST) WIDGET
   ========================================================================== */
function initTaskTracker() {
  const taskInput = document.getElementById("todo-task-input");
  const addBtn = document.getElementById("todo-add-btn");
  const container = document.getElementById("todo-list-container");

  if (!taskInput || !addBtn || !container) return;

  // Read tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("workspace-tasks")) || [];
  let currentFilter = "all";

  // Escape HTML helper
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Save to local storage
  function saveTasks() {
    localStorage.setItem("workspace-tasks", JSON.stringify(tasks));
  }

  // Render tasks list
  function renderTasks() {
    let filtered = tasks;
    if (currentFilter === "active") {
      filtered = tasks.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
      filtered = tasks.filter(t => t.completed);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="todo-item-empty">
          <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <p>${
            currentFilter === "all"
              ? "No tasks registered. Add one above!"
              : currentFilter === "active"
              ? "No active tasks. Good job!"
              : "No completed tasks yet."
          }</p>
        </div>
      `;
      return;
    }

    container.innerHTML = "";

    filtered.forEach(task => {
      const li = document.createElement("li");
      li.className = `todo-item ${task.completed ? "completed" : ""}`;
      li.setAttribute("data-id", task.id);

      if (task.editing) {
        li.innerHTML = `
          <input type="text" class="todo-edit-input" value="${escapeHtml(task.text)}" aria-label="Edit Task">
          <div class="todo-actions">
            <button class="todo-act-btn save" title="Save changes" aria-label="Save Task Changes">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
            <button class="todo-act-btn cancel" title="Cancel edit" aria-label="Cancel Changes">
              <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        `;
      } else {
        li.innerHTML = `
          <span class="todo-text" title="${escapeHtml(task.text)}">${escapeHtml(task.text)}</span>
          <div class="todo-actions">
            <button class="todo-act-btn complete" title="Complete task" aria-label="Toggle Complete">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
            <button class="todo-act-btn edit" title="Edit text" aria-label="Edit text">
              <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="todo-act-btn delete" title="Delete task" aria-label="Delete row">
              <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        `;
      }

      bindRowEvents(li, task);
      container.appendChild(li);
    });
  }

  // Bind individual task events
  function bindRowEvents(li, task) {
    if (!task.editing) {
      const completeBtn = li.querySelector(".todo-act-btn.complete");
      const editBtn = li.querySelector(".todo-act-btn.edit");
      const deleteBtn = li.querySelector(".todo-act-btn.delete");

      completeBtn.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      editBtn.addEventListener("click", () => {
        // Reset edit flag for all other tasks
        tasks.forEach(t => t.editing = false);
        task.editing = true;
        renderTasks();
      });

      deleteBtn.addEventListener("click", () => {
        li.style.transform = "translateX(40px)";
        li.style.opacity = "0";
        setTimeout(() => {
          tasks = tasks.filter(t => t.id !== task.id);
          saveTasks();
          renderTasks();
        }, 200);
      });
    } else {
      const saveBtn = li.querySelector(".todo-act-btn.save");
      const cancelBtn = li.querySelector(".todo-act-btn.cancel");
      const editInput = li.querySelector(".todo-edit-input");

      editInput.focus();

      const saveEdit = () => {
        const val = editInput.value.trim();
        if (val) {
          task.text = val;
          task.editing = false;
          saveTasks();
          renderTasks();
        }
      };

      saveBtn.addEventListener("click", saveEdit);
      cancelBtn.addEventListener("click", () => {
        task.editing = false;
        renderTasks();
      });

      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          saveEdit();
        } else if (e.key === "Escape") {
          task.editing = false;
          renderTasks();
        }
      });
    }
  }

  // Add a new task item
  const addTask = () => {
    const val = taskInput.value.trim();
    if (val) {
      const newTask = {
        id: Date.now(),
        text: val,
        completed: false,
        editing: false
      };
      tasks.push(newTask);
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  };

  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Set up filters
  const filterBtns = document.querySelectorAll(".todo-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      renderTasks();
    });
  });

  // Initial draw
  renderTasks();
}

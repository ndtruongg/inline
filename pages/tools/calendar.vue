<template>
  <TheContainer>
    <div class="calendar-container p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Calendar</h1>
        <div class="controls flex items-center gap-4">
          <button @click="previousMonth" class="calendar-nav-btn">
            <span class="material-icons">chevron_left</span>
          </button>
          <h2 class="text-xl font-medium">{{ currentMonthName }} {{ currentYear }}</h2>
          <button @click="nextMonth" class="calendar-nav-btn">
            <span class="material-icons">chevron_right</span>
          </button>
          <button @click="goToToday" class="today-btn">
            Today
          </button>
        </div>
      </div>
      
      <div class="calendar-grid">
        <!-- Days of week header -->
        <div class="grid grid-cols-7 gap-px mb-px">
          <div v-for="day in daysOfWeek" :key="day" class="text-center text-xs font-medium py-2 text-gray-600 dark:text-gray-400">
            {{ day }}
          </div>
        </div>
        
        <!-- Calendar days -->
        <div class="grid grid-cols-7 gap-px bg-gray-100 dark:bg-gray-700">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            :class="[
              'calendar-day p-1 bg-white dark:bg-gray-800 relative',
              { 
                'text-gray-400 dark:text-gray-500': !day.isCurrentMonth,
                'today': day.isToday,
                'selected': day.isSelected && !day.isToday
              }
            ]"
            @click="selectDay(day)"
          >
            <div class="day-header flex justify-between items-center">
              <span :class="[
                'day-number text-sm rounded-full w-6 h-6 flex items-center justify-center',
                day.isToday ? 'bg-blue-100 text-blue-700 border border-blue-300' : '',
                day.isSelected && !day.isToday ? 'bg-gray-100 dark:bg-gray-700' : ''
              ]">{{ day.dayNumber }}</span>
              <span v-if="isFirstDayOfMonth(day)" class="text-xs text-gray-500 dark:text-gray-400">{{ getMonthShortName(day) }}</span>
            </div>
            
            <!-- Events -->
            <div class="mt-1 space-y-1">
              <div v-for="(event, eventIndex) in getEventsForDay(day)" :key="eventIndex"
                class="event-chip text-xs truncate px-2 py-0.5 rounded-sm border-l-2"
                :class="event.color"
                @click.stop="viewEvent(event)">
                {{ event.title }}
              </div>
              <div v-if="getEventsForDay(day).length > 2" class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                + {{ getEventsForDay(day).length - 2 }} more
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected day details - Side panel style -->
      <div v-if="selectedDay" class="day-panel fixed right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-md w-80 p-4 z-10 overflow-y-auto transform transition-transform" :class="{'translate-x-0': selectedDay, 'translate-x-full': !selectedDay}">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {{ formatSelectedDay }}
          </h3>
          <button @click="closePanel" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <div v-if="getEventsForDay(selectedDay).length > 0" class="space-y-2">
          <div v-for="(event, index) in getEventsForDay(selectedDay)" :key="index" 
            class="p-3 rounded-md border-l-2 hover:shadow-sm transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            :class="event.color">
            <div class="font-medium text-gray-800 dark:text-gray-200">{{ event.title }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{{ event.time }}</div>
            <p class="text-sm mt-1 text-gray-700 dark:text-gray-300">{{ event.description }}</p>
          </div>
        </div>
        <div v-else class="text-center py-6 text-gray-500 dark:text-gray-400">
          No events scheduled for this day
        </div>
        
        <div class="mt-4">
          <button @click="addEventMode = true" v-if="!addEventMode" class="create-event-btn">
            <span class="material-icons mr-1">add</span>
            Create
          </button>
          
          <div v-if="addEventMode" class="space-y-3 p-4 border rounded-md border-gray-200 dark:border-gray-700 mt-4 bg-white dark:bg-gray-800">
            <h4 class="font-medium text-gray-800 dark:text-gray-200">Add Event</h4>
            
            <div>
              <input v-model="newEvent.title" type="text" placeholder="Add title" 
                class="w-full p-2 border-b border-gray-200 dark:border-gray-600 bg-transparent focus:border-blue-300 focus:outline-none text-gray-800 dark:text-gray-200">
            </div>
            
            <div class="flex items-center">
              <span class="material-icons text-gray-500 mr-2 text-lg">schedule</span>
              <input v-model="newEvent.time" type="text" placeholder="Add time" 
                class="flex-1 p-2 border-b border-gray-200 dark:border-gray-600 bg-transparent focus:border-blue-300 focus:outline-none text-gray-800 dark:text-gray-200">
            </div>
            
            <div class="flex items-start">
              <span class="material-icons text-gray-500 mr-2 text-lg mt-2">notes</span>
              <textarea v-model="newEvent.description" rows="2" placeholder="Add description" 
                class="flex-1 p-2 border-b border-gray-200 dark:border-gray-600 bg-transparent focus:border-blue-300 focus:outline-none text-gray-800 dark:text-gray-200"></textarea>
            </div>
            
            <div class="flex items-center">
              <span class="material-icons text-gray-500 mr-2 text-lg">palette</span>
              <select v-model="newEvent.color" 
                class="flex-1 p-2 border-b border-gray-200 dark:border-gray-600 bg-transparent focus:border-blue-300 focus:outline-none text-gray-800 dark:text-gray-200">
                <option value="border-blue-400 bg-blue-50 dark:bg-blue-900/10 text-gray-800 dark:text-gray-200">Blue</option>
                <option value="border-green-400 bg-green-50 dark:bg-green-900/10 text-gray-800 dark:text-gray-200">Green</option>
                <option value="border-red-400 bg-red-50 dark:bg-red-900/10 text-gray-800 dark:text-gray-200">Red</option>
                <option value="border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10 text-gray-800 dark:text-gray-200">Yellow</option>
                <option value="border-purple-400 bg-purple-50 dark:bg-purple-900/10 text-gray-800 dark:text-gray-200">Purple</option>
                <option value="border-indigo-400 bg-indigo-50 dark:bg-indigo-900/10 text-gray-800 dark:text-gray-200">Indigo</option>
                <option value="border-pink-400 bg-pink-50 dark:bg-pink-900/10 text-gray-800 dark:text-gray-200">Pink</option>
              </select>
            </div>
            
            <div class="flex gap-2 pt-2">
              <button @click="saveEvent" class="save-event-btn">Save</button>
              <button @click="addEventMode = false" class="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TheContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

definePageMeta({
    layout: 'free',
    path: '/cong-cu/lich',
})

interface CalendarDay {
  dayNumber: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  date: Date;
}

interface CalendarEvent {
  id: number;
  date: Date;
  title: string;
  time: string;
  description: string;
  color: string;
}

interface NewEventForm {
  title: string;
  time: string;
  description: string;
  color: string;
}

// Calendar state
const currentDate = ref<Date>(new Date());
const selectedDay = ref<CalendarDay | null>(null);
const addEventMode = ref<boolean>(false);
const events = ref<CalendarEvent[]>([
  {
    id: 1,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    title: 'Team Meeting',
    time: '10:00 AM - 11:30 AM',
    description: 'Weekly team sync to discuss project progress',
    color: 'border-blue-400 bg-blue-50 dark:bg-blue-900/10 text-gray-800 dark:text-gray-200'
  },
  {
    id: 2,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    title: 'Product Launch',
    time: '2:00 PM - 4:00 PM',
    description: 'New feature release and announcement',
    color: 'border-green-400 bg-green-50 dark:bg-green-900/10 text-gray-800 dark:text-gray-200'
  },
  {
    id: 3,
    date: new Date(),
    title: 'Doctor Appointment',
    time: '3:30 PM',
    description: 'Annual checkup',
    color: 'border-red-400 bg-red-50 dark:bg-red-900/10 text-gray-800 dark:text-gray-200'
  }
]);

const newEvent = ref<NewEventForm>({
  title: '',
  time: '',
  description: '',
  color: 'border-blue-400 bg-blue-50 dark:bg-blue-900/10 text-gray-800 dark:text-gray-200'
});

// Days of the week labels
const daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Get current month and year
const currentMonth = computed<number>(() => currentDate.value.getMonth());
const currentYear = computed<number>(() => currentDate.value.getFullYear());

const currentMonthName = computed<string>(() => {
  return new Date(currentYear.value, currentMonth.value, 1).toLocaleString('default', { month: 'long' });
});

const formatSelectedDay = computed(() => {
  if (!selectedDay.value) return '';
  return new Date(selectedDay.value.year, selectedDay.value.month, selectedDay.value.dayNumber)
    .toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
});

// Generate calendar days for the current month view
const calendarDays = computed<CalendarDay[]>(() => {
  const days: CalendarDay[] = [];
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);
  
  // Get the day of the week the month starts on (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // Add days from previous month to fill first week
  const previousMonth = new Date(currentYear.value, currentMonth.value, 0);
  const previousMonthDays = previousMonth.getDate();
  
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNumber = previousMonthDays - i;
    const dayDate = new Date(currentYear.value, currentMonth.value - 1, dayNumber);
    
    days.push({
      dayNumber,
      month: currentMonth.value - 1,
      year: currentYear.value,
      isCurrentMonth: false,
      isToday: isSameDay(dayDate, new Date()),
      isSelected: !!selectedDay.value && isSameDay(dayDate, new Date(selectedDay.value.year, selectedDay.value.month, selectedDay.value.dayNumber)),
      date: dayDate
    });
  }
  
  // Add days for current month
  for (let dayNumber = 1; dayNumber <= lastDayOfMonth.getDate(); dayNumber++) {
    const dayDate = new Date(currentYear.value, currentMonth.value, dayNumber);
    
    days.push({
      dayNumber,
      month: currentMonth.value,
      year: currentYear.value,
      isCurrentMonth: true,
      isToday: isSameDay(dayDate, new Date()),
      isSelected: !!selectedDay.value && isSameDay(dayDate, new Date(selectedDay.value.year, selectedDay.value.month, selectedDay.value.dayNumber)),
      date: dayDate
    });
  }
  
  // Add days from next month to complete the calendar grid (ensure we have multiples of 7)
  const nextMonthDays = 42 - days.length; // 6 rows × 7 days = 42
  
  for (let dayNumber = 1; dayNumber <= nextMonthDays; dayNumber++) {
    const dayDate = new Date(currentYear.value, currentMonth.value + 1, dayNumber);
    
    days.push({
      dayNumber,
      month: currentMonth.value + 1,
      year: currentYear.value,
      isCurrentMonth: false,
      isToday: isSameDay(dayDate, new Date()),
      isSelected: !!selectedDay.value && isSameDay(dayDate, new Date(selectedDay.value.year, selectedDay.value.month, selectedDay.value.dayNumber)),
      date: dayDate
    });
  }
  
  return days;
});

// Helper functions
const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() && 
         date1.getMonth() === date2.getMonth() && 
         date1.getFullYear() === date2.getFullYear();
};

const isFirstDayOfMonth = (day: CalendarDay): boolean => {
  return day.dayNumber === 1;
};

const getMonthShortName = (day: CalendarDay): string => {
  return new Date(day.year, day.month, 1).toLocaleString('default', { month: 'short' });
};

// Get events for a specific day
const getEventsForDay = (day: CalendarDay | null): CalendarEvent[] => {
  if (!day) return [];
  
  return events.value.filter(event => 
    isSameDay(event.date, new Date(day.year, day.month, day.dayNumber))
  );
};

// Navigation functions
const previousMonth = (): void => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};

const nextMonth = (): void => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
};

const goToToday = (): void => {
  currentDate.value = new Date();
  const today = calendarDays.value.find(day => day.isToday);
  if (today) {
    selectDay(today);
  }
};

// Select a day
const selectDay = (day: CalendarDay): void => {
  selectedDay.value = day;
};

const closePanel = (): void => {
  selectedDay.value = null;
};

const viewEvent = (event: CalendarEvent): void => {
  // Future implementation: view event details
  console.log('View event:', event);
};

// Save a new event
const saveEvent = (): void => {
  if (!selectedDay.value || !newEvent.value.title) return;
  
  const eventDate = new Date(selectedDay.value.year, selectedDay.value.month, selectedDay.value.dayNumber);
  
  events.value.push({
    id: Date.now(),
    date: eventDate,
    title: newEvent.value.title,
    time: newEvent.value.time || 'All day',
    description: newEvent.value.description || '',
    color: newEvent.value.color
  });
  
  // Reset form
  newEvent.value = {
    title: '',
    time: '',
    description: '',
    color: 'border-blue-400 bg-blue-50 dark:bg-blue-900/10 text-gray-800 dark:text-gray-200'
  };
  
  addEventMode.value = false;
};
</script>

<style scoped>
.calendar-container {
  max-width: 1200px;
  margin: 0 auto;
}

.calendar-day {
  min-height: 100px;
  transition: all 0.1s ease;
  border: 1px solid #f3f4f6;
}

.calendar-day:hover {
  background-color: #fafafa;
}

.dark .calendar-day:hover {
  background-color: #1e293b;
}

.calendar-nav-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f6368;
  transition: all 0.2s;
  border: 1px solid #f3f4f6;
}

.calendar-nav-btn:hover {
  background-color: #f9fafb;
  border-color: #e5e7eb;
}

.dark .calendar-nav-btn {
  color: #e2e8f0;
  border-color: #374151;
}

.dark .calendar-nav-btn:hover {
  background-color: #334155;
}

.today-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background-color: #fff;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

.today-btn:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.dark .today-btn {
  background-color: #1f2937;
  border-color: #4b5563;
  color: #e5e7eb;
}

.dark .today-btn:hover {
  background-color: #334155;
}

.create-event-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #374151;
  border-radius: 4px;
  font-weight: 500;
  width: 100%;
  transition: all 0.2s;
  border: 1px solid #e5e7eb;
}

.create-event-btn:hover {
  background-color: #e5e7eb;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.dark .create-event-btn {
  background-color: #374151;
  color: #e5e7eb;
  border-color: #4b5563;
}

.dark .create-event-btn:hover {
  background-color: #4b5563;
}

.save-event-btn {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #374151;
  border-radius: 4px;
  font-weight: 500;
  flex: 1;
  transition: all 0.2s;
  border: 1px solid #e5e7eb;
}

.save-event-btn:hover {
  background-color: #e5e7eb;
}

.dark .save-event-btn {
  background-color: #374151;
  color: #e5e7eb;
  border-color: #4b5563;
}

.dark .save-event-btn:hover {
  background-color: #4b5563;
}

.cancel-btn {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #374151;
  border-radius: 4px;
  font-weight: 500;
  flex: 1;
  transition: all 0.2s;
  border: 1px solid #e5e7eb;
}

.cancel-btn:hover {
  background-color: #f9fafb;
}

.dark .cancel-btn {
  color: #e2e8f0;
  border-color: #4b5563;
}

.dark .cancel-btn:hover {
  background-color: #334155;
}

.event-chip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.75rem;
  border: 1px solid #e5e7eb;
}

.day-panel {
  border-left: 1px solid #e5e7eb;
}

.dark .day-panel {
  border-left: 1px solid #4b5563;
}

@media (max-width: 768px) {
  .calendar-day {
    min-height: 60px;
  }
  
  .day-panel {
    width: 100%;
  }
}

/* Add material icons support */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface UserData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  level: string;
  specialties: string[];
}

export interface AppState {
  user: UserData | null;
  moduleProgress: Record<string, 'locked' | 'active' | 'completed'>;
  achievements: string[];
  labSessionsHours: number;
  totalProgress: number; // 0-100%
  streakDays: number;
  lastSessionDuration: number; // in hours or minutes, let's say hours
  weeklyActivity: { day: string, hours: number }[];
  skillAudit: { fundamentals: number, solving: number, execution: number, collaboration: number };
  updateUser: (data: Partial<UserData>) => void;
  markModuleComplete: (moduleId: string) => void;
  unlockAchievement: (id: string) => void;
  addLabSession: (hours: number) => void;
}

const defaultState: AppState = {
  user: null,
  moduleProgress: {
    "Module 01": "active", // First module is active by default
  },
  achievements: [],
  labSessionsHours: 0,
  totalProgress: 0,
  streakDays: 1, // New users start with 1 day streak
  lastSessionDuration: 0,
  weeklyActivity: [
    { day: 'Mon', hours: 0 }, { day: 'Tue', hours: 0 }, { day: 'Wed', hours: 0 },
    { day: 'Thu', hours: 0 }, { day: 'Fri', hours: 0 }, { day: 'Sat', hours: 0 }, { day: 'Sun', hours: 0 }
  ],
  skillAudit: { fundamentals: 10, solving: 15, execution: 5, collaboration: 10 },
  updateUser: () => {},
  markModuleComplete: () => {},
  unlockAchievement: () => {},
  addLabSession: () => {},
};

const AppContext = createContext<AppState>(defaultState);

export const AppProvider = ({ children, initialUser }: { children: ReactNode, initialUser?: any }) => {
  const [user, setUser] = useState<UserData | null>(initialUser || null);
  const [moduleProgress, setModuleProgress] = useState<Record<string, 'locked' | 'active' | 'completed'>>({ "Module 01": "active" });
  const [achievements, setAchievements] = useState<string[]>(defaultState.achievements);
  const [labSessionsHours, setLabSessionsHours] = useState(defaultState.labSessionsHours);
  const [totalProgress, setTotalProgress] = useState(defaultState.totalProgress);
  const [streakDays, setStreakDays] = useState(defaultState.streakDays);
  const [lastSessionDuration, setLastSessionDuration] = useState(defaultState.lastSessionDuration);
  const [weeklyActivity, setWeeklyActivity] = useState(defaultState.weeklyActivity);
  const [skillAudit, setSkillAudit] = useState(defaultState.skillAudit);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Load from local storage
    const stored = localStorage.getItem('steh_app_state');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.moduleProgress) setModuleProgress(parsed.moduleProgress);
        if (parsed.achievements) setAchievements(parsed.achievements);
        if (parsed.labSessionsHours) setLabSessionsHours(parsed.labSessionsHours);
        if (parsed.totalProgress) setTotalProgress(parsed.totalProgress);
        if (parsed.streakDays) setStreakDays(parsed.streakDays);
        if (parsed.lastSessionDuration) setLastSessionDuration(parsed.lastSessionDuration);
        if (parsed.weeklyActivity) setWeeklyActivity(parsed.weeklyActivity);
        if (parsed.skillAudit) setSkillAudit(parsed.skillAudit);
        if (parsed.user && !user) setUser(parsed.user);
      } catch (e) {
        console.error("Failed to parse app state", e);
      }
    } else {
      // First login - start them fresh with level 1 badge if applicable
      setAchievements(["Early Bird"]);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const stateToSave = {
        user,
        moduleProgress,
        achievements,
        labSessionsHours,
        totalProgress,
        streakDays,
        lastSessionDuration,
        weeklyActivity,
        skillAudit
      };
      localStorage.setItem('steh_app_state', JSON.stringify(stateToSave));
    }
  }, [user, moduleProgress, achievements, labSessionsHours, totalProgress, streakDays, lastSessionDuration, weeklyActivity, skillAudit, isHydrated]);

  const updateUser = (data: Partial<UserData>) => {
    setUser(prev => prev ? { ...prev, ...data } : data as UserData);
  };

  const markModuleComplete = (moduleId: string) => {
    setModuleProgress(prev => {
      if (prev[moduleId] === 'completed') return prev; // Already complete
      const newState = { ...prev, [moduleId]: 'completed' as const };
      
      const num = parseInt(moduleId.replace('Module ', ''), 10);
      if (!isNaN(num) && num < 12) {
        const nextId = `Module ${String(num + 1).padStart(2, '0')}`;
        newState[nextId] = 'active';
      }
      return newState;
    });

    setTotalProgress(prev => {
      return Math.min(100, prev + Math.floor(100 / 12));
    });
    
    // Gain skills upon completing modules
    setSkillAudit(prev => ({
      ...prev,
      fundamentals: Math.min(100, prev.fundamentals + 5),
      solving: Math.min(100, prev.solving + 3)
    }));
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const addLabSession = (hours: number) => {
    setLabSessionsHours(prev => prev + hours);
    setLastSessionDuration(hours);
    
    setSkillAudit(prev => ({
      ...prev,
      solving: Math.min(100, prev.solving + 10),
      execution: Math.min(100, prev.execution + 8)
    }));

    // Add hours to today's active day (mock simulated as current day of week)
    const currentDayStr = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    setWeeklyActivity(prev => prev.map(d => 
      d.day === currentDayStr ? { ...d, hours: d.hours + hours } : d
    ));
    
    // Simulate streak increment if they work
    setStreakDays(prev => prev + 1);
  };

  if (!isHydrated) return null; // Prevent hydration flash

  return (
    <AppContext.Provider value={{
      user,
      moduleProgress,
      achievements,
      labSessionsHours,
      totalProgress,
      streakDays,
      lastSessionDuration,
      weeklyActivity,
      skillAudit,
      updateUser,
      markModuleComplete,
      unlockAchievement,
      addLabSession
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);

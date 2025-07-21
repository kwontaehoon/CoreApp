import { create } from 'zustand'

type Session = {
  access_token: string
  user: {
    id: string
    email: string
  }
}

type SessionStore = {
  session: Session | null
  setSession: (session: Session) => void
  clearSession: () => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  clearSession: () => set({ session: null }),
}))

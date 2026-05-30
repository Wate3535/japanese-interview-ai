
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import {
  db,
  auth,
} from '@/lib/firebase';

export interface CreateSessionData {
  interviewType: string;
  mode: 'chat' | 'video';
}

export class InterviewService {
  static async createSession(
    data: CreateSessionData
  ) {
    const sessionRef =
      await addDoc(
        collection(
          db,
          'interviewSessions'
        ),
        {
          uid:
            auth.currentUser?.uid ??
            null,

          interviewType:
            data.interviewType,

          mode:
            data.mode,

          status:
            'active',

          startedAt:
            serverTimestamp(),

          createdAt:
            serverTimestamp(),
        }
      );

    return sessionRef.id;
  }

static async saveMessage(
  sessionId: string,
  role: 'user' | 'assistant',
  content: string
) {
  await addDoc(
    collection(
      db,
      'interviewMessages'
    ),
    {
      sessionId,

      uid:
        auth.currentUser?.uid ??
        null,

      role,

      content,

      createdAt:
        serverTimestamp(),
    }
  );
}


static async getMessagesBySession(
  sessionId: string
) {
  const q = query(
    collection(
      db,
      'interviewMessages'
    ),
    where(
      'sessionId',
      '==',
      sessionId
    )
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (doc) => doc.data()
  );
}


   

 static async completeSession(
  sessionId: string,
  duration: number
) {
  console.log(
    'COMPLETE SESSION',
    sessionId,
    duration
  );

  await updateDoc(
    doc(
      db,
      'interviewSessions',
      sessionId
    ),
    {
      status: 'completed',
      duration,
      endedAt: serverTimestamp(),
    }
  );

  console.log(
    'SESSION UPDATED'
  );
}}


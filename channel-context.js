import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5uZ2jt01wJVCWfjdJ6IFa5fAVbdfoI_c",
  authDomain: "lumio-6efed.firebaseapp.com",
  databaseURL: "https://lumio-6efed-default-rtdb.firebaseio.com",
  projectId: "lumio-6efed"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

let channelContext = {
  user: null,
  channel: null,
  ready: false
};

const listeners = [];

export function onChannelReady(cb) {
  if (channelContext.ready) cb(channelContext);
  else listeners.push(cb);
}

onAuthStateChanged(auth, async user => {
  channelContext.user = user;

  if (!user) {
    channelContext.ready = true;
    listeners.forEach(cb => cb(channelContext));
    return;
  }

  const q = query(
    ref(db, "channels"),
    orderByChild("owner"),
    equalTo(user.uid)
  );

  const snap = await get(q);

  if (snap.exists()) {
    const [id, data] = Object.entries(snap.val())[0];
    channelContext.channel = { id, ...data };
  }

  channelContext.ready = true;
  listeners.forEach(cb => cb(channelContext));
});

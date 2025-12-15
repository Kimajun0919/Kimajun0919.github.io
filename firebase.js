import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  get,
  child,
  remove,
  update,
  set,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

// 기존 프로젝트 설정 반영
const firebaseConfig = {
  apiKey: "AIzaSyCXaqnaoQYWZGywi_PPRohGaAJj_dBVDK0",
  authDomain: "haneulcard.firebaseapp.com",
  databaseURL: "https://haneulcard-default-rtdb.firebaseio.com",
  projectId: "haneulcard",
  storageBucket: "haneulcard.appspot.com",
  messagingSenderId: "814685525921",
  appId: "1:814685525921:web:eacd7b62ca15e983875de0",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// 기존 DB와 충돌을 피하기 위해 별도 네임스페이스 경로 사용
const PRAYERS_PATH = "apps/christmas_prayers";
const UID_KEY = "christmas_prayer_uid";

export function getUid() {
  const existing = localStorage.getItem(UID_KEY);
  if (existing) return existing;
  const fresh = crypto.randomUUID();
  localStorage.setItem(UID_KEY, fresh);
  return fresh;
}

export async function createPrayer({ content, author }) {
  const uid = getUid();
  const payload = {
    content,
    author: author?.trim() || "익명",
    uid,
    createdAt: Date.now(),
  };
  const prayersRef = ref(db, PRAYERS_PATH);
  await push(prayersRef, payload);
}

export async function listPrayers() {
  const snap = await get(child(ref(db), PRAYERS_PATH));
  if (!snap.exists()) return [];
  const obj = snap.val() || {};
  // 객체를 배열로 변환하면서 최신순 정렬
  return Object.entries(obj)
    .map(([id, value]) => ({ id, ...value }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export async function findMyLatest() {
  const uid = getUid();
  const all = await listPrayers();
  const mine = all.filter((p) => p.uid === uid);
  return mine.length ? mine[0] : null;
}

export async function pickRandom() {
  const all = await listPrayers();
  if (!all.length) return null;
  return all[Math.floor(Math.random() * all.length)];
}

// 관리자 기능: 개별 삭제
export async function deletePrayer(id) {
  const prayerRef = ref(db, `${PRAYERS_PATH}/${id}`);
  await remove(prayerRef);
}

// 관리자 기능: 수정
export async function updatePrayer(id, { content, author }) {
  const prayerRef = ref(db, `${PRAYERS_PATH}/${id}`);
  await update(prayerRef, {
    content,
    author: author?.trim() || "익명",
    updatedAt: Date.now(),
  });
}

// 관리자 기능: 여러 개 삭제
export async function deleteMultiplePrayers(ids) {
  const updates = {};
  ids.forEach(id => {
    updates[`${PRAYERS_PATH}/${id}`] = null;
  });
  await update(ref(db), updates);
}

// 관리자 기능: 전체 삭제
export async function deleteAllPrayers() {
  const prayersRef = ref(db, PRAYERS_PATH);
  await remove(prayersRef);
}


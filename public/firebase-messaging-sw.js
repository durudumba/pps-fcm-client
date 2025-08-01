// 서비스 워커 파일
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function () {
  console.log("fcm sw activate..");
});

self.addEventListener("notificationclick", function(event) {
  const url = "/history";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;
  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
  };
  console.log(resultData.title, {
    body: resultData.body,
  });
  e.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
});

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.error("Ce navigateur ne supporte pas les notifications");
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const sendLocalNotification = (title: string, options: NotificationOptions) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: 'https://cdn-icons-png.flaticon.com/512/3246/3246660.png',
      badge: 'https://cdn-icons-png.flaticon.com/512/3246/3246660.png',
      ...options
    });
  }
};

export const simulateIncomingPush = async (type: 'event' | 'community', data: any) => {
  if (Notification.permission !== 'granted') return;

  setTimeout(async () => {
    const registration = await navigator.serviceWorker.ready;
    let title = "Le Tabernacle de la Foi";
    let body = "";

    if (type === 'event') {
      title = "Nouvel Événement Sacré";
      body = `Ne manquez pas : ${data.title} à ${data.time}`;
    } else {
      title = "Mise à jour Communauté";
      body = `${data.user} a partagé un nouveau témoignage.`;
    }

    registration.showNotification(title, {
      body,
      icon: 'https://cdn-icons-png.flaticon.com/512/3246/3246660.png',
      tag: type,
      data: { url: window.location.origin },
      vibrate: [200, 100, 200]
    } as any);
  }, 2000);
};

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const daysFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
const banglaDays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার","শনিবার"];

// For geting Today date
const date = new Date();
const todayNmbr = date.getDay();
const today = days[todayNmbr];
const todayFull = daysFull[date.getDay()];
const todayDate = date.getDate();
const todayMonth = months[date.getMonth()];
const todayYear = date.getFullYear();

// For geting Tomorrow date
const dateTm = new Date();
dateTm.setDate(dateTm.getDate() + 1);
const tomorrowNmbr = dateTm.getDay();
const tomorrow = days[tomorrowNmbr];
const tomorrowFull = daysFull[tomorrowNmbr];
const tomorrowDate = dateTm.getDate()
const tomorrowMonth = months[dateTm.getMonth()];
const tomorrowYear = dateTm.getFullYear();

const formatedDate = `${todayFull}, ${todayDate} ${todayMonth} ${todayYear}`
const formatedDateTm = `${tomorrowFull}, ${tomorrowDate} ${tomorrowMonth} ${tomorrowYear}`
const todayShort = `${todayDate} ${monthsShort[date.getMonth()]}`
const tomorrowShort = `${tomorrowDate} ${monthsShort[dateTm.getMonth()]}`

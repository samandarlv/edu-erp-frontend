import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format("YYYY/MM/DD");
};

export const formatTime = (time) => {
  let start_hour = `${parseInt(time / 60)}`.padStart(2, 0);
  let start_minute = `${parseInt(time % 60)}`.padStart(2, 0);

  return `${start_hour}:${start_minute}`;
};

export const formatDateAttendance = (date) => {
  return moment(date).format("DD.MM");
};

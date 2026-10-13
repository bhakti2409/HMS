import dayjs from 'dayjs';

export const formatDate = (date) => (date ? dayjs(date).format('DD MMM YYYY') : '-');

export const formatTime = (time) => (time ? dayjs(`2000-01-01 ${time}`).format('hh:mm A') : '-');

export const formatCurrency = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`;

export const statusColor = {
  Pending: 'yellow',
  Confirmed: 'blue',
  Completed: 'green',
  Cancelled: 'red',
};

export const todayString = () => dayjs().format('YYYY-MM-DD');

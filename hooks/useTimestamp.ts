import { useMemo } from 'react';

interface TimeStampProps {
  timestamp: number;
}

const useTimeStamp = ({ timestamp }: TimeStampProps) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      if (days === 1) return '1 day ago';
      if (days > 1 && days < 30) return `${days} days ago`;
      if (days >= 30 && days < 365) {
        const months = Math.floor(days / 30);
        return months === 1 ? '1 month ago' : `${months} months ago`;
      }
      if (days >= 365) {
        const years = Math.floor(days / 365);
        return years === 1 ? '1 year ago' : `${years} years ago`;
      }
    }

    const hoursString = date.getHours().toString().padStart(2, '0');
    const minutesString = date.getMinutes().toString().padStart(2, '0');
    return `${hoursString}:${minutesString}`;
  };

  return useMemo(() => formatTimeAgo(new Date(timestamp)), [timestamp]);
};

export default useTimeStamp;


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
      return days === 1 ? '1 day ago' : `${days} days ago`;
    }

    if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    }

    if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    }

    return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
  };

  return useMemo(() => formatTimeAgo(new Date(timestamp)), [timestamp]);
};

export default useTimeStamp

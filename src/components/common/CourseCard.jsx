import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CourseCard = ({ course }) => {
  const { id, title, description, thumbnail, instructor, rating, students, price, level, duration } = course;
  const isFree = !price || price === 0;

  return (
    <div className="group bg-[#14143A] rounded-xl border border-[#252560] overflow-hidden hover:border-[#6C3BFF] transition-all duration-300 hover:shadow-glow">
      <Link to={`/course/${id}`}>
        <div className="relative overflow-hidden h-48">
          <img src={thumbnail || 'https://via.placeholder.com/400x200'} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <span className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-xs rounded-md">{level || 'Beginner'}</span>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/course/${id}`}>
          <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-[#6C3BFF]">{title}</h3>
        </Link>
        <p className="text-sm text-[#A0A0C8] mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span>{rating || 4.5}</span>
            <span className="text-xs text-[#A0A0C8]">({students || 0})</span>
          </div>
          <span className="text-xs text-[#A0A0C8]">{duration || '2h'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#A0A0C8]">by <span className="text-white">{instructor?.name || 'Expert'}</span></span>
          <span className="text-lg font-bold">{isFree ? <span className="text-[#00FFB2]">FREE</span> : `₦${price?.toLocaleString()}`}</span>
        </div>
        <div className="mt-4">
          <Button to={`/course/${id}`} variant={isFree ? 'success' : 'primary'} fullWidth size="sm">
            {isFree ? 'Start Free' : 'Enroll Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

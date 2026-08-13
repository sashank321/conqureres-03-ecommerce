import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
  const numericValue = parseFloat(('' + value).replace(/[^0-9.]/g, '')) || 0;
  const spring = useSpring(0, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, (current) => {
    return prefix + Math.floor(current).toLocaleString('en-IN') + suffix;
  });

  useEffect(() => {
    spring.set(numericValue);
  }, [numericValue, spring]);

  return <motion.span>{display}</motion.span>;
};

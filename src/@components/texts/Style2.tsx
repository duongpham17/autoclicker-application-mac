import styles from './Style2.module.scss';
import React from 'react';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  color?: "default" | "light" | "dark" | "red" | "green" | "primary",
  children: React.ReactNode, 
  size?: any,
};

const Style2 = ({children, color="default", size}: Props) => {
  return (
    <p className={`${styles.container} ${styles[color]}`} style={{fontSize: size}}>{children}</p>
  )
}

export default Style2
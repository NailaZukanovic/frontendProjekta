import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Modal from './Modal';

const containerVariants = {
  hidden: { 
    opacity: 0, 
    x: '100vw',
    transition: {
      staggerChildren: 0.5,
    } 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring',
      mass: 0.4,
      damping: 8,
      staggerChildren: 0.4,
      when: "beforeChildren",
    }
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  }
}

const Order = ({ pizza, setShowModal, showModal }) => {
  // useEffect lifecycle hook, array with only setShowModal as dep 
  useEffect(() => {
    setTimeout(() => setShowModal(true), 50000);
  }, [setShowModal]);

  return (
    <div className="zaPozadinu">
    <Header/>
    <Modal showModal={showModal} />

    <motion.div className="container order"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2>Thank you for your order :)</h2>
      <motion.p variants={childVariants}>You ordered a {pizza.base} pizza with:</motion.p>
      <motion.div variants={childVariants}>
        {pizza.toppings.map(topping => <div key={topping} >{topping}</div>)}
      </motion.div>    
    </motion.div>
    </div>
  )
}

export default Order;
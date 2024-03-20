'use client';
import { useState } from 'react';
import Link from 'next/link';
import SubHeading from './SubHeading';
// import DarkModeToggle from './DarkModeToggle';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import DarkToggle from './DarkToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    open: {
      rotate: 180,
      scale: 1.2,
      transition: {
        duration: 0.6,
      },
    },
    closed: {
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const buttonControls = useAnimation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    buttonControls.start(isOpen ? 'closed' : 'open');
  };

  return (
    <motion.nav
      className="flex items-center justify-between flex-wrap p-3 navbar mt-0 sticky top-0 z-20 bg-base-200 shadow-2xl bg-opacity-90"
      style={{ fontFamily: "'Poppins', sans-serif" }}
      initial="hidden"
      animate="show"
      variants={variants}
    >
      <div className="flex items-center flex-shrink-0 text-2xl mr-6">
        <Link href="/">
          <span
            onClick={closeNavbar}
            className="font-semibold text-xl tracking-tight cursor-pointer"
          >
            <div className="flex items-center">
              {/* Logo Image */}
              <Image
                src="/img/logo.png" // Specify the path to your logo image
                alt="Logo"
                width={70}
                height={70}
                className="icon m-1 rounded-full"
              />
              {/* SubHeading */}
              <SubHeading title="Grocery App" />
            </div>
          </span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <motion.button
          type="button"
          onClick={toggleNavbar}
          className="text-4xl inline-flex items-center justify-center p-2 rounded-md hover:bg-button hover:text-buttonText focus:outline-none focus:ring-2 focus:ring-inset focus:ring-buttonText text-base-content"
          animate={buttonControls}
          variants={buttonVariants}
          initial="closed"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </motion.button>
      </div>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } w-full lg:flex lg:items-center lg:w-auto lg:justify-end`}
      >
        <div className="text-sm lg:flex-grow">
          <Link href="/inventory">
            <span
              onClick={closeNavbar}
              className="block mt-4 lg:inline-block lg:mt-0 text-strokeLight text-xl  hover:underline mr-4 cursor-pointer"
            >
              <i className="mr-2"></i>Inventory{' '}
            </span>
          </Link>
          <Link href="/list">
            <span
              onClick={closeNavbar}
              className="block mt-4 lg:inline-block lg:mt-0 text-strokeLight text-xl  hover:underline mr-4 cursor-pointer"
            >
              <i className="mr-2"></i>Shopping List
            </span>
          </Link>
          <Link href="/recipes">
            <span
              onClick={closeNavbar}
              className="block mt-4 lg:inline-block lg:mt-0 text-strokeLight text-xl hover:underline mr-4 cursor-pointer"
            >
              Recipes
            </span>
          </Link>
          <Link href="/mealplanner">
            <span
              onClick={closeNavbar}
              className="block mt-4 lg:inline-block lg:mt-0 text-strokeLight text-xl hover:underline mr-4 cursor-pointer"
            >
              Meal Planner
            </span>
          </Link>
          {/* <Link href="/feedback">
            <span
              onClick={closeNavbar}
              className="block mt-4 lg:inline-block lg:mt-0 text-strokeLight text-xl hover:underline mr-4 cursor-pointer"
            >
              <i className="fas fa-comments mr-2"></i>Feedback
            </span>
          </Link>
          <Link href="/contact">
            <span
              onClick={closeNavbar}
              className="block mt-4 lg:inline-block lg:mt-0 text-strokeLight text-xl hover:underline cursor-pointer mr-2"
            >
              <i className="fas fa-envelope mr-2"></i>Contact
            </span>
          </Link> */}
        </div>
        <DarkToggle />
      </div>
    </motion.nav>
  );
};

export default Navbar;

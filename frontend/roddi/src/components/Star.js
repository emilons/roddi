import React, { Fragment, useState, useEffect } from 'react';
import star from '../images/star.png';
import starFilled from '../images/star_filled.png';

/**
 * A filled or empty star which can be interactive
 * @param {boolean} props interactive - Whether this star should be interactive or not
 * @param {function} props onClick - Parent element's onClick function
 * @returns render of Star
 */
function Star(props) {
  const [number, setNumber] = useState(0);
  const [starClass, setStarClass] = useState('');
  const [starSource, setStarSource] = useState(star);

  /**
   * initialize star
   */
  useEffect(() => {
    initFill();
    setNumber(props.id);
  }, []);

  /**
   * helper function to initialize star with correct fill
   */
  function initFill() {
    if (props.interactive) {
      props.id <= props.value
        ? setStarClass('starFilled')
        : setStarClass('star');
    } else {
      setStarClass('starRender');
    }
    props.id <= props.value ? setStarSource(starFilled) : setStarSource(star);
  }

  /**
   * checks whether this star should be interactive, handles click if it is
   * @param {GUI-Object} e - e.target identifies the GUI element that was clicked
   */
  function handleClick(e) {
    if (props.interactive) {
      props.onClick(e);
    }
  }

  return (
    <Fragment>
      <img
        src={starSource}
        id={'star' + number}
        className={starClass}
        alt={number}
        onClick={handleClick}
      />
    </Fragment>
  );
}
export default Star;

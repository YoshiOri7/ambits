import React from 'react';
import Ambit from './ambit.jsx';

const noteText = {
  color: '#f44842',
  fontSize: 12,
  paddingLeft: 10,
  paddingRight: 10
}

const AmbitList = (props) => {
  return (
    <div className='ambitList'>
      <div style={noteText}>Note: Users can only 'Check In' when they are in the vicinity of activity location.</div>
      {
        props.ambits.map((item, index) =>
          (<Ambit
             ambit={item}
             handleCheckinAmbit={props.handleCheckinAmbit}
             handleViewAmbit={props.handleViewAmbit}
             key={index}
            />))
      }
      </div>
  );
}


AmbitList.propTypes = {
  ambits: React.PropTypes.array.isRequired,
  handleCheckinAmbit: React.PropTypes.func.isRequired
};


export default AmbitList;

import React            from 'react';
import {Component}      from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';

const divStyle = {
  textAlign: 'center'
};

const btnText = {
  fontSize: '20px',
  color: 'white'
}

const styleSpacing = {
  marginTop: 12,
  marginRight: 10
};

const days = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
const noteText = {
  color: '#f44842',
  fontSize: 12,
  textAlign: 'left'
}

class AmbitWeekdays extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={divStyle}>
       <div style={noteText}>Note: Users can only 'Check In' when they are in the vicinity of activity location.</div>

        {
          days.map((day, index) =>
            <FloatingActionButton
              backgroundColor={'purple'}
              mini={true}
              children={day}
              disabled={!this.props.ambit.weekdays[index]}
              iconStyle={btnText}
              style={styleSpacing}
              key={index}
            >
            </FloatingActionButton>
        )}
      </div>
      )
  }
}

export default AmbitWeekdays;
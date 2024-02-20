import React from 'react'

const CustomizableField = ({ inputType, inputValue, onChangeEvent, inputPlaceholder, minDate, searchClassName }) => {
  return (
    <div>
      <input
      className ={searchClassName }
        type={inputType}
        value={inputValue}
        onChange={(e) => {
          // Add validation for end date not less than start date
          if (minDate && inputType === 'date') {
            const selectedDate = new Date(e.target.value);
            const minDateValue = new Date(minDate);
            if (selectedDate < minDateValue) {
              // Prevent selecting a date less than minDate
              return;
            }
          }
          onChangeEvent(e.target.value);
        }}
        placeholder={inputPlaceholder}
        min={minDate} // Set min attribute for date input
      />
    </div>
  )
}

export default CustomizableField

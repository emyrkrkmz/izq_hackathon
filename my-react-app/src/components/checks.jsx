import React, { useState } from 'react';

function CheckboxExample() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div>
            <input
                type="checkbox"
                id="subscribe"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <label htmlFor="subscribe">Subscribe to newsletter</label>
            <div>
                {isChecked ? 'You are subscribed.' : 'You are not subscribed.'}
            </div>
        </div>
    );
}
export default CheckboxExample;
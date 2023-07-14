import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import './InputForm.css';
import PropTypes from 'prop-types'
import "react-datepicker/dist/react-datepicker.css";

export default function InputForm({
	fileData,
	handleSubmit,
	handleChange,
	dateValue,
	setDateValue,
    birthday,
    setBirthday
}) {
	return (
		<div className='post-wrapper input-form'>
			<form onSubmit={handleSubmit} className='new-file-form'>
				<label>
					<h4>Title</h4>
					<p>name or description</p>
					<textarea name='title' value={fileData.title} type='text' onChange={handleChange} />
				</label>
				<label>
					<h4>Relationship</h4>
					<p>who they are to you</p>
					<textarea
						name='relationship'
						value={fileData.relationship}
						type='text'
						onChange={handleChange}
					/>
				</label>
				<label>
					<h4>Circumstances</h4>
					<p>major life events</p>
					<textarea
						name='circumstances'
						value={fileData.circumstances}
						type='text'
						onChange={handleChange}
					/>
				</label>
                <div className="calendar-container">
                    <label>
                        <h4>Birthday</h4>
                    </label>
                    <DatePicker onChange={(birthday) => setBirthday(birthday)} selected={birthday} className="date-picker" />
                </div>
				<div className='calendar-container'>
					<label>
						<h4>Date</h4>
					</label>
					<p>last time you interacted</p>
					<DatePicker
						onChange={(date) => setDateValue(date)}
						selected={dateValue}
						className='date-picker'
					/>
				</div>
				<label>
					<h4>Notes</h4>
					<textarea name='notes' value={fileData.notes} type='text' onChange={handleChange} />
				</label>
				<div className='btn postbtn1'>
					<input className='postBtn' type='submit' value='Save File' />
				</div>
			</form>
		</div>
	);
}

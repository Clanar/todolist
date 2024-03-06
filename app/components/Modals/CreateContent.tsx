"use client";

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function CreateContent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);

    const handleChange = (name: string) => (e: any) => {
        switch (name) {
            case "title":
                setTitle(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "date":
                setDate(e.target.value);
                break;
            case "completed":
                setCompleted(e.target.checked);
                break;
            case "important":
                setImportant(e.target.checked);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const task = {
            title,
            description,
            date,
            completed,
            important,
        };

        try {
            const res = await axios.post("/api/tasks", task);

            if (res.data.error) {
                toast.error(res.data.error);
            }
            toast.success("Task created successfully")
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }
    return <form onSubmit={handleSubmit}>
        <h1>Create a Task</h1>
        <div className='inpute-control'>
            <label htmlFor='title'>Title</label>
            <input
                id="title"
                value={title}
                name="title"
                type="text"
                onChange={handleChange("title")}
            />
        </div>

        <div className='inpute-control'>
            <label htmlFor='description'>Description</label>
            <textarea
                id="description"
                value={description}
                name="description"
                rows={4}
                onChange={handleChange("description")}
            />
        </div>

        <div className='inpute-control'>
            <label htmlFor='date'>Date</label>
            <input
                type="date"
                id="date"
                value={date}
                name="date"
                onChange={handleChange("date")}
            />
        </div>

        <div className='inpute-control'>
            <label htmlFor='completed'>Toggle completed</label>
            <input
                value={completed.toString()}
                onChange={handleChange("completed")}
                type="checkbox"
                name="completed"
                id="completed"
            />
        </div>

        <div className='inpute-control toggler'>
            <label htmlFor='important'>Toggle important</label>
            <input 
                value={important.toString()}
                onChange={handleChange("important")}
                name="important"
                type="checkbox"
                id="important"
            />
        </div>
        <div className="submit-btn">
            <button type="submit">
                <span>Submit</span>
            </button>
        </div>
    </form>
}

export default CreateContent
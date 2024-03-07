"use client";

import { useGlobalState } from '@/app/context/GlobalProvider';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../Button/Button';
import { plus } from '@/app/utils/icons';

function CreateContent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);

    const { theme, allTasks, closeModal } = useGlobalState();

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
                return;
            }
            toast.success("Task created successfully");
            allTasks();
            closeModal();
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }
    return <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
        <h1>Create a Task</h1>
        <div className='input-control'>
            <label htmlFor='title'>Title</label>
            <input
                id="title"
                value={title}
                name="title"
                type="text"
                onChange={handleChange("title")}
                placeholder="write something"
            />
        </div>

        <div className='input-control'>
            <label htmlFor='description'>Description</label>
            <textarea
                id="description"
                value={description}
                name="description"
                rows={4}
                onChange={handleChange("description")}
                placeholder="here too"
            />
        </div>

        <div className='input-control date'>
            <label htmlFor='date'>Date</label>
            <input
                type="date"
                id="date"
                value={date}
                name="date"
                onChange={handleChange("date")}
            />
        </div>

        <div className='input-control toggler'>
            <label htmlFor='completed'>Toggle completed</label>
            <input
                value={completed.toString()}
                onChange={handleChange("completed")}
                type="checkbox"
                name="completed"
                id="completed"
            />
        </div>

        <div className='input-control toggler'>
            <label htmlFor='important'>Toggle important</label>
            <input
                value={important.toString()}
                onChange={handleChange("important")}
                name="important"
                type="checkbox"
                id="important"
            />
        </div>
        <div className="submit-btn flex justify-end">
            <Button
                type="submit"
                name="Create Task"
                icon={plus}
                padding={"0.8rem 2rem"}
                borderRad={"0.8rem"}
                fw={"500"}
                fs={"1.2rem"}
                background={theme.colorGreenDark}
            />
        </div>
    </CreateContentStyled>
}

const CreateContentStyled = styled.form`
    > h1 {
        font-size: clamp(1.2rem, 5vw, 1.6rem);
        font-weight: 600;
    }

    
    color: ${(props) => props.theme.colorGrey1};

    .input-control {
        position: relative;
        margin: 1.6rem 0;
        font-weight: 500;

        label {
            margin-bottom: 0.5rem;
            display: inline-block;
            font-size: clamp(0.9rem, 5vw, 1.2rem);

            span {
                color: ${(props) => props.theme.colorGrey3};
            }
        }

        input, textarea {
            width: 100%;
            padding: 1rem;

            resize: none;
            background-color: ${(props) => props.theme.colorGreyDark};
            color: ${(props) => props.theme.colorGrey2};
            border-radius: 0.5rem;
        }
    }

    .submit-btn button {
        i {
            color: ${(props) => props.theme.colorGrey0};
        }

        transition: all 0.35s ease-in-out;

        &:hover {
            background: ${(props) => props.theme.colorGreenDark2} !important;
            color: ${(props) => props.theme.colorWhite} !important;
        }
    }

    .toggler {
        display: flex;
        align-items: center;
        justify-content: space-between;

        label {
            flex: 1;
        }
        
        input {
            width: initial;
        }
    }
`;

export default CreateContent
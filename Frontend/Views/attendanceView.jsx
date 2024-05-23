import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getStudentsByRoomNo as action } from "../actions/studentActions";
import AttendanceTable from "../components/attendanceTable";

const AttendanceView = () => {
  const [roomNo, setRoomNo] = useState("");
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomNo) {
      dispatch(action(roomNo)).then((data) => {
        setStudents(data);
      });
    }
  }, [dispatch, roomNo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(action(roomNo));
  };

  const changeRoomNo = (e) => {
    setRoomNo(e.target.value);
  };

  return (
    <>
      <h2>Take Attendance</h2>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type="text"
          value={roomNo}
          name="roomNo"
          placeholder="Enter RoomNo"
          className="mr-sm-2 ml-sm-5"
          onChange={(e) => changeRoomNo(e)}
        />
        <Button type="submit">Get Students</Button>
      </Form>
      {students.length > 0 && <AttendanceTable students={students} />}
    </>
  );
};

export default AttendanceView;

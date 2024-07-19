// import React, { useEffect, useState } from 'react';


// const RoomList = () => {
//     const [rooms, setRooms] = useState([]);
//     const [bookingDetails, setBookingDetails] = useState({});
//     const [showBookingForm, setShowBookingForm] = useState(null);
//     const [showBookingDetails, setShowBookingDetails] = useState(null);

//     useEffect(() => {
//         fetch('https://ks3zb6ic5h7f2slsqqbppvn3na0asycx.lambda-url.us-east-1.on.aws/')
//             .then(response => response.json())
//             .then(data => {
//                 if (data && Array.isArray(data.rooms)) {
//                     setRooms(data.rooms);
//                     const initialBookingDetails = {};
//                     data.rooms.forEach(room => {
//                         initialBookingDetails[room.roomid] = {
//                             customerId: '',
//                             startDate: '',
//                             endDate: ''
//                         };
//                     });
//                     setBookingDetails(initialBookingDetails);
//                 } else {
//                     console.error('Error: Data fetched is not in expected format', data);
//                 }
//             })
//             .catch(error => console.error('Error fetching rooms:', error));
//     }, []);

//     const handleInputChange = (event, roomId) => {
//         const { name, value } = event.target;
//         setBookingDetails(prevDetails => ({
//             ...prevDetails,
//             [roomId]: {
//                 ...prevDetails[roomId],
//                 [name]: value
//             }
//         }));
//     };

//     const handleBookRoom = (roomId) => {
//         const details = bookingDetails[roomId] || {};
//         fetch('https://cehxquduntbclpdvcokvwneqqe0erxhf.lambda-url.us-east-1.on.aws/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ...details,
//                 roomId: roomId,
//             }),
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 alert('Room booked successfully!');

//             })
//             .catch(error => console.error('Error booking room:', error));
//     };
//     const toggleBookingDetails = (roomId) => {
//         setShowBookingDetails(showBookingDetails === roomId ? null : roomId);
//     };

//     return (
//         <div>
//             <h2>Rooms Available</h2>
//             <ul>
//                 {Array.isArray(rooms) && rooms.length > 0 ? (
//                     rooms.map(room => (
//                         <li key={room.roomid}>
//                             <p>Type: {room.type}</p>
//                             <p>Price: ${room.price} per night</p>
//                             <p>Features: {room.features.join(', ')}</p>
//                             <button onClick={() => toggleBookingDetails(room.roomid)}>
//                                 {showBookingDetails === room.roomid ? 'Hide Booking Status' : 'View Booking Status'}
//                             </button>
//                             {showBookingDetails === room.roomid && (
//                             <ul>
//                                 {room.bookings && room.bookings.length > 0 ?(
//                                      room.bookings.map((booking, index) => (
//                                     <li key={index}>
//                                         {/*<p>Booking Status: {booking.bookingStatus}</p>*/}
//                                         <p>This Room is booked between the following dates : StartDate: {booking.startDate} to EndDate: {booking.endDate}</p>
//                                     </li>
//                                 ))
//                                 ):(
//                                     <p>No Bookings Made</p>
//                                 )}

//                             </ul>
//                                 )}
//                             <button onClick={() => setShowBookingForm(room.roomid)}>
//                                 {showBookingForm === room.roomid ? 'Hide Booking Form' : 'Book Now'}
//                             </button>
//                             {showBookingForm === room.roomid && (
//                                 <form onSubmit={(e) => { e.preventDefault(); handleBookRoom(room.roomid); }}>
//                                     <div>
//                                         <label htmlFor="customerId">Customer ID:</label>
//                                         <input
//                                             type="text"
//                                             id="customerId"
//                                             name="customerId"
//                                             value={(bookingDetails[room.roomid] && bookingDetails[room.roomid].customerId) || ''}
//                                             onChange={(e) => handleInputChange(e, room.roomid)}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="startDate">Start Date:</label>
//                                         <input
//                                             type="date"
//                                             id="startDate"
//                                             name="startDate"
//                                             value={(bookingDetails[room.roomid] && bookingDetails[room.roomid].startDate) || ''}
//                                             onChange={(e) => handleInputChange(e, room.roomid)}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="endDate">End Date:</label>
//                                         <input
//                                             type="date"
//                                             id="endDate"
//                                             name="endDate"
//                                             value={(bookingDetails[room.roomid] && bookingDetails[room.roomid].endDate) || ''}
//                                             onChange={(e) => handleInputChange(e, room.roomid)}
//                                         />
//                                     </div>
//                                     <button type="submit">Book Room</button>
//                                 </form>
//                             )}
//                         </li>
//                     ))
//                 ) : (
//                     <p>No rooms available</p>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default RoomList;


import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Container,
    Grid,
    List,
    ListItem,
    TextField,
    Typography
} from '@mui/material';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({});
    const [showBookingForm, setShowBookingForm] = useState(null);
    const [showBookingDetails, setShowBookingDetails] = useState(null);

    useEffect(() => {
        fetch('https://ks3zb6ic5h7f2slsqqbppvn3na0asycx.lambda-url.us-east-1.on.aws/')
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.rooms)) {
                    setRooms(data.rooms);
                    const initialBookingDetails = {};
                    data.rooms.forEach(room => {
                        initialBookingDetails[room.roomid] = {
                            customerId: '',
                            startDate: '',
                            endDate: ''
                        };
                    });
                    setBookingDetails(initialBookingDetails);
                } else {
                    console.error('Error: Data fetched is not in expected format', data);
                }
            })
            .catch(error => console.error('Error fetching rooms:', error));
    }, []);

    const handleInputChange = (event, roomId) => {
        const { name, value } = event.target;
        setBookingDetails(prevDetails => ({
            ...prevDetails,
            [roomId]: {
                ...prevDetails[roomId],
                [name]: value
            }
        }));
    };

    const handleBookRoom = (roomId) => {
        const details = bookingDetails[roomId] || {};
        fetch('https://cehxquduntbclpdvcokvwneqqe0erxhf.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...details,
                roomId: roomId,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert('Room booked successfully!');

            })
            .catch(error => console.error('Error booking room:', error));
    };

    const toggleBookingDetails = (roomId) => {
        setShowBookingDetails(showBookingDetails === roomId ? null : roomId);
    };

    return (
        <Container>
            <Typography variant="h4" component="h2" gutterBottom>
                Rooms Available
            </Typography>
            <Grid container spacing={3}>
                {Array.isArray(rooms) && rooms.length > 0 ? (
                    rooms.map(room => (
                        <Grid item xs={12} sm={6} md={4} key={room.roomid}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Type: {room.type}</Typography>
                                    <Typography>Price: ${room.price} per night</Typography>
                                    <Typography>Features: {room.features.join(', ')}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="outlined" onClick={() => toggleBookingDetails(room.roomid)}>
                                        {showBookingDetails === room.roomid ? 'Hide Booking Status' : 'View Booking Status'}
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => setShowBookingForm(room.roomid)}>
                                        {showBookingForm === room.roomid ? 'Hide Booking Form' : 'Book Now'}
                                    </Button>
                                </CardActions>
                                {showBookingDetails === room.roomid && (
                                    <CardContent>
                                        <List>
                                            {room.bookings && room.bookings.length > 0 ? (
                                                room.bookings.map((booking, index) => (
                                                    <ListItem key={index}>
                                                        <Typography>
                                                            This Room is booked between the following dates: StartDate: {booking.startDate} to EndDate: {booking.endDate}
                                                        </Typography>
                                                    </ListItem>
                                                ))
                                            ) : (
                                                <Typography>No Bookings Made</Typography>
                                            )}
                                        </List>
                                    </CardContent>
                                )}
                                {showBookingForm === room.roomid && (
                                    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleBookRoom(room.roomid); }} sx={{ mt: 2 }}>
                                        <Grid container spacing={2}>
                                            {/* <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Customer ID"
                                                    name="customerId"
                                                    value={(bookingDetails[room.roomid] && bookingDetails[room.roomid].customerId) || ''}
                                                    onChange={(e) => handleInputChange(e, room.roomid)}
                                                />
                                            </Grid> */}
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Start Date"
                                                    name="startDate"
                                                    type="date"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={(bookingDetails[room.roomid] && bookingDetails[room.roomid].startDate) || ''}
                                                    onChange={(e) => handleInputChange(e, room.roomid)}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="End Date"
                                                    name="endDate"
                                                    type="date"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={(bookingDetails[room.roomid] && bookingDetails[room.roomid].endDate) || ''}
                                                    onChange={(e) => handleInputChange(e, room.roomid)}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                            Book Room
                                        </Button>
                                    </Box>
                                )}
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No rooms available</Typography>
                )}
            </Grid>
        </Container>
    );
};

export default RoomList;


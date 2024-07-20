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
    const [showBookingForm, setShowBookingForm] = useState({});
    const [showBookingDetails, setShowBookingDetails] = useState({});

    useEffect(() => {
        fetch('https://ks3zb6ic5h7f2slsqqbppvn3na0asycx.lambda-url.us-east-1.on.aws/')
            .then(response => response.json())
            .then(data => {
                console.log("Data...", data);
                if (data && Array.isArray(data.rooms)) {
                    setRooms(data.rooms);
                    const initialBookingDetails = {};
                    const initialVisibility = {}; 
                    data.rooms.forEach(room => {
                        console.log("Room...", room);
                        initialBookingDetails[room.roomId] = {
                            startDate: '',
                            endDate: ''
                        };
                        initialVisibility[room.roomId] = false;
                    });
                    setBookingDetails(initialBookingDetails);
                    setShowBookingForm({...initialVisibility});
                    setShowBookingDetails({...initialVisibility});
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
    

    const toggleBookingDetails = (roomId) => {
        setShowBookingDetails(prevState => ({
            ...prevState,
            [roomId]: !prevState[roomId]
        }));
    };
    const toggleBookingForm = (roomId) => {
        setShowBookingForm(prevState => ({
            ...prevState,
            [roomId]: !prevState[roomId]
        }));
    };

    const handleBookRoom = (roomId) => {
        const details = bookingDetails[roomId] || {};
        fetch('https://ooe5pxjmx6ebnclk4s4y4uag5y0kdgvm.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...details,
                roomId: roomId,
                userId: localStorage.getItem('userId'),
                username: localStorage.getItem('userEmail')
            }),
        })
            .then(response => {
                console.log("Response room...", response);
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

    return (
        <Container>
            <Typography variant="h4" component="h2" gutterBottom>
                Rooms Available
            </Typography>
            <Grid container spacing={3}>
                {Array.isArray(rooms) && rooms.length > 0 ? (
                    rooms.map(room => (
                        <Grid item xs={12} sm={6} md={4} key={room.roomId}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Type: {room.type}</Typography>
                                    <Typography>Price: ${room.price} per night</Typography>
                                    <Typography>Features: {room.features.join(', ')}</Typography>
                                </CardContent>

                                <CardActions>
                                    <Button variant="outlined" onClick={() => toggleBookingDetails(room.roomId)}>
                                        {showBookingDetails[room.roomId] ? 'Hide Booking Status' : 'View Booking Status'}
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => toggleBookingForm(room.roomId)}>
                                        {showBookingForm[room.roomId] ? 'Hide Booking Form' : 'Book Now'}
                                    </Button>
                                </CardActions>
                                
                                {showBookingDetails[room.roomId] && (
                                    <>
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
                                </>
                                )}
                                
                                {showBookingForm[room.roomId] && (
                                    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleBookRoom(room.roomId); }} sx={{ mt: 2 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Start Date"
                                                    name="startDate"
                                                    type="date"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={(bookingDetails[room.roomId] && bookingDetails[room.roomId].startDate) || ''}
                                                    onChange={(e) => handleInputChange(e, room.roomId)}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="End Date"
                                                    name="endDate"
                                                    type="date"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={(bookingDetails[room.roomId] && bookingDetails[room.roomId].endDate) || ''}
                                                    onChange={(e) => handleInputChange(e, room.roomId)}
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
import { Form, Button, Row, Col } from 'react-bootstrap';
import './AddGame.css';
import React from 'react';
import addGameAction from './actions/addGameAction';
import { useDispatch, useSelector } from 'react-redux';
import AddGameRequest from '../../requests/AddGameRequest';
import gameImage from '../../img/img-games/default.png';
import Swal from 'sweetalert2'

export default function AddGame(){
    const [titleText, setTitle] = React.useState('');
    const [developerText, setDeveloper] = React.useState('');
    const [imageText, setImage] = React.useState('');
    const [descriptionText, setDescription] = React.useState('');
    const [releaseDateText, setDate] = React.useState('');
    const [categoryText, setCategory] = React.useState('');

    const dispatch = useDispatch();

    // setters
    function handleTitleTextChange(event){
        setTitle(event.target.value);
    }

    function handleDeveloperTextChange(event){
        setDeveloper(event.target.value);
    }

    function handleReleaseDateTextChange(event){
        setDate(event.target.value);
    }

    function handleCategoryTextChange(event){
        setCategory(event.target.value);
    }

    function handleDescriptionTextChange(event){
        setDescription(event.target.value);
    }

    function handleImageTextChange(event){
        setImage(event.target.value);
    }

    // handlers
    function handleFormSubmittion(event){
        event.preventDefault();
        if(titleText == '' || developerText == '' || imageText == '' || descriptionText == '' || categoryText == '' || releaseDateText == ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to fill all the fields!'
              })
        }
        else{
            const action = addGameAction(titleText, developerText, imageText, descriptionText, releaseDateText, categoryText);
            dispatch(action);
    
            // add game
            var a = new AddGameRequest(titleText, developerText, imageText, descriptionText, releaseDateText, categoryText).send();
    
            resetForm();
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Game added'
              })
            window.location.href = "http://localhost:3000/home";
        }
    }

    function resetForm(){
        setTitle('');
        setDeveloper('');
        setCategory('Action');
    }



    return(
        <div>
            <Form onSubmit={handleFormSubmittion}>
                <Form.Group>
                    <br />
                    <Row>
                        <Col>
                            <div className="inline-svg"><img className="gameImage" src={gameImage}></img></div>
                            <br />
                            <Form.Control className="Input-txt" placeholder="image URL" value={imageText} onChange={handleImageTextChange}/>
                            <br />
                            <Form.Label className="neon">Description</Form.Label>
                            <br />
                            <textarea 
                                onChange={handleDescriptionTextChange}
                                className="form-control Input-txt"
                                rows="5"
                                placeholder="Description"
                            />
                        </Col>
                        <Col>
                            <Form.Label className="neon">Title</Form.Label>
                            <br />
                            <Form.Control onChange={handleTitleTextChange} className="Input-txt" placeholder="Title" />
                            <br />
                            <Form.Label  className="neon">Developer</Form.Label>
                            <br />
                            <Form.Control onChange={handleDeveloperTextChange} className="Input-txt" placeholder="Developer" />
                            <br />
                            <Form.Label  className="neon">Relase Date</Form.Label>
                            <br />
                            <Form.Control onChange={handleReleaseDateTextChange} className="Input-txt" type="date" name='date_of_birth' />
                            <br />
                            <Form.Label  className="neon">Category</Form.Label>
                            <Form.Control onChange={handleCategoryTextChange} className="Input-txt" as="select">
                                <option>Action</option>
                                <option>Adventure</option>
                                <option>Casual</option>
                                <option>Racing</option>
                                <option>RPG</option>
                                <option>Simulation</option>
                                <option>Sports</option>
                                <option>Strategy</option>
                            </Form.Control>
                            <br />
                            <Button className="ButtonAdd" type="submit">
                                Add Game
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div>
    );
}
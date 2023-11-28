import express from 'express';
import controller from './diploma-secretariacontroller';


export default express
                .Router()
                .post('/event',controller.updateEvent);
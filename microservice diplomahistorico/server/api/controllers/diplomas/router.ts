import express from 'express';
import controller from './diplomacontroller';

export default express
                .Router()
                .get('/',controller.all);
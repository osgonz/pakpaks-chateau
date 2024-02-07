import express, {Request, Response, NextFunction} from 'express';
import CharacterController from '../controllers/characters';

const router = express.Router();

// GET route for all characters
router.get('/', CharacterController.getCharacters);

// GET route for one character
router.get('/:id', CharacterController.getCharacter);

export default router;